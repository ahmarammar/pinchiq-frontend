import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight">404</h1>
          <p className="text-gray-600">
            Page not found. The page you are looking for does not exist.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
