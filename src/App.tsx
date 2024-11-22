import React, { Suspense } from "react";
import { TodoProvider } from "./context/TodoContext";
import {
  ThemeProvider,
  CssBaseline,
  CircularProgress,
  Box,
} from "@mui/material";
import { theme } from "./theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import "./App.css";

const TodoContainer = React.lazy(() => import("./components/TodoContainer"));

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="gradient-bg" />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TodoProvider>
          <Suspense
            fallback={
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                }}
              >
                <CircularProgress />
              </Box>
            }
          >
            <TodoContainer />
          </Suspense>
        </TodoProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
