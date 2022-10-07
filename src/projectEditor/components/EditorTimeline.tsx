import { Box } from "@mui/system";
import React from "react";

import TimeClips from "./timeClips";
import TimeSeeker from "./TimeSeeker";

type Props = {};

export default function EditorTimeline({}: Props) {
  return (
    <Box
      component="footer"
      className={"relative flex"}
      sx={{
        gridColumn: "1/-1",
        "&:before": {
          content: '""',
          position: "absolute",
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          backgroundImage:
            "linear-gradient(to top, rgba(0, 0, 0, 0.1) 60px, transparent 0)",
          top: 0,
          left: 0,
          right: 0,
          bottom: 35,
          backgroundColor: "rgba(0,0,0,.2)",
        },
      }}
    >
      <div className="timeline-wrapper pb-[15px] pt-[15px] flex flex-col justify-end flex-1">
        <div className="timeline flex-col pointer-events-none">
          <TimeClips />
          <TimeSeeker />
        </div>
      </div>
    </Box>
  );
}
