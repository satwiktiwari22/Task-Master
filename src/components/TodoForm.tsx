import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  Stack,
  FormControl,
  InputLabel,
  Select,
  Chip,
  Input,
  Fade,
  Tooltip,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useTodo } from "../context/TodoContext";
import { v4 as uuidv4 } from "uuid";
import FileUploader from "./FileUploader";
import RecurringTaskDialog from "./RecurringTaskDialog";
import RepeatIcon from "@mui/icons-material/Repeat";

const TodoForm: React.FC = () => {
  const { addTodo } = useTodo();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium" as "low" | "medium" | "high",
    category: "",
    dueDate: null as Date | null,
    estimatedTime: 0,
    energy: "medium" as "low" | "medium" | "high",
    timeOfDay: "any" as "morning" | "afternoon" | "evening" | "any",
    location: "",
    tags: [] as string[],
    recurring: {
      enabled: false,
      frequency: "daily" as "daily" | "weekly" | "monthly",
      interval: 1,
    },
  });

  const [newTag, setNewTag] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [showRecurringDialog, setShowRecurringDialog] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const attachments = await Promise.all(
      files.map(async (file) => {
        const url = URL.createObjectURL(file);
        return {
          id: uuidv4(),
          name: file.name,
          url,
          type: file.type,
        };
      })
    );

    addTodo({
      ...formData,
      completed: false,
      progress: 0,
      actualTime: 0,
      subtasks: [],
      attachments,
      collaborators: [],
      notes: [],
    });

    setFiles([]);
    setFormData({
      title: "",
      description: "",
      priority: "medium",
      category: "",
      dueDate: null,
      estimatedTime: 0,
      energy: "medium",
      timeOfDay: "any",
      location: "",
      tags: [],
      recurring: {
        enabled: false,
        frequency: "daily",
        interval: 1,
      },
    });
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()],
      });
      setNewTag("");
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToDelete),
    });
  };

  return (
    <Fade in={true}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3} sx={{ p: { xs: 2, md: 3 } }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Create New Task
          </Typography>

          <Tooltip title="Enter a clear and concise task title">
            <TextField
              label="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": { bgcolor: "background.paper" },
              }}
            />
          </Tooltip>

          <TextField
            label="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            multiline
            rows={2}
            fullWidth
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <TextField
                  select
                  label="Priority"
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      priority: e.target.value as "low" | "medium" | "high",
                    })
                  }
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </TextField>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <DatePicker
                label="Due Date"
                value={formData.dueDate}
                onChange={(date) => setFormData({ ...formData, dueDate: date })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                type="number"
                label="Estimated Time (minutes)"
                value={formData.estimatedTime}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    estimatedTime: parseInt(e.target.value) || 0,
                  })
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <TextField
                  select
                  label="Energy Level"
                  value={formData.energy}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      energy: e.target.value as "low" | "medium" | "high",
                    })
                  }
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </TextField>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <TextField
                  select
                  label="Best Time"
                  value={formData.timeOfDay}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      timeOfDay: e.target.value as
                        | "morning"
                        | "afternoon"
                        | "evening"
                        | "any",
                    })
                  }
                >
                  <MenuItem value="morning">Morning</MenuItem>
                  <MenuItem value="afternoon">Afternoon</MenuItem>
                  <MenuItem value="evening">Evening</MenuItem>
                  <MenuItem value="any">Any Time</MenuItem>
                </TextField>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <Stack direction="row" spacing={1}>
                  <TextField
                    label="Add Tags"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    fullWidth
                  />
                  <Button onClick={handleAddTag} variant="outlined">
                    Add
                  </Button>
                </Stack>
                <Stack direction="row" spacing={1}>
                  {formData.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      onDelete={() => handleDeleteTag(tag)}
                    />
                  ))}
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <FileUploader
                files={files}
                onFileSelect={(newFiles) => setFiles([...files, ...newFiles])}
                onFileRemove={(fileName) =>
                  setFiles(files.filter((f) => f.name !== fileName))
                }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              mt: 2,
              height: 48,
              fontSize: "1.1rem",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "scale(1.02)",
              },
            }}
          >
            Add Todo
          </Button>
          <Button
            onClick={() => setShowRecurringDialog(true)}
            startIcon={<RepeatIcon />}
          >
            Make Recurring
          </Button>
        </Stack>
      </form>
    </Fade>
  );
};

export default TodoForm;
