import {
  ApiErrorWithResponse,
  ValidationErrorDetails,
} from '@/types/api.types';

export const formatErrorMessage = (error: ApiErrorWithResponse): string => {
  const serverResponse = error.serverResponse;

  if (serverResponse) {
    if (
      serverResponse.error?.code === 'VALIDATION_ERROR' &&
      serverResponse.error?.details
    ) {
      return formatValidationErrors(
        serverResponse.error.details as ValidationErrorDetails
      );
    }
    return serverResponse.message;
  }

  return error.message || 'An error occurred';
};

export const formatValidationErrors = (
  details: ValidationErrorDetails
): string => {
  const formatFieldName = (field: string): string => {
    return field
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const containsFieldReference = (error: string, field: string): boolean => {
    const fieldName = formatFieldName(field);
    const lowerError = error.toLowerCase();

    return (
      lowerError.includes(field.toLowerCase()) ||
      lowerError.includes(fieldName.toLowerCase())
    );
  };

  const formatSingleFieldError = (field: string, error: string): string => {
    const fieldName = formatFieldName(field);

    if (containsFieldReference(error, field)) {
      return error;
    }

    return `${fieldName} ${error.toLowerCase()}`;
  };

  const errorMessages = Object.entries(details).map(([field, errors]) => {
    const errorArray = Array.isArray(errors) ? errors : [errors];

    if (errorArray.length === 1) {
      return formatSingleFieldError(field, errorArray[0]);
    } else {
      const fieldName = formatFieldName(field);
      const formattedErrors = errorArray.map(error => error.toLowerCase());
      return `${fieldName} - ${formattedErrors.join(', ')}`;
    }
  });

  return errorMessages.join(' and ');
};
