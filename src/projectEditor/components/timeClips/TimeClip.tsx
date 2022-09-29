import * as React from "react";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { ChannelClip, setSelectedClip } from "../../store";
import { useEffect, useRef, useState } from "react";

export default function TimeClip({
  clip,
  duration,
}: {
  clip: ChannelClip;
  duration: number;
}) {
  const width = (clip.duration * 100) / duration + "%";
  const canvas = useRef<HTMLCanvasElement>(null);
  const dummyVideo = useRef<HTMLVideoElement>(null);
  const spriteNums = useRef(0);
  const spriteDx = useRef(0);
  const [timeGap, setTimeGap] = useState(5);

  const generateStripe = () => {
    if (canvas.current) {
      const ctx = canvas.current.getContext("2d");

      if (
        spriteNums.current < 5 &&
        ctx &&
        dummyVideo.current &&
        dummyVideo.current?.currentTime < clip.duration
      ) {
        ctx.drawImage(dummyVideo.current, spriteDx.current, 0, 52, 200);
        spriteDx.current = spriteDx.current + 52;
        spriteNums.current = spriteNums.current + 1;
        dummyVideo.current.currentTime =
          dummyVideo.current.currentTime + timeGap;
      }
    }
  };

  return (
    <Box
      sx={{ width: width, transition: "width .25s" }}
      className={`time-clip relative`}
      onClick={() => {
        setSelectedClip(clip.id);
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          display: "grid",
          gridTemplateColumns:
            "[left-handle] 9px [main] 1fr [right-handle] 9px",
          gridTemplateRows: "4px [main] 1fr 4px",
          color: "#828282",
          borderRadius: "2.3px",
          cursor: "pointer",
          transition: "color .15s,opacity .15s",
          "&:hover": {
            color: "#b6b6b6",
          },
        }}
      >
        <Box
          className={"timeline-clip-inner"}
          sx={{
            position: "relative",
            gridArea: "1/1/-1/-1",
            boxShadow: "inset 0 0 0 2px currentcolor",
            borderRadius: "inherit",
            backgroundColor: "#131313",
            mx: "1px",
          }}
        ></Box>

        <Box
          component={"canvas"}
          className={"timeline-clips"}
          ref={canvas}
          sx={{
            gridArea: "main",
            placeSelf: "stretch",
            contain: "strict",
            backgroundImage:
              "repeating-linear-gradient(to right, rgba(255, 255, 255, 0.1) 0 52px, rgb(19, 19, 19) 0 54px)",
          }}
        ></Box>
        <Box
          className={"left-handle"}
          sx={{
            gridColumn: "left-handle",
            borderLeft: "1px solid rgba(0,0,0,.8)",
            borderTopLeftRadius: 3,
            borderBottomLeftRadius: 3,

            position: "relative",
            gridRow: "1/-1",
            width: "12px",
            display: "grid",
            cursor: "w-resize",
            overflow: "hidden",
            "&:before": {
              content: '""',
              width: "8px",
              WebkitMaskImage:
                "radial-gradient(circle, transparent 2px, black 2.5px)",
              backgroundColor: "currentcolor",
            },
          }}
        ></Box>
        <Box
          className={"right-handle"}
          sx={{
            justifySelf: "end",
            gridColumn: "right-handle",
            borderRight: "1px solid rgba(0,0,0,.8)",
            borderTopRightRadius: 3,
            borderBottomRightRadius: 3,

            position: "relative",
            gridRow: "1/-1",
            width: 33,
            display: "grid",
            cursor: "w-resize",
            overflow: "hidden",

            "&:before": {
              justifySelf: "end",
              content: '""',
              width: "8px",
              WebkitMaskImage:
                "radial-gradient(circle, transparent 2px, black 2.5px)",
              backgroundColor: "currentcolor",
            },
          }}
        ></Box>
      </Box>

      <video
        onCanPlayThrough={generateStripe}
        className={"dummyVideo"}
        style={{ display: "none" }}
        preload="auto"
        src={clip.src}
        ref={dummyVideo}
        width={200}
        height={200}
      />
    </Box>
  );
}
