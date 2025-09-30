import { cookies } from 'next/headers';

import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

import { logout } from '@/actions/auth-actions';
import {
  ApiErrorResponse,
  ApiErrorWithResponse,
  ApiResponse,
  ApiSuccessResponse,
  QueueItem,
  RefreshTokenResponse,
} from '@/types/api.types';
import {
  API_BASE_URL,
  AUTH_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  USER_DATA_KEY,
} from '@/utils/app-constants';

class ApiClient {
  private publicInstance: AxiosInstance;
  private authInstance: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: QueueItem[] = [];
  private initialized = false;

  constructor(baseURL: string = API_BASE_URL) {
    this.publicInstance = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        Accept: 'application/json',
      },
    });

    this.authInstance = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        Accept: 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    if (this.initialized) {
      return;
    }

    this.publicInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError<ApiErrorResponse>) => {
        return this.handlePublicResponse(error);
      }
    );

    this.authInstance.interceptors.request.use(
      async config => {
        const token = await this.getTokenFromCookies();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );

    this.authInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError<ApiErrorResponse>) => {
        return this.handleAuthenticatedResponse(error);
      }
    );

    this.initialized = true;
  }

  private async getTokenFromCookies(): Promise<string | null> {
    try {
      if (typeof window === 'undefined') {
        const cookieStore = await cookies();
        return cookieStore.get(AUTH_TOKEN_KEY)?.value || null;
      } else {
        const cookieString = document.cookie;
        const tokenCookie = cookieString
          .split('; ')
          .find(row => row.startsWith(`${AUTH_TOKEN_KEY}=`));
        return tokenCookie ? tokenCookie.split('=')[1] : null;
      }
    } catch {
      return null;
    }
  }

  private async getRefreshTokenFromCookies(): Promise<string | null> {
    try {
      if (typeof window === 'undefined') {
        const cookieStore = await cookies();
        return cookieStore.get(REFRESH_TOKEN_KEY)?.value || null;
      } else {
        const cookieString = document.cookie;
        const refreshTokenCookie = cookieString
          .split('; ')
          .find(row => row.startsWith(`${REFRESH_TOKEN_KEY}=`));
        return refreshTokenCookie ? refreshTokenCookie.split('=')[1] : null;
      }
    } catch {
      return null;
    }
  }

  private async handlePublicResponse(error: AxiosError<ApiErrorResponse>) {
    const { response } = error;

    if (!response) {
      const networkError: ApiErrorWithResponse = new Error(
        'Network error. Please check your connection.'
      );
      networkError.isNetworkError = true;
      throw networkError;
    }

    const { status, data } = response;

    const apiError: ApiErrorWithResponse = new Error(
      data?.message || 'An error occurred'
    );
    apiError.serverResponse = data;
    apiError.status = status;

    throw apiError;
  }

  private async handleAuthenticatedResponse(
    error: AxiosError<ApiErrorResponse>
  ) {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };
    const { response } = error;

    if (!response) {
      const networkError: ApiErrorWithResponse = new Error(
        'Network error. Please check your connection.'
      );
      networkError.isNetworkError = true;
      throw networkError;
    }

    const { status, data } = response;

    if (status === 401 && !originalRequest._retry) {
      if (this.isRefreshing) {
        return new Promise((resolve, reject) => {
          this.failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return this.authInstance.request(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      this.isRefreshing = true;

      try {
        const refreshToken = await this.getRefreshTokenFromCookies();

        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const newTokens = await this.refreshAccessToken(refreshToken);
        await this.updateTokensInCookies(newTokens);
        this.processQueue(null);

        originalRequest.headers!.Authorization = `Bearer ${newTokens.access_token}`;
        return this.authInstance.request(originalRequest);
      } catch (refreshError) {
        this.processQueue(refreshError);
        await this.handleUnauthorized();
        throw refreshError;
      } finally {
        this.isRefreshing = false;
      }
    }

    const apiError: ApiErrorWithResponse = new Error(
      data?.message || 'An error occurred'
    );
    apiError.serverResponse = data;
    apiError.status = status;

    throw apiError;
  }

  private async refreshAccessToken(
    refreshToken: string
  ): Promise<RefreshTokenResponse> {
    try {
      const response = await this.publicInstance.post<
        ApiSuccessResponse<RefreshTokenResponse>
      >('/auth/refresh', { refresh_token: refreshToken });

      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to refresh token');
      }

      return response.data.data;
    } catch (error) {
      console.error('Failed to refresh access token:', error);
      throw new Error('Failed to refresh access token');
    }
  }

  private async updateTokensInCookies(
    tokens: RefreshTokenResponse
  ): Promise<void> {
    if (typeof window === 'undefined') {
      try {
        const cookieStore = await cookies();
        cookieStore.set(AUTH_TOKEN_KEY, tokens.access_token);
      } catch (error) {
        console.error('Failed to update server-side cookies:', error);
      }
    } else {
      const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
      document.cookie = `${AUTH_TOKEN_KEY}=${tokens.access_token}; expires=${expires.toUTCString()}; path=/; SameSite=Strict; Secure`;
    }
  }

  private processQueue(error: unknown): void {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve(undefined);
      }
    });

    this.failedQueue = [];
  }

  private async handleUnauthorized(): Promise<void> {
    try {
      if (typeof window === 'undefined') {
        await logout();
      } else {
        document.cookie = `${AUTH_TOKEN_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        document.cookie = `${USER_DATA_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        document.cookie = `${REFRESH_TOKEN_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Error clearing cookies:', error);
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
  }

  public async publicGet<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.publicInstance.get<ApiResponse<T>>(url, config);
    return response.data;
  }

  public async publicPost<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.publicInstance.post<ApiResponse<T>>(
      url,
      data,
      config
    );
    return response.data;
  }

  public async publicPut<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.publicInstance.put<ApiResponse<T>>(
      url,
      data,
      config
    );
    return response.data;
  }

  public async publicPatch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.publicInstance.patch<ApiResponse<T>>(
      url,
      data,
      config
    );
    return response.data;
  }

  public async publicDelete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.publicInstance.delete<ApiResponse<T>>(
      url,
      config
    );
    return response.data;
  }

  public async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.authInstance.get<ApiResponse<T>>(url, config);
    return response.data;
  }

  public async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.authInstance.post<ApiResponse<T>>(
      url,
      data,
      config
    );
    return response.data;
  }

  public async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.authInstance.put<ApiResponse<T>>(
      url,
      data,
      config
    );
    return response.data;
  }

  public async patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.authInstance.patch<ApiResponse<T>>(
      url,
      data,
      config
    );
    return response.data;
  }

  public async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.authInstance.delete<ApiResponse<T>>(
      url,
      config
    );
    return response.data;
  }

  public getPublicInstance(): AxiosInstance {
    return this.publicInstance;
  }

  public getAuthInstance(): AxiosInstance {
    return this.authInstance;
  }

  public async clearTokens(): Promise<void> {
    await this.handleUnauthorized();
  }

  public isInitialized(): boolean {
    return this.initialized;
  }
}

export const apiClient = new ApiClient();

export default apiClient;
