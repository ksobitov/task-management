import TaskItem from './TaskItem';
import './TaskList.css';

function TaskList({ tasks, onUpdate, onDelete, loading }) {
  if (loading) {
    return <div className="task-list-message">Loading tasks...</div>;
  }

  if (tasks.length === 0) {
    return (
      <div className="task-list-message">
        No tasks yet. Create your first task above!
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TaskList;
