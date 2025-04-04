import React from "react";
import TaskItem from "./TaskItem";
import { Task } from "../mock/mockTasks";

type TaskListProps = {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onDelete }) => {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          taskName={task.taskName}
          isCompleted={task.isCompleted}
          onToggle={() => onToggle(task.id)}
          onDelete={() => onDelete(task.id)}
        />
      ))}
    </ul>
  );
};

export default TaskList;
