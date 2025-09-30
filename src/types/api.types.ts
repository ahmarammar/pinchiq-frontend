export interface ApiSuccessResponse<T = unknown> {
  success: true;
  message: string;
  data: T;
  metadata?: Record<string, unknown>;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  error: {
    code: string;
    details: unknown;
  };
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

export interface ValidationErrorDetails {
  [field: string]: string[] | string;
}

export interface ApiErrorWithResponse extends Error {
  serverResponse?: ApiErrorResponse;
  status?: number;
  isNetworkError?: boolean;
}

export interface RefreshTokenResponse {
  access_token: string;
  token_type: string;
}

export interface QueueItem {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}
