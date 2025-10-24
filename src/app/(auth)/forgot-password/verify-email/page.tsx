import VerifyEmailForm from '@/features/auth/components/forms/verify-email/verify-email-form';

export default function ForgotPasswordVerifyEmail() {
  return (
    <>
      <VerifyEmailForm showTerms={false} onSuccess="/login" />
    </>
  );
}
