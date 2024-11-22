// src/components/TodoList.tsx
import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  Chip,
  Stack,
  Typography,
  Fade,
  Grow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTodo } from "../context/TodoContext";

interface TodoListProps {
  filters: {
    category: string;
    priority: string;
    completed: string;
  };
}

const TodoList: React.FC<TodoListProps> = ({ filters }) => {
  const { todos, toggleTodo, deleteTodo } = useTodo();

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
    <Fade in={true}>
      <List
        sx={{
          "& .MuiListItem-root": {
            transition: "transform 0.2s, box-shadow 0.2s",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: 2,
            },
          },
        }}
      >
        {filteredTodos.map((todo, index) => (
          <Grow key={todo.id} in={true} timeout={(index + 1) * 200}>
            <ListItem
              secondaryAction={
                <IconButton edge="end" onClick={() => deleteTodo(todo.id)}>
                  <DeleteIcon />
                </IconButton>
              }
              sx={{
                bgcolor: "background.paper",
                mb: 1.5,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
                "&:hover": {
                  borderColor: "primary.main",
                },
              }}
            >
              <Checkbox
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
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
                      <Chip
                        label={todo.category}
                        size="small"
                        variant="outlined"
                      />
                    )}
                    {todo.dueDate && (
                      <Chip
                        label={new Date(todo.dueDate).toLocaleDateString()}
                        size="small"
                        variant="outlined"
                      />
                    )}
                  </Stack>
                }
              />
            </ListItem>
          </Grow>
        ))}
      </List>
    </Fade>
  );
};

export default TodoList;
