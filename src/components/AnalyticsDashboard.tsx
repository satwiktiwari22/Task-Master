// components/AnalyticsDashboard.tsx
import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useTodo } from "../context/TodoContext";
import { Todo } from "../types/todo";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AnalyticsDashboard: React.FC = () => {
  const { todos } = useTodo();

  const getAnalytics = () => {
    const completed = todos.filter((t) => t.completed);
    const completionRate = todos.length
      ? (completed.length / todos.length) * 100
      : 0;

    const categoryData = todos.reduce(
      (acc: { [key: string]: number }, todo) => {
        acc[todo.category] = (acc[todo.category] || 0) + 1;
        return acc;
      },
      {}
    );

    const categoryChartData = Object.entries(categoryData).map(
      ([name, value]) => ({
        name,
        value,
      })
    );

    const dailyCompletions = completed.reduce(
      (acc: { [key: string]: number }, todo) => {
        const date = new Date(todo.createdAt).toLocaleDateString();
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      },
      {}
    );

    const trendData = Object.entries(dailyCompletions).map(([date, count]) => ({
      date,
      count,
    }));

    return {
      completionRate,
      categoryChartData,
      trendData,
      totalTasks: todos.length,
      completedTasks: completed.length,
    };
  };

  const analytics = getAnalytics();

  const MetricCard = ({
    title,
    value,
    suffix = "",
  }: {
    title: string;
    value: number;
    suffix?: string;
  }) => (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4">
          {value.toFixed(1)}
          {suffix}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Analytics Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <MetricCard
            title="Completion Rate"
            value={analytics.completionRate}
            suffix="%"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <MetricCard title="Total Tasks" value={analytics.totalTasks} />
        </Grid>
        <Grid item xs={12} md={3}>
          <MetricCard
            title="Completed Tasks"
            value={analytics.completedTasks}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <MetricCard
            title="Productivity Score"
            value={(analytics.completionRate * analytics.totalTasks) / 100}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 300 }}>
            <Typography variant="h6">Completion Trend</Typography>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytics.trendData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: 300 }}>
            <Typography variant="h6">Category Distribution</Typography>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analytics.categoryChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {analytics.categoryChartData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsDashboard;
