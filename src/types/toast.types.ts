import { ExternalToast } from 'sonner';

import {
  ApiErrorResponse,
  ApiErrorWithResponse,
  ApiResponse,
} from './api.types';

export interface ToastOptions extends ExternalToast {
  id?: string | number;
}

export interface PromiseToastOptions<T> {
  loading?: string;
  success?: string | ((response: ApiResponse<T>) => string);
  error?: string | ((error: ApiErrorWithResponse) => string);
  finally?: () => void;
  onSuccess?: (response: ApiResponse<T>) => void;
  onError?: (error: ApiErrorWithResponse) => void;
}

export interface HandleServerResponseOptions<T> {
  onSuccess?: (response: ApiResponse<T>) => void;
  onError?: (response: ApiErrorResponse) => void;
  successMessage?: string;
  errorMessage?: string;
}
