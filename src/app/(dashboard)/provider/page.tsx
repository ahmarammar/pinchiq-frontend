import { redirect } from 'next/navigation';

export default async function ProviderDashboardPage() {
  return redirect('/provider/policies');
}
