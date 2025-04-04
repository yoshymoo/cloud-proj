// src/components/TaskItem.tsx

import React from "react";

type TaskItemProps = {
  taskName: string;
  isCompleted: boolean;
};

const TaskItem: React.FC<TaskItemProps> = ({ taskName, isCompleted }) => {
  return (
    <li style={{ textDecoration: isCompleted ? "line-through" : "none" }}>
      {taskName}
    </li>
  );
};

export default TaskItem;
