import { Pencil, Trash2, Flag, Calendar, CheckCircle2, Loader2 } from "lucide-react";

export default function TaskList({ tasks, onStatusChange, onDelete, onEdit }) {

  const priorityConfig = {
    high:    "text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400",
    medium:  "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400",
    low:     "text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400",
    default: "text-gray-600 bg-gray-100 dark:bg-neutral-800 dark:text-gray-300"
  };

  const statusConfig = {
    completed:   "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
    "in-progress": "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
    pending:     "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
    default:     "bg-gray-100 text-gray-800 dark:bg-neutral-800 dark:text-gray-300"
  };

  const priorityIcon = {
    high: <Flag className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />,
    medium: <Flag className="h-3.5 w-3.5 text-yellow-600 dark:text-yellow-400" />,
    low: <Flag className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
  };

  const statusIcon = {
    completed: <CheckCircle2 className="h-3.5 w-3.5" />,
    "in-progress": <Loader2 className="h-3.5 w-3.5 animate-spin" />,
    pending: <Flag className="h-3.5 w-3.5" />
  };

  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <div
          key={task._id}
          className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-gray-200 dark:border-neutral-800 p-6 transition hover:shadow-md"
        >
          {/* TOP ROW */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {task.title}
              </h3>

              {task.description && (
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {task.description}
                </p>
              )}
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-3 ml-4">
              <button
                onClick={() => onEdit(task)}
                className="flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 dark:hover:text-indigo-400 text-sm font-medium transition"
              >
                <Pencil className="h-4 w-4" /> Edit
              </button>

              <button
                onClick={() => onDelete(task._id)}
                className="flex items-center gap-1.5 text-red-600 hover:text-red-800 dark:hover:text-red-400 text-sm font-medium transition"
              >
                <Trash2 className="h-4 w-4" /> Delete
              </button>
            </div>
          </div>

          {/* BOTTOM ROW BADGES */}
          <div className="flex flex-wrap gap-3 items-center">

            {/* PRIORITY */}
            <span
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${priorityConfig[task.priority] || priorityConfig.default}`}
            >
              {priorityIcon[task.priority]}  
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
            </span>

            {/* STATUS */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border-0 ${statusConfig[task.status]}`}
            >
              {statusIcon[task.status]}
              <select
                value={task.status}
                onChange={(e) => onStatusChange(task._id, e.target.value)}
                className="bg-transparent border-none outline-none text-xs font-medium cursor-pointer focus:ring-0 p-0"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* DUE DATE */}
            {task.dueDate && (
              <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300 text-xs">
                <Calendar className="h-3.5 w-3.5" />
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
