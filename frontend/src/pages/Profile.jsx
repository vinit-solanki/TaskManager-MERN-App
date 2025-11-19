import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { profileAPI } from "../services/api";
import { ArrowLeft, User, Lock } from "lucide-react";

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: "", bio: "", avatar: "" });
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        bio: user.bio || "",
        avatar: user.avatar || "",
      });
    }
  }, [user]);

  const handleProfileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await profileAPI.updateProfile(formData);
      setMessage("Profile updated successfully");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      await profileAPI.updatePassword({
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      });
      setMessage("Password updated successfully");
      setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-neutral-950 dark:to-neutral-900 py-10 px-4">

      {/* HEADER */}
      <div className="max-w-3xl mx-auto flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
          Profile Settings
        </h1>

        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 font-medium"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>
      </div>

      {/* MAIN CARD */}
      <div className="max-w-3xl mx-auto bg-white/80 dark:bg-neutral-900/70 backdrop-blur-xl border border-gray-200 dark:border-neutral-800 shadow-xl rounded-2xl p-8">

        {/* Success / Error Message */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg text-sm ${
              message.toLowerCase().includes("success")
                ? "bg-green-100/70 border border-green-300 text-green-700 dark:bg-green-900/30 dark:border-green-700 dark:text-green-400"
                : "bg-red-100/70 border border-red-300 text-red-700 dark:bg-red-900/30 dark:border-red-700 dark:text-red-400"
            }`}
          >
            {message}
          </div>
        )}

        {/* TABS */}
        <div className="flex items-center gap-6 border-b border-gray-200 dark:border-neutral-700 mb-8">
          <button
            onClick={() => setActiveTab("profile")}
            className={`pb-3 text-sm font-medium flex items-center gap-2 transition ${
              activeTab === "profile"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
            }`}
          >
            <User className="h-4 w-4" /> Profile Info
          </button>

          <button
            onClick={() => setActiveTab("password")}
            className={`pb-3 text-sm font-medium flex items-center gap-2 transition ${
              activeTab === "password"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
            }`}
          >
            <Lock className="h-4 w-4" /> Change Password
          </button>
        </div>

        {/* PROFILE TAB */}
        {activeTab === "profile" && (
          <form onSubmit={handleProfileSubmit} className="space-y-6">

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleProfileChange}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-300 
                dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleProfileChange}
                rows="4"
                placeholder="Tell us about yourself"
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-300 
                dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            {/* Avatar */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Avatar URL
              </label>
              <input
                type="url"
                name="avatar"
                value={formData.avatar}
                onChange={handleProfileChange}
                placeholder="https://example.com/avatar.jpg"
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-300 
                dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg 
              shadow-md shadow-indigo-500/30 transition disabled:bg-gray-400"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        )}

        {/* PASSWORD TAB */}
        {activeTab === "password" && (
          <form onSubmit={handlePasswordSubmit} className="space-y-6">

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Current Password
              </label>
              <input
                type="password"
                name="oldPassword"
                value={passwordData.oldPassword}
                onChange={handlePasswordChange}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-300 
                dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-300 
                dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-neutral-800 border border-gray-300 
                dark:border-neutral-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg 
              shadow-md shadow-indigo-500/30 transition disabled:bg-gray-400"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
