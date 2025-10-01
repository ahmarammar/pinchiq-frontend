import { getCurrentUser } from "@/actions/auth-actions";
import { redirect } from "next/navigation";

export default async function HomePage() {
  // Middleware should handle this, but as a fallback:
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role === "broker") {
    redirect("/broker");
  } else if (user.role === "provider") {
    redirect("/provider");
  }

  // Fallback - should never reach here
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
}
