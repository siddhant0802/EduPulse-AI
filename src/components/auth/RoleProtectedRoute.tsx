import { Navigate } from "react-router";
import { useAuth } from "../../Context/AuthContext";

type Props = {
  children: React.ReactNode;
  allowedRoles: ("admin" | "teacher" | "student")[];
};

export default function RoleProtectedRoute({
  children,
  allowedRoles,
}: Props) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}