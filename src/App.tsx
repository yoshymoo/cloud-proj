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
import { getCurrentUser } from "./mock/mockAuth";
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports"; 


Amplify.configure(awsExports);

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [user, setUser] = useState<{ username: string } | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const userInfo = await getCurrentUser();
      setUser(userInfo);
      const data = await fetchTasks();
      setTasks(data);
    };
    loadData();
  }, []);

  const handleAddTask = async () => {
    if (newTask.trim() === "") return;
    const created = await addTask(newTask);
    setTasks((prev) => [...prev, created]);
    setNewTask("");
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleToggleTask = async (id: string) => {
    const updated = await toggleTask(id);
    if (updated) {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, isCompleted: !t.isCompleted } : t))
      );
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>📝 To-Do List</h1>
      {user && <p>Welcome, <strong>{user.username}</strong>!</p>}

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
    </div>
  );
};

export default App;
