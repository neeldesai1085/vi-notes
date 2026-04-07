import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { ReactElement } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: ReactElement;
}) {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#120701] text-white/60">
        Loading...
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
