import { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { api } from '../services/api';
import './Home.css';

function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await api.getTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks. Make sure the API is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (taskData) => {
    try {
      const newTask = await api.createTask(taskData);
      setTasks([newTask, ...tasks]);
    } catch (err) {
      setError('Failed to create task');
    }
  };

  const handleUpdate = async (id, updates) => {
    try {
      const updatedTask = await api.updateTask(id, updates);
      setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteTask(id);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const taskCounts = {
    all: tasks.length,
    pending: tasks.filter((t) => t.status === 'pending').length,
    in_progress: tasks.filter((t) => t.status === 'in_progress').length,
    completed: tasks.filter((t) => t.status === 'completed').length,
  };

  return (
    <div className="home">
      <header className="header">
        <h1>Task Management</h1>
        <p>Organize your tasks efficiently</p>
      </header>

      <main className="main-content">
        <section className="create-section">
          <h2>Create New Task</h2>
          <TaskForm onSubmit={handleCreate} />
        </section>

        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError(null)}>Dismiss</button>
          </div>
        )}

        <section className="tasks-section">
          <div className="tasks-header">
            <h2>Your Tasks ({filteredTasks.length})</h2>
            <div className="filter-buttons">
              <button
                className={filter === 'all' ? 'active' : ''}
                onClick={() => setFilter('all')}
              >
                All ({taskCounts.all})
              </button>
              <button
                className={filter === 'pending' ? 'active' : ''}
                onClick={() => setFilter('pending')}
              >
                Pending ({taskCounts.pending})
              </button>
              <button
                className={filter === 'in_progress' ? 'active' : ''}
                onClick={() => setFilter('in_progress')}
              >
                In Progress ({taskCounts.in_progress})
              </button>
              <button
                className={filter === 'completed' ? 'active' : ''}
                onClick={() => setFilter('completed')}
              >
                Completed ({taskCounts.completed})
              </button>
            </div>
          </div>
          <TaskList
            tasks={filteredTasks}
            loading={loading}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        </section>
      </main>
    </div>
  );
}

export default Home;
