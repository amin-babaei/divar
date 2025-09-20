import { useAuth } from "@/context/AuthContext";
import NotFound from "@/pages/NotFound";
import Loading from "@/ui/Loading";
import AdminLayout from "@/layouts/AdminLayout";

const SecureAdminRoute = () => {
  const { user,loading } = useAuth();

  if (loading) return <Loading/>
  
  if (!user?.isAdmin) {
    return <NotFound />;
  }

  return <AdminLayout />;
};

export default SecureAdminRoute;