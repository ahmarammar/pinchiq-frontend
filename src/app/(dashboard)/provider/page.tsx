import { getCurrentUser } from '@/actions/auth-actions';

export default async function ProviderDashboardPage() {
  const user = await getCurrentUser();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Welcome back, {user?.name || 'Provider'}!
        </h2>
        <p className="text-muted-foreground">
          Manage your services and appointments
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border p-6">
          <h3 className="font-semibold">Provider Dashboard</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Your provider dashboard content goes here
          </p>
        </div>
      </div>
    </div>
  );
}
