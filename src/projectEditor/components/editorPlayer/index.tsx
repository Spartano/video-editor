import * as React from "react";
import Box from "@mui/material/Box";
import {
  ChannelClip,
  setSelectedClip,
  getTimelineChannel,
  getTimeSeeker,
} from "../../store";
import EditorClip from "./EditorClip";

const getTimeOffset = (clips: ChannelClip[], stopIndex: number) => {
  const timeOffset = clips.reduce(
    (result, clip, currentIndex) => {
      if (currentIndex <= stopIndex) {
        result.endOffset += clip.duration;
      }
      if (currentIndex <= stopIndex - 1) {
        result.startOffset += clip.duration;
      }
      return result;
    },
    {
      startOffset: 0,
      endOffset: 0,
    }
  );

  return timeOffset;
};

export default function EditorPlayer() {
  const { clips } = getTimelineChannel();
  const timeseekerValue = getTimeSeeker();

  return (
    <main className="flex flex-col items-center justify-center">
      <Box
        sx={{
          width: "786px",
          height: "442px",
          display: "grid",
          backgroundColor: "#000",
        }}
      >
        {clips.map((clip, stopIndex) => {
          const { startOffset, endOffset } = getTimeOffset(clips, stopIndex);
          const isVisible =
            startOffset <= timeseekerValue && timeseekerValue < endOffset;
          console.log(startOffset, endOffset, timeseekerValue);

          const seekTime = timeseekerValue - startOffset;
          return (
            <EditorClip
              key={stopIndex}
              clip={clip}
              seekTime={seekTime}
              isVisible={isVisible}
            />
          );
        })}
      </Box>
      <Box>controls</Box>
    </main>
  );
}
