import {
  ApiErrorResponse,
  ApiErrorWithResponse,
  ApiResponse,
} from '@/types/api.types';
import { formatErrorMessage } from '@/utils/api-error-formatter';

export async function withApiCall<T>(
  apiCall: () => Promise<ApiResponse<T>>
): Promise<ApiResponse<T>> {
  try {
    return await apiCall();
  } catch (error) {
    const apiError = error as ApiErrorWithResponse;

    if (apiError.isNetworkError) {
      throw {
        success: false,
        message: apiError.message,
        error: {
          code: 'NETWORK_ERROR',
          details: null,
        },
      } as ApiErrorResponse;
    }

    if (apiError.serverResponse) {
      throw {
        success: false,
        message: apiError.message,
        error: {
          code: apiError.serverResponse.error.code,
          details: formatErrorMessage(apiError),
        },
      } as ApiErrorResponse;
    }

    throw {
      success: false,
      message: 'An unexpected error occurred',
      error: {
        code: 'UNEXPECTED_ERROR',
        details: null,
      },
    } as ApiErrorResponse;
  }
}
