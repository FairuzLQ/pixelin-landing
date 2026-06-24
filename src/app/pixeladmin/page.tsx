import { getAdminSession } from "@/lib/auth";
import { readContent } from "@/lib/content";
import AdminDashboard from "./AdminDashboard";
import LoginPage from "./LoginPage";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authed = await getAdminSession();

  if (!authed) return <LoginPage />;

  const content = readContent();
  return <AdminDashboard initialContent={content} />;
}
