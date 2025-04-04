import React from "react";

type TaskItemProps = {
  taskName: string;
  isCompleted: boolean;
  onToggle: () => void;
  onDelete: () => void;
};

const TaskItem: React.FC<TaskItemProps> = ({ taskName, isCompleted, onToggle, onDelete }) => {
  return (
    <li style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span
        style={{
          textDecoration: isCompleted ? "line-through" : "none",
          cursor: "pointer",
        }}
        onClick={onToggle}
      >
        {taskName}
      </span>
      <button onClick={onDelete} style={{ marginLeft: "1rem" }}>
        🗑️
      </button>
    </li>
  );
};

export default TaskItem;
