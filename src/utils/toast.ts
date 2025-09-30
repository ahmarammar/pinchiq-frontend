import { toast } from 'sonner';

import {
  ApiErrorWithResponse,
  ApiResponse,
  ValidationErrorDetails,
} from '@/types/api.types';
import {
  HandleServerResponseOptions,
  PromiseToastOptions,
  ToastOptions,
} from '@/types/toast.types';

class ToastService {
  success(message: string, options?: ToastOptions): string | number {
    return toast.success(message, options);
  }

  error(message: string, options?: ToastOptions): string | number {
    return toast.error(message, options);
  }

  info(message: string, options?: ToastOptions): string | number {
    return toast.info(message, options);
  }

  warning(message: string, options?: ToastOptions): string | number {
    return toast.warning(message, options);
  }

  loading(message: string, options?: ToastOptions): string | number {
    return toast.loading(message, options);
  }

  custom(
    renderer: (id: string | number) => React.ReactElement,
    options?: ToastOptions
  ): string | number {
    return toast.custom(renderer, options);
  }

  promise<T>(
    promise: Promise<ApiResponse<T>>,
    options: PromiseToastOptions<T>
  ) {
    return toast.promise(
      promise.then(response => {
        if (response.success) {
          options.onSuccess?.(response);
          return response;
        } else {
          const error: ApiErrorWithResponse = new Error(response.message);
          error.serverResponse = response;
          throw error;
        }
      }),
      {
        loading: options.loading || 'Loading...',
        success: response => {
          if (typeof options.success === 'function') {
            return options.success(response);
          }
          return (
            options.success ||
            response.message ||
            'Operation completed successfully'
          );
        },
        error: (error: ApiErrorWithResponse) => {
          options.onError?.(error);

          if (typeof options.error === 'function') {
            return options.error(error);
          }

          if (options.error) {
            return options.error;
          }

          return this.formatErrorMessage(error);
        },
        finally: options.finally,
      }
    );
  }

  handleServerResponse<T>(
    response: ApiResponse<T>,
    options?: HandleServerResponseOptions<T>
  ): void {
    if (response.success) {
      options?.onSuccess?.(response);
      this.success(options?.successMessage || response.message);
    } else {
      options?.onError?.(response);

      let errorMessage = options?.errorMessage || response.message;

      if (
        response.error?.code === 'VALIDATION_ERROR' &&
        response.error?.details
      ) {
        errorMessage = this.formatValidationErrors(
          response.error.details as ValidationErrorDetails
        );
      }

      this.error(errorMessage);
    }
  }

  private formatErrorMessage(error: ApiErrorWithResponse): string {
    const serverResponse = error.serverResponse;

    if (serverResponse) {
      if (
        serverResponse.error?.code === 'VALIDATION_ERROR' &&
        serverResponse.error?.details
      ) {
        return this.formatValidationErrors(
          serverResponse.error.details as ValidationErrorDetails
        );
      }
      return serverResponse.message;
    }

    return error.message || 'An error occurred';
  }

  private formatValidationErrors(details: ValidationErrorDetails): string {
    return Object.entries(details)
      .map(([field, errors]) => {
        const errorArray = Array.isArray(errors) ? errors : [errors];
        return `${field}: ${errorArray.join(', ')}`;
      })
      .join('; ');
  }

  dismiss(toastId?: string | number): void {
    toast.dismiss(toastId);
  }

  message(message: string, options?: ToastOptions): string | number {
    return toast.message(message, options);
  }
}

export const toastService = new ToastService();
export default toastService;
