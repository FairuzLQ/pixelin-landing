import LoginPage from "./LoginPage";
import AdminDashboard from "./AdminDashboard";

export default async function AdminPage() {
  try {
    const { getAdminSession } = await import("@/lib/auth");
    const authed = await getAdminSession();
    if (!authed) return <LoginPage />;
    const { readContent } = await import("@/lib/content");
    const content = readContent();
    return <AdminDashboard initialContent={content} />;
  } catch {
    return <LoginPage />;
  }
}
