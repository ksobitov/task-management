import { useState } from 'react';
import TaskForm from './TaskForm';
import './TaskItem.css';

function TaskItem({ task, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const statusLabels = {
    pending: 'Pending',
    in_progress: 'In Progress',
    completed: 'Completed',
  };

  const handleStatusChange = async (newStatus) => {
    setLoading(true);
    try {
      await onUpdate(task.id, { status: newStatus });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (updates) => {
    await onUpdate(task.id, updates);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setLoading(true);
      try {
        await onDelete(task.id);
      } finally {
        setLoading(false);
      }
    }
  };

  if (isEditing) {
    return (
      <div className="task-item editing">
        <TaskForm
          initialData={task}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className={`task-item ${task.status}`}>
      <div className="task-content">
        <h3 className="task-title">{task.title}</h3>
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
        <div className="task-meta">
          <span className={`status-badge ${task.status}`}>
            {statusLabels[task.status]}
          </span>
          <span className="task-date">
            {new Date(task.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>
      <div className="task-actions">
        <select
          value={task.status}
          onChange={(e) => handleStatusChange(e.target.value)}
          disabled={loading}
          className="status-select"
        >
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button onClick={() => setIsEditing(true)} className="edit-btn">
          Edit
        </button>
        <button onClick={handleDelete} disabled={loading} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
