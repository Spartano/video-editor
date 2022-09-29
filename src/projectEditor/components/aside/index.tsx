import { Box } from "@mui/material";
import React from "react";
import VideoPreview from "./VideoPreview";

type Props = {
  videos: any[];
};

export default function EditorAside({ videos }: Props) {
  return (
    <Box
      component="aside"
      sx={{
        display: "grid",
        gap: "10px",
      }}
    >
      {videos.map((video) => (
        <VideoPreview key={video.id} clip={video} />
      ))}
    </Box>
  );
}
