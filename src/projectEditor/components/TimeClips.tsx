import * as React from "react";
import Slider from "@mui/material/Slider";
import { getTimelineChannel } from "../store";
import TimeClip from "./timeClips/TimeClip";

export default function TimeClips() {
  const { clips, duration } = getTimelineChannel();

  return (
    <div className="time-clips flex px-2 w-full h-[60px] pointer-events-auto">
      {clips.map((clip) => (
        <TimeClip clip={clip} duration={duration} />
      ))}
    </div>
  );
}
