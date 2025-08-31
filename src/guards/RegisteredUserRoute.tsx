import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { useLocation } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const RegisteredUserRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default RegisteredUserRoute;
