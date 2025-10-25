import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="space-y-3">
          <h1 className="text-9xl font-bold tracking-tight">404</h1>
          <p className="text-gray-600">
            Page not found. The page you are looking for does not exist.
          </p>
        </div>
        <Link href="/">
          <Button variant="inverse" className="w-fit px-6 py-5">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
