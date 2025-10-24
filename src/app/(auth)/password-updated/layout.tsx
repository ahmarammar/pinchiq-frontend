'use client';

export default function PasswordUpdatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-0 w-full space-y-5">
      <div className="text-center">
        <h1 className="mb-2 bg-gradient-to-b from-white via-white to-white/50 bg-clip-text text-9xl leading-tight font-medium tracking-tighter text-transparent">
          Updated Successfully
        </h1>
        <p className="mt-3 text-3xl leading-snug font-semibold tracking-normal text-white">
          You can now sign in with your new password.
        </p>
      </div>
      {children}
    </div>
  );
}
