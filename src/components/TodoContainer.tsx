import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Tabs,
  Tab,
  Grid,
  useTheme,
  alpha,
} from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import BarChartIcon from "@mui/icons-material/BarChart";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import TodoFilters from "./TodoFilters";
import SmartSuggestions from "./SmartSuggestions";
import AnalyticsDashboard from "./AnalyticsDashboard";
import TabPanel from "./TabPanel";

const TodoContainer: React.FC = () => {
  const theme = useTheme();
  const [filters, setFilters] = useState({
    category: "all",
    priority: "all",
    completed: "all",
  });

  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: { xs: 2, md: 4 },
        px: { xs: 1, md: 2 },
        background: "transparent",
      }}
    >
      <Container maxWidth="xl">
        {/* Hero Section */}
        <Box
          sx={{
            textAlign: "center",
            mb: 6,
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: -20,
              left: "50%",
              transform: "translateX(-50%)",
              width: "200px",
              height: "200px",
              background: `radial-gradient(circle, ${alpha(
                theme.palette.primary.main,
                0.1
              )} 0%, transparent 70%)`,
              zIndex: -1,
            },
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              mb: 2,
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 700,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
              animation: "fadeIn 0.5s ease-out",
            }}
          >
            Task Master
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: "text.secondary",
              mb: 4,
              maxWidth: "600px",
              mx: "auto",
              animation: "slideUp 0.5s ease-out",
            }}
          >
            Organize your tasks efficiently with our smart task management
            system
          </Typography>
        </Box>

        {/* Main Content */}
        <Box
          sx={{
            borderRadius: 4,
            bgcolor: "background.paper",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            mb: 3,
            overflow: "hidden",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            },
          }}
        >
          {/* Enhanced Tabs */}
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            centered
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              "& .MuiTab-root": {
                minWidth: { xs: "auto", sm: 160 },
                px: { xs: 2, sm: 3 },
                py: 2,
                fontSize: "1rem",
                textTransform: "none",
                fontWeight: 500,
                transition: "all 0.3s ease",
                "&:hover": {
                  color: "primary.main",
                  background: alpha(theme.palette.primary.main, 0.04),
                },
              },
              "& .Mui-selected": {
                fontWeight: 600,
              },
              "& .MuiTabs-indicator": {
                height: 3,
                borderRadius: "3px 3px 0 0",
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              },
            }}
          >
            <Tab icon={<FormatListBulletedIcon />} label="Tasks" />
            <Tab icon={<AddCircleOutlineIcon />} label="Create Task" />
            <Tab icon={<BarChartIcon />} label="Analytics" />
          </Tabs>

          {/* Rest of your existing TabPanel components */}
        </Box>

        {/* Tasks Tab */}
        <TabPanel value={activeTab} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                <TodoFilters filters={filters} setFilters={setFilters} />
              </Paper>
              <Paper elevation={3} sx={{ p: 3 }}>
                <TodoList filters={filters} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <SmartSuggestions />
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Create Task Tab */}
        <TabPanel value={activeTab} index={1}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <TodoForm />
          </Paper>
        </TabPanel>

        {/* Analytics Tab */}
        <TabPanel value={activeTab} index={2}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <AnalyticsDashboard />
          </Paper>
        </TabPanel>
      </Container>
    </Box>
  );
};

export default TodoContainer;
