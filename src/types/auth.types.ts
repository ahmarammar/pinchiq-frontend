export type UserRole = 'broker' | 'provider';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  twoFactorEnabled?: boolean;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}
export interface EmailFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  showError: boolean;
  inputState: 'error' | 'valid' | 'default';
}

export interface ErrorAlertProps {
  message: string;
}

export interface FieldErrorProps {
  message: string;
}

export interface LoginFooterProps {
  onSignUpClick: () => void;
}

export interface LoginHeaderProps {
  title: string;
  description: string;
}

export interface PasswordFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  showError: boolean;
  inputState: 'error' | 'valid' | 'default';
  onForgotPasswordClick: () => void;
}

export interface SubmitButtonProps {
  isLoading: boolean;
  isSuccess?: boolean;
  isDisabled: boolean;
  loadingText: string;
  successText?: string;
  children: React.ReactNode;
}

export interface TwoFactorVerification {
  code: string;
}

export interface EmailTwoFactorResponse {
  success: boolean;
  message: string;
  error?: {
    code: string;
    details: string;
  };
}
