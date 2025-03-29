import { Navigate } from "react-router-dom";
import { useAuth } from "../store";
import { JSX } from "react";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { accessToken, loading } = useAuth();

  if (loading) return <div>Cargando...</div>;

  return accessToken ? children : <Navigate to="/login" replace />;
};
