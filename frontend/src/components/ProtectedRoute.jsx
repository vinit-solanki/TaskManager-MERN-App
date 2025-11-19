import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Loader2 } from "lucide-react";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-neutral-900">
        <div className="flex flex-col items-center space-y-4 p-6">
          <Loader2 className="h-10 w-10 animate-spin text-indigo-600 dark:text-indigo-400" />

          <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">
            Checking your session…
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            This will only take a moment.
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
