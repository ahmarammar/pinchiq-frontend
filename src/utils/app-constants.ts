export const AUTH_TOKEN_KEY = process.env.AUTH_TOKEN_KEY || 'auth_token';
export const REFRESH_TOKEN_KEY =
  process.env.REFRESH_TOKEN_KEY || 'refresh_token';
export const USER_DATA_KEY = process.env.USER_DATA_KEY || 'user_data';
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export const COOKIE_OPTIONS = {
  maxAge: 60 * 60 * 24 * 7,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  httpOnly: true,
};

export const MOCK_USERS = [
  {
    id: 'mock-broker-1',
    email: 'broker@pinchiq.com',
    password: 'broker123',
    name: 'John Broker',
    role: 'broker',
  },
  {
    id: 'mock-provider-1',
    email: 'provider@pinchiq.com',
    password: 'provider123',
    role: 'provider',
    name: 'Jane Provider',
  },
] as const;
