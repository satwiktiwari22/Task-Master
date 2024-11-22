// components/RecurringTaskDialog.tsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";

interface RecurringPattern {
  frequency: "daily" | "weekly" | "monthly";
  interval: number;
  endDate?: Date;
}

interface RecurringTaskDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (recurring: RecurringPattern) => void;
  current?: RecurringPattern;
}

const RecurringTaskDialog: React.FC<RecurringTaskDialogProps> = ({
  open,
  onClose,
  onSave,
  current,
}) => {
  const [pattern, setPattern] = React.useState<RecurringPattern>({
    frequency: "daily",
    interval: 1,
    endDate: undefined,
  });

  React.useEffect(() => {
    if (current) {
      setPattern(current);
    }
  }, [current]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Set Recurring Pattern</DialogTitle>
      <DialogContent>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Frequency</InputLabel>
          <Select
            value={pattern.frequency}
            onChange={(e) =>
              setPattern({
                ...pattern,
                frequency: e.target.value as "daily" | "weekly" | "monthly",
              })
            }
          >
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
          </Select>
        </FormControl>
        <TextField
          type="number"
          label="Interval"
          value={pattern.interval}
          onChange={(e) =>
            setPattern({
              ...pattern,
              interval: parseInt(e.target.value) || 1,
            })
          }
          fullWidth
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => onSave(pattern)} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RecurringTaskDialog;
