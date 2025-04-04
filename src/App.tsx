import React, { useEffect, useState } from "react";
import "./App.css";
import TaskList from "./components/TaskList";
import {
  fetchTasks,
  addTask,
  deleteTask,
  toggleTask,
  Task,
} from "./mock/mockTasks";
import {
  getCurrentUser,
  signIn,
  signOut,
} from "./mock/mockAuth";
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";

Amplify.configure(awsExports);

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [user, setUser] = useState<{ username: string } | null>(null);

  // Load user + tasks on startup
  useEffect(() => {
    const loadData = async () => {
      const userInfo = await getCurrentUser();
      setUser(userInfo);
      if (userInfo) {
        const stored = localStorage.getItem(`mockTasks-${userInfo.username}`);
        if (stored) {
          setTasks(JSON.parse(stored));
        } else {
          const data = await fetchTasks(userInfo.username);
          setTasks(data);
        }
      }
    };
    loadData();
  }, []);

  // Save tasks to localStorage when updated
  useEffect(() => {
    if (user) {
      localStorage.setItem(`mockTasks-${user.username}`, JSON.stringify(tasks));
    }
  }, [tasks, user]);

  const handleLogin = async () => {
    const userInfo = await signIn();
    setUser(userInfo);
    const stored = localStorage.getItem(`mockTasks-${userInfo.username}`);
    if (stored) {
      setTasks(JSON.parse(stored));
    } else {
      const data = await fetchTasks(userInfo.username);
      setTasks(data);
    }
  };

  const handleLogout = async () => {
    if (user) {
      localStorage.removeItem(`mockTasks-${user.username}`);
    }
    await signOut();
    setUser(null);
    setTasks([]);
  };

  const handleAddTask = async () => {
    if (newTask.trim() === "" || !user) return;
    const created = await addTask(newTask, user.username);
    setTasks((prev) => [...prev, created]);
    setNewTask("");
  };

  const handleDeleteTask = async (id: string) => {
    if (!user) return;
    await deleteTask(id, user.username);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };
  
  const handleToggleTask = async (id: string) => {
    if (!user) return;
    const updated = await toggleTask(id, user.username);
    if (updated) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
        )
      );
    }
  };
  

  

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>📝 To-Do List</h1>

      {user ? (
        <>
          <p>
            Welcome, <strong>{user.username}</strong>!
          </p>
          <button onClick={handleLogout} style={{ marginBottom: "1rem" }}>
            Logout
          </button>

          <div style={{ marginBottom: "1rem" }}>
            <input
              type="text"
              value={newTask}
              placeholder="Enter a new task"
              onChange={(e) => setNewTask(e.target.value)}
              style={{ padding: "0.5rem", marginRight: "0.5rem", width: "60%" }}
            />
            <button onClick={handleAddTask}>Add Task</button>
          </div>

          <TaskList
            tasks={tasks}
            onDelete={handleDeleteTask}
            onToggle={handleToggleTask}
          />
        </>
      ) : (
        <>
          <p>Please log in to access your tasks.</p>
          <button onClick={handleLogin}>Login</button>
        </>
      )}
    </div>
  );
};

export default App;
