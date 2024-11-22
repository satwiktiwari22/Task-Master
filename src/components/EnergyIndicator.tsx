// components/EnergyIndicator.tsx
import React from "react";
import { Box, Tooltip, SvgIcon } from "@mui/material";
import BatteryFullIcon from "@mui/icons-material/BatteryFull";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import Battery60Icon from "@mui/icons-material/Battery60";

interface EnergyIndicatorProps {
  level: "low" | "medium" | "high";
}

const EnergyIndicator: React.FC<EnergyIndicatorProps> = ({ level }) => {
  const getEnergyIcon = () => {
    switch (level) {
      case "high":
        return <BatteryFullIcon sx={{ color: "success.main" }} />;
      case "medium":
        return <BatteryChargingFullIcon sx={{ color: "warning.main" }} />;
      case "low":
        return <Battery60Icon sx={{ color: "error.main" }} />;
    }
  };

  const getEnergyLabel = () => {
    switch (level) {
      case "high":
        return "High Energy Task";
      case "medium":
        return "Medium Energy Task";
      case "low":
        return "Low Energy Task";
    }
  };

  return (
    <Tooltip title={getEnergyLabel()}>
      <Box sx={{ display: "inline-flex", alignItems: "center" }}>
        {getEnergyIcon()}
      </Box>
    </Tooltip>
  );
};

export default EnergyIndicator;
