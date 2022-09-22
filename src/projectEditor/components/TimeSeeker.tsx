import * as React from "react";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import store, { getTimelineDuration } from "../store";

const CustomBoxShadow =
  "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)";

const generateMarks = (size: number) => {
  let r = [];
  for (let i = 0; i <= size; i += 1) {
    if (i % 10 == 0 || (i === size && i % 10 > 6)) {
      const dateObj = new Date(i * 1000);
      const minutes = dateObj.getUTCMinutes();
      const seconds = dateObj.getSeconds();

      const timeString =
        minutes.toString().padStart(2, "0") +
        ":" +
        seconds.toString().padStart(2, "0");

      r.push({
        value: i,
        label: timeString,
      });
    } else if (i % 2 === 0) {
      r.push({
        value: i,
      });
    }
  }
  return r;
};

const CustomSlider = styled(Slider)(({ theme }) => ({
  color: "#3880ff",
  height: 2,
  zIndex: 1,
  padding: "15px 0",
  "& .MuiSlider-thumb": {
    height: 28,
    width: 28,
    backgroundColor: "#fff",
    boxShadow: CustomBoxShadow,
    "&:focus, &:hover, &.Mui-active": {
      boxShadow:
        "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        boxShadow: CustomBoxShadow,
      },
    },
  },
  "& .MuiSlider-valueLabel": {
    fontSize: 12,
    fontWeight: "normal",
    top: -6,
    backgroundColor: "unset",
    color: theme.palette.text.primary,
    "&:before": {
      display: "none",
    },
    "& *": {
      background: "transparent",
      color: "#fff",
    },
  },
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-rail": {
    opacity: 0.5,
    backgroundColor: "#bfbfbf",
  },
  "& .MuiSlider-markLabel": {
    color: "#3880ff",
    fontSize: 10,
  },
  "& .MuiSlider-mark": {
    backgroundColor: "#bfbfbf",
    height: 8,
    width: 1,
    "&.MuiSlider-markActive": {
      opacity: 1,
      backgroundColor: "currentColor",
    },
  },
}));

export default function TimeSeeker() {
  const duration = getTimelineDuration();
  const marks = generateMarks(duration);
  console.log(duration, marks);

  return (
    <Box sx={{ width: 1, px: 2, pointerEvents: "auto" }}>
      <CustomSlider step={1} marks={marks} min={0} max={duration} />
    </Box>
  );
}