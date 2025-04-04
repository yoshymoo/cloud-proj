import React from "react";
import { Task } from "../mock/mockTasks";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <li
      onClick={() => onToggle(task.id)}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.75rem",
        borderBottom: "1px solid #ddd",
        cursor: "pointer",
        fontSize: "1.25rem", // ⬅️ Increase font size here
        color: task.isCompleted ? "#999" : "#000",
        textDecoration: task.isCompleted ? "line-through" : "none",
      }}
    >
      {task.taskName}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(task.id);
        }}
      >
        🗑️
      </button>
    </li>
  );
};

export default TaskItem;
