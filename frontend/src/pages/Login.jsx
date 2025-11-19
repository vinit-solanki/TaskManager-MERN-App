import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Mail, Lock, LogIn } from "lucide-react";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await login(formData.email, formData.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-100 
      dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 
      px-4 py-12">

      {/* Card */}
      <div className="w-full max-w-md bg-white/80 dark:bg-neutral-900/60 
          backdrop-blur-xl border border-gray-200 dark:border-neutral-800 
          shadow-xl rounded-2xl p-8 relative overflow-hidden">

        {/* Glow accent */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br 
            from-indigo-500/20 to-purple-500/20 blur-2xl pointer-events-none">
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-center 
            bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text 
            text-transparent mb-2">
          Welcome Back
        </h1>

        <p className="text-center text-gray-600 dark:text-gray-300 mb-8 text-sm">
          Sign in to access your dashboard
        </p>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-100/80 dark:bg-red-900/30 
              border border-red-300 dark:border-red-700 
              text-red-700 dark:text-red-400 rounded-md text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 
                dark:text-gray-300 mb-1">
              Email
            </label>

            <div className="flex items-center px-3 py-2 bg-gray-50 
                dark:bg-neutral-800 rounded-lg border border-gray-300 
                dark:border-neutral-700 focus-within:border-indigo-500 
                focus-within:ring-2 focus-within:ring-indigo-500 transition">

              <Mail className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent outline-none text-gray-900 
                dark:text-gray-100"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 
                dark:text-gray-300 mb-1">
              Password
            </label>

            <div className="flex items-center px-3 py-2 bg-gray-50 
                dark:bg-neutral-800 rounded-lg border border-gray-300 
                dark:border-neutral-700 focus-within:border-indigo-500 
                focus-within:ring-2 focus-within:ring-indigo-500 transition">

              <Lock className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-transparent outline-none text-gray-900 
                dark:text-gray-100"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2
                bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 
                text-white font-semibold py-2.5 rounded-lg 
                shadow-lg shadow-indigo-500/30 transition-all"
          >
            <LogIn className="h-5 w-5" />
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-gray-600 dark:text-gray-300 mt-6 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 dark:text-indigo-400 hover:underline 
                font-medium"
          >
            Create one
          </Link>
        </p>

      </div>
    </div>
  );
}
