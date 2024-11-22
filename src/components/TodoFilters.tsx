import React from "react";
import { Grid, TextField, MenuItem } from "@mui/material";

interface TodoFiltersProps {
  filters: {
    category: string;
    priority: string;
    completed: string;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      category: string;
      priority: string;
      completed: string;
    }>
  >;
}

const TodoFilters: React.FC<TodoFiltersProps> = ({ filters, setFilters }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <TextField
          select
          label="Priority Filter"
          value={filters.priority}
          onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
          fullWidth
        >
          <MenuItem value="all">All Priorities</MenuItem>
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          select
          label="Status Filter"
          value={filters.completed}
          onChange={(e) =>
            setFilters({ ...filters, completed: e.target.value })
          }
          fullWidth
        >
          <MenuItem value="all">All Status</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="active">Active</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Category Filter"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default TodoFilters;
