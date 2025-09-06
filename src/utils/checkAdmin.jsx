import { useAuth } from "../context/AuthContext";
import NotFound from "../pages/NotFound";
import Loading from "../components/Loading";
import AdminContainer from "../containers/AdminContainer";

const ProtectedAdmin = () => {
  const { user,loading } = useAuth();

  if (loading) return <Loading/>
  
  if (!user?.isAdmin) {
    return <NotFound />;
  }

  return <AdminContainer />;
};

export default ProtectedAdmin;