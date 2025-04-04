export interface Task {
  id: string;
  userId: string;
  taskName: string;
  isCompleted: boolean;
  createdAt: string;
}

// In-memory simulation of tasks (for runtime only)
let tasks: Task[] = [];

// Simulates fetching tasks that belong to a specific user
export const fetchTasks = async (userId: string): Promise<Task[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userTasks = tasks.filter((t) => t.userId === userId);
      resolve(userTasks);
    }, 300);
  });
};

// Simulates adding a new task for the logged-in user
export const addTask = async (taskName: string, userId: string): Promise<Task> => {
  const newTask: Task = {
    id: Date.now().toString(),
    userId,
    taskName,
    isCompleted: false,
    createdAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  return newTask;
};

// Simulates toggling task completion, ensuring the task belongs to the user
export const toggleTask = async (id: string, userId: string): Promise<Task | null> => {
  const task = tasks.find((t) => t.id === id && t.userId === userId);
  if (task) {
    task.isCompleted = !task.isCompleted;
    return task;
  }
  return null;
};

// Simulates deleting a task, only if it belongs to the user
export const deleteTask = async (id: string, userId: string): Promise<void> => {
  tasks = tasks.filter((t) => !(t.id === id && t.userId === userId));
};
