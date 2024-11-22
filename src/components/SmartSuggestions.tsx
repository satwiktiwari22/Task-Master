// components/SmartSuggestions.tsx
import React from "react";
import { Card, Typography, List, ListItem } from "@mui/material";
import { useTodo } from "../context/TodoContext";

const SmartSuggestions: React.FC = () => {
  const { todos } = useTodo();

  const getSuggestions = () => {
    const now = new Date();
    const hour = now.getHours();

    // Time-based suggestions
    const timeBasedTasks = todos.filter((todo) => {
      if (hour < 12 && todo.timeOfDay === "morning") return true;
      if (hour >= 12 && hour < 17 && todo.timeOfDay === "afternoon")
        return true;
      if (hour >= 17 && todo.timeOfDay === "evening") return true;
      return false;
    });

    // Energy level matching
    const userEnergyLevel = hour < 12 ? "high" : hour < 15 ? "medium" : "low";
    const energyMatchTasks = todos.filter(
      (todo) => todo.energy === userEnergyLevel
    );

    // Deadline pressure
    const urgentTasks = todos.filter(
      (todo) =>
        todo.dueDate &&
        new Date(todo.dueDate).getTime() - now.getTime() < 86400000
    );

    return { timeBasedTasks, energyMatchTasks, urgentTasks };
  };

  const suggestions = getSuggestions();

  return (
    <Card sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Smart Suggestions
      </Typography>
      <List>
        {suggestions.urgentTasks.map((task) => (
          <ListItem key={task.id}>
            <Typography color="error">Due soon: {task.title}</Typography>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default SmartSuggestions;
