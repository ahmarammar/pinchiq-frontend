'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import apiClient from '@/lib/api-client';
import { withApiCall } from '@/lib/api-wrapper';
import { ApiErrorResponse, ApiResponse } from '@/types/api.types';
import { LoginResponse, User } from '@/types/auth.types';
import {
  AUTH_TOKEN_KEY,
  COOKIE_OPTIONS as cookieOptions,
  MOCK_USERS,
  REFRESH_TOKEN_KEY,
  USER_DATA_KEY,
} from '@/utils/app-constants';

export async function clearAuthCookies(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_TOKEN_KEY);
  cookieStore.delete(USER_DATA_KEY);
  cookieStore.delete(REFRESH_TOKEN_KEY);
}

function isMockUser(email: string, password: string) {
  return MOCK_USERS.find(
    user => user.email === email && user.password === password
  );
}

export async function login(
  email: string,
  password: string
): Promise<ApiResponse<LoginResponse>> {
  await clearAuthCookies();

  const mockUser = isMockUser(email, password);

  if (mockUser) {
    try {
      const cookieStore = await cookies();
      const mockToken = `mock-token-${mockUser.id}`;
      const mockRefreshToken = `mock-refresh-${mockUser.id}`;

      cookieStore.set(AUTH_TOKEN_KEY, mockToken, cookieOptions);
      cookieStore.set(REFRESH_TOKEN_KEY, mockRefreshToken, cookieOptions);

      const mockUserData: ApiResponse<User> = {
        success: true,
        message: 'Mock user authenticated successfully',
        data: {
          id: mockUser.id,
          email: mockUser.email,
          name: mockUser.name,
          role: mockUser.role,
          twoFactorEnabled: false, // Will be updated after 2FA check
        },
      };

      cookieStore.set(
        USER_DATA_KEY,
        JSON.stringify(mockUserData),
        cookieOptions
      );

      return {
        success: true,
        message: 'Login successful',
        data: {
          access_token: mockToken,
          refresh_token: mockRefreshToken,
          token_type: 'Bearer',
        },
      };
    } catch (error) {
      console.error('Mock login error:', error);
      return {
        success: false,
        message: 'Mock login failed',
        error: {
          code: 'MOCK_AUTH_ERROR',
          details: 'An error occurred during mock authentication',
        },
      } as ApiErrorResponse;
    }
  }

  try {
    const formData = new URLSearchParams();
    formData.append('grant_type', 'password');
    formData.append('email', email);
    formData.append('password', password);

    const response = await withApiCall(() =>
      apiClient.publicPost<LoginResponse>('/auth/login', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
    );

    if (response.success) {
      const { access_token: accessToken, refresh_token: refreshToken } =
        response.data;

      const cookieStore = await cookies();
      cookieStore.set(AUTH_TOKEN_KEY, accessToken, cookieOptions);
      cookieStore.set(REFRESH_TOKEN_KEY, refreshToken, cookieOptions);

      const userData = await fetchCurrentUser();
      cookieStore.set(USER_DATA_KEY, JSON.stringify(userData), cookieOptions);
    }

    return response;
  } catch (error) {
    console.error('Login API error:', error);
    return error as ApiErrorResponse;
  }
}

export async function fetchCurrentUser(): Promise<ApiResponse<User>> {
  return withApiCall(() => apiClient.get<User>('/users/me'));
}

export async function logout(): Promise<void> {
  await clearAuthCookies();
  redirect('/login');
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_TOKEN_KEY)?.value;
  const userData = cookieStore.get(USER_DATA_KEY)?.value;

  if (!token || !userData) {
    return null;
  }

  try {
    const parsedUser = JSON.parse(userData).data as User;
    return parsedUser;
  } catch (error) {
    console.error('getCurrentUser - JSON parse error:', error);
    cookieStore.delete(AUTH_TOKEN_KEY);
    cookieStore.delete(USER_DATA_KEY);
    return null;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const currentUser = await getCurrentUser();
  return currentUser !== null;
}

export async function checkAuth(): Promise<boolean> {
  return await isAuthenticated();
}
