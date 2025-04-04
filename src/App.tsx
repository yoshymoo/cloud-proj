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
  signUp,
} from "./mock/mockAuth";
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";

Amplify.configure(awsExports);

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [usernameInput, setUsernameInput] = useState("");
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      const current = await getCurrentUser();
      setUser(current);
      if (current) {
        const stored = localStorage.getItem(`mockTasks-${current.username}`);
        setTasks(stored ? JSON.parse(stored) : await fetchTasks(current.username));
      }
    };
    loadUser();
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`mockTasks-${user.username}`, JSON.stringify(tasks));
    }
  }, [tasks, user]);

  const handleAddTask = async () => {
    if (!newTask.trim() || !user) return;
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

  const handleLogout = async () => {
    if (user) {
      localStorage.removeItem(`mockTasks-${user.username}`);
    }
    await signOut();
    setUser(null);
    setTasks([]);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>📝 To-Do List</h1>

      {!user ? (
        <>
          <h3>{authMode === "login" ? "Login" : "Sign Up"}</h3>
          <input
            type="text"
            placeholder="Enter username"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            style={{ padding: "0.5rem", marginRight: "0.5rem" }}
          />
          <button
            onClick={async () => {
              setAuthError("");
              try {
                const userInfo =
                  authMode === "login"
                    ? await signIn(usernameInput)
                    : await signUp(usernameInput);
                setUser(userInfo);
                const stored = localStorage.getItem(`mockTasks-${userInfo.username}`);
                setTasks(stored ? JSON.parse(stored) : await fetchTasks(userInfo.username));
              } catch (err: any) {
                setAuthError(err.message);
              }
            }}
          >
            {authMode === "login" ? "Login" : "Sign Up"}
          </button>
          <p>
            {authMode === "login" ? (
              <>
                Don’t have an account?{" "}
                <button onClick={() => setAuthMode("signup")}>Sign up</button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button onClick={() => setAuthMode("login")}>Login</button>
              </>
            )}
          </p>
          {authError && <p style={{ color: "red" }}>{authError}</p>}
        </>
      ) : (
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
      )}
    </div>
  );
};

export default App;
