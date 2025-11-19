import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Mail, Lock, User, UserPlus } from "lucide-react";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await register(formData.email, formData.password, formData.name);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-100 
      dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 
      px-4 py-12">

      {/* Glass Card */}
      <div className="w-full max-w-md bg-white/80 dark:bg-neutral-900/70 
          backdrop-blur-xl border border-gray-200 dark:border-neutral-800 
          shadow-xl rounded-2xl p-8 relative overflow-hidden">

        {/* Glow Accent */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br 
            from-indigo-500/20 to-purple-500/20 blur-2xl pointer-events-none"></div>

        {/* Heading */}
        <h1 className="text-3xl font-extrabold text-center 
            bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text 
            text-transparent mb-2">
          Create Account
        </h1>

        <p className="text-center text-gray-600 dark:text-gray-300 mb-8 text-sm">
          Sign up to get started
        </p>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-100/80 dark:bg-red-900/30 
              border border-red-300 dark:border-red-700 text-red-700 
              dark:text-red-400 rounded-md text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <div className="flex items-center px-3 py-2 bg-gray-50 dark:bg-neutral-800 
                border border-gray-300 dark:border-neutral-700 rounded-lg 
                focus-within:border-indigo-500 focus-within:ring-2 
                focus-within:ring-indigo-500 transition">
              <User className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full bg-transparent outline-none text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <div className="flex items-center px-3 py-2 bg-gray-50 dark:bg-neutral-800 
                border border-gray-300 dark:border-neutral-700 rounded-lg 
                focus-within:border-indigo-500 focus-within:ring-2 
                focus-within:ring-indigo-500 transition">
              <Mail className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full bg-transparent outline-none text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <div className="flex items-center px-3 py-2 bg-gray-50 dark:bg-neutral-800 
                border border-gray-300 dark:border-neutral-700 rounded-lg 
                focus-within:border-indigo-500 focus-within:ring-2 
                focus-within:ring-indigo-500 transition">
              <Lock className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-transparent outline-none text-gray-900 
                dark:text-gray-100"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Confirm Password
            </label>
            <div className="flex items-center px-3 py-2 bg-gray-50 dark:bg-neutral-800 
                border border-gray-300 dark:border-neutral-700 rounded-lg 
                focus-within:border-indigo-500 focus-within:ring-2 
                focus-within:ring-indigo-500 transition">
              <Lock className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-transparent outline-none text-gray-900 
                dark:text-gray-100"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 
                bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 
                text-white font-semibold py-2.5 rounded-lg 
                shadow-md shadow-indigo-500/30 transition-all"
          >
            <UserPlus className="h-5 w-5" />
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Sign In Link */}
        <p className="text-center text-gray-600 dark:text-gray-300 mt-6 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
