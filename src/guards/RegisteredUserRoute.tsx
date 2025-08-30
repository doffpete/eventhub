import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { useLocation } from "react-router-dom";

const RegisteredUserRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default RegisteredUserRoute;
