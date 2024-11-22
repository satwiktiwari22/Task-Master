// src/components/TodoList.tsx
import React, { useState } from "react";
import { Box } from "@mui/material";
import { Todo } from "../types/todo";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  Chip,
  Stack,
  Typography,
  Collapse,
  Link,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { useTodo } from "../context/TodoContext";

interface ExpandableListItemProps {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
  onComplete: (id: string) => void; // Add this
  expanded: boolean;
}

const ExpandableListItem: React.FC<ExpandableListItemProps> = ({
  todo,
  onToggle,
  onDelete,
  onComplete,
  expanded,
}) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "error";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "default";
    }
  };

  return (
    <>
      <ListItem
        secondaryAction={
          <Stack direction="row" spacing={1}>
            <IconButton onClick={onToggle}>
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
            <IconButton edge="end" onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </Stack>
        }
        sx={{
          bgcolor: "background.paper",
          mb: 0,
          borderRadius: expanded ? "8px 8px 0 0" : 2,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Checkbox
          checked={todo.completed}
          onChange={() => onComplete(todo.id)}
          onClick={(e) => e.stopPropagation()}
        />
        <ListItemText
          primary={
            <Typography
              variant="body1"
              sx={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.title}
            </Typography>
          }
          secondary={
            <Stack direction="row" spacing={1} mt={1}>
              <Chip
                label={todo.priority}
                size="small"
                color={getPriorityColor(todo.priority)}
              />
              {todo.category && (
                <Chip label={todo.category} size="small" variant="outlined" />
              )}
              {todo.attachments && todo.attachments.length > 0 && (
                <Chip
                  icon={<AttachFileIcon />}
                  label={`${todo.attachments.length} files`}
                  size="small"
                  variant="outlined"
                />
              )}
            </Stack>
          }
        />
      </ListItem>
      <Collapse in={expanded}>
        <Box
          sx={{
            p: 2,
            borderRadius: "0 0 8px 8px",
            border: "1px solid",
            borderColor: "divider",
            borderTop: "none",
            bgcolor: "background.paper",
          }}
        >
          {todo.attachments && todo.attachments.length > 0 && (
            <Stack spacing={1}>
              <Typography variant="subtitle2">Attachments:</Typography>
              {todo.attachments.map((file) => (
                <Stack
                  key={file.id}
                  direction="row"
                  spacing={1}
                  alignItems="center"
                >
                  <InsertDriveFileIcon color="primary" fontSize="small" />
                  <Link href={file.url} target="_blank" rel="noopener">
                    {file.name}
                  </Link>
                </Stack>
              ))}
            </Stack>
          )}
        </Box>
      </Collapse>
    </>
  );
};

interface TodoListProps {
  filters: {
    category: string;
    priority: string;
    completed: string;
  };
}

const TodoList: React.FC<TodoListProps> = ({ filters }) => {
  const { todos, toggleTodo, deleteTodo } = useTodo();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredTodos = todos.filter((todo) => {
    const categoryMatch =
      filters.category === "all" || todo.category.includes(filters.category);
    const priorityMatch =
      filters.priority === "all" || todo.priority === filters.priority;
    const completedMatch =
      filters.completed === "all" ||
      (filters.completed === "completed" ? todo.completed : !todo.completed);

    return categoryMatch && priorityMatch && completedMatch;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "error";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "default";
    }
  };

  return (
    <List>
      {filteredTodos.map((todo) => (
        <ExpandableListItem
          key={todo.id}
          todo={todo}
          expanded={expandedId === todo.id}
          onToggle={() => handleExpand(todo.id)}
          onDelete={() => deleteTodo(todo.id)}
          onComplete={toggleTodo} // Add this
        />
      ))}
    </List>
  );
};

export default TodoList;
