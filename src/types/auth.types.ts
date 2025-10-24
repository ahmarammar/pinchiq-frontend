export type UserRole = 'broker' | 'provider';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}
