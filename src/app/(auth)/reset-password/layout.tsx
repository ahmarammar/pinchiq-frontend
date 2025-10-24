'use client';

export default function ResetPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mt-0 w-full space-y-5">
      <div className="text-center">
        <h1 className="mb-2 bg-gradient-to-b from-white via-white to-white/50 bg-clip-text text-9xl leading-tight font-medium tracking-tighter text-transparent">
          Create A New Password
        </h1>
        <p className="mt-3 text-3xl leading-snug font-semibold tracking-normal text-white">
          Min. 8 characters, 1 number, 1 symbol
        </p>
      </div>
      {children}
    </div>
  );
}
