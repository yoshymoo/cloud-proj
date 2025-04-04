// src/mock/mockTasks.ts

export interface Task {
  id: string;
  taskName: string;
  isCompleted: boolean;
  createdAt: string;
}

let tasks: Task[] = [
  {
    id: "1",
    taskName: "Buy groceries",
    isCompleted: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    taskName: "Submit report",
    isCompleted: true,
    createdAt: new Date().toISOString(),
  },
];

// Simulate fetching all tasks
export const fetchTasks = async (): Promise<Task[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(tasks), 300));
};

// Add a new task
export const addTask = async (taskName: string): Promise<Task> => {
  const newTask: Task = {
    id: Date.now().toString(),
    taskName,
    isCompleted: false,
    createdAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  return newTask;
};

// Toggle complete status
export const toggleTask = async (id: string): Promise<Task | null> => {
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.isCompleted = !task.isCompleted;
    return task;
  }
  return null;
};

// Delete a task
export const deleteTask = async (id: string): Promise<void> => {
  tasks = tasks.filter((t) => t.id !== id);
};
