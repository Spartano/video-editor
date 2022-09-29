import * as React from "react";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { ChannelClip, setSelectedClip } from "../../store";
import { useEffect, useRef } from "react";

export default function EditorPlayer({
  clip,
  seekTime,
  isVisible,
}: {
  clip: ChannelClip;
  seekTime: number;
  isVisible: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.currentTime = seekTime;
    }
  }, [seekTime]);

  return (
    <Box
      ref={ref}
      component="video"
      preload="auto"
      src={clip.src}
      id={clip.id}
      height={"100%"}
      width={"100%"}
      sx={{ display: isVisible ? "auto" : "none" }}
    ></Box>
  );
}
