import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Toaster } from 'sonner';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NuqsAdapter>{children}</NuqsAdapter>
      <Toaster
        position="bottom-right"
        expand={false}
        richColors
        closeButton
        duration={4000}
        toastOptions={{
          style: {
            background: 'hsl(var(--background))',
            color: 'hsl(var(--foreground))',
            border: '1px solid hsl(var(--border))',
          },
        }}
      />
    </>
  );
};
