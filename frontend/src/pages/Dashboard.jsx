import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { taskAPI } from "../services/api";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

import {
  User,
  LogOut,
  ListChecks,
  Clock,
  Loader2,
  Plus,
  ChevronDown,
  CheckCircle2,
  CircleDashed,
  ClockAlert,
} from "lucide-react";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const params = filter !== "all" ? { status: filter } : {};
      const response = await taskAPI.getTasks(params);
      setTasks(response.data.tasks);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      if (editingTask) {
        await taskAPI.updateTask(editingTask._id, taskData);
        setEditingTask(null);
      } else {
        await taskAPI.createTask(taskData);
      }
      setShowForm(false);
      fetchTasks();
    } catch (error) {
      console.error("Failed to save task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Delete this task permanently?")) {
      try {
        await taskAPI.deleteTask(taskId);
        fetchTasks();
      } catch (err) {
        console.error("Failed to delete task:", err);
      }
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const task = tasks.find((t) => t._id === taskId);
      await taskAPI.updateTask(taskId, { ...task, status: newStatus });
      fetchTasks();
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const filteredTasks = filter === "all" ? tasks : tasks.filter((t) => t.status === filter);

  const stats = {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === "pending").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    completed: tasks.filter((t) => t.status === "completed").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-950 dark:to-neutral-900">
      
      {/* -- TOP NAVBAR -- */}
      <header className="bg-white dark:bg-neutral-900/80 backdrop-blur-md border-b border-gray-200 dark:border-neutral-800 shadow-sm sticky top-0 z-50">
        <div className="mx-auto px-6 py-4 flex justify-between items-center">

          {/* Logo + Welcome */}
          <div>
            <div className="flex items-center gap-3 mt-2">
              <div className="relative flex items-center justify-center">
                <User
                  className="h-10 w-10 p-2 text-indigo-600 dark:text-indigo-400 rounded-full
                  bg-white dark:bg-neutral-900 shadow border border-indigo-400 dark:border-indigo-500"
                />
                <span className="absolute inset-0 rounded-full bg-indigo-500/20 blur-md animate-pulse"></span>
              </div>

              <p className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                Welcome back,{" "}
                <span className="font-semibold bg-gradient-to-r from-indigo-500 to-blue-400 bg-clip-text text-transparent">
                  {user?.name}
                </span>
              </p>
            </div>
          </div>

          {/* Profile + Logout */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/profile")}
              className="cursor-pointer flex items-center gap-2
                         text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 
                         font-medium transition border border-2 border-indigo-300 px-3 py-2 rounded-md"
            >
              <User className="h-4 w-4" />
              Profile
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-500/50 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium flex items-center gap-2 shadow-sm transition"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </header>


      {/* -- MAIN CONTENT -- */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        
        {/* -- STAT CARDS -- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

          {/* ONE CARD COMPONENT (Reusable pattern) */}
          {[
            { label: "Total Tasks", value: stats.total, icon: <ListChecks /> },
            { label: "Pending", value: stats.pending, icon: <Clock />, color: "text-yellow-500" },
            { label: "In Progress", value: stats.inProgress, icon: <ClockAlert />, color: "text-blue-500" },
            { label: "Completed", value: stats.completed, icon: <CheckCircle2 />, color: "text-green-500" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center p-6 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-lg border border-gray-200 dark:border-neutral-800 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <div className={`text-4xl font-bold ${item.color || "text-gray-900 dark:text-gray-100"}`}>
                {item.value}
              </div>
              <div className="text-gray-600 dark:text-gray-300 text-sm flex items-center gap-2 mt-2">
                {item.icon}
                {item.label}
              </div>
            </div>
          ))}
        
        </div>


        {/* -- FILTERS + ADD TASK BUTTON -- */}
        <div className="flex justify-between items-center mb-8">

          <div className="flex gap-2">
            {["all", "pending", "in-progress", "completed"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2
                ${
                  filter === status
                    ? "bg-indigo-600 text-white shadow"
                    : "bg-white dark:bg-neutral-900 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-neutral-700 hover:bg-gray-100 dark:hover:bg-neutral-800"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
                <ChevronDown className="h-4 w-4 opacity-60" />
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setEditingTask(null);
              setShowForm(!showForm);
            }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 shadow-sm transition"
          >
            <Plus className="h-5 w-5" />
            {showForm ? "Cancel" : "Add Task"}
          </button>
        </div>


        {/* -- TASK FORM -- */}
        {showForm && (
          <TaskForm
            onSubmit={handleAddTask}
            initialData={editingTask}
            onCancel={() => {
              setShowForm(false);
              setEditingTask(null);
            }}
          />
        )}


        {/* -- TASK LIST / EMPTY STATE -- */}
        {loading ? (
          <div className="text-center py-16 flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-600 mb-3" />
            <p className="text-gray-600 dark:text-gray-300">Loading tasks…</p>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center py-16 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl rounded-xl border border-gray-200 dark:border-neutral-800 shadow-sm">
            <CircleDashed className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
              No tasks found
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Try adding a new task to get started.
            </p>
          </div>
        ) : (
          <TaskList
            tasks={filteredTasks}
            onStatusChange={handleStatusChange}
            onDelete={handleDeleteTask}
            onEdit={(task) => {
              setEditingTask(task);
              setShowForm(true);
            }}
          />
        )}

      </main>
    </div>
  );
}
