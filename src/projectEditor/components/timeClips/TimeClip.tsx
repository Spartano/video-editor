import { AnimateLayoutChanges, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Box from "@mui/material/Box";
import * as React from "react";
import { useRef } from "react";
import { ChannelClip, setSelectedClip } from "../../store";

var stringToColour = function (str: string) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var colour = "#";
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xff;
    colour += ("00" + value.toString(16)).substr(-2);
  }
  return colour;
};

export default function TimeClip({
  clip,
  duration,
  isOverlay,
}: {
  clip: ChannelClip;
  duration: number;
  isOverlay?: boolean;
}) {
  const width = (clip.duration * 100) / duration + "%";
  const canvas = useRef<HTMLCanvasElement>(null);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: clip.id,
      transition: {
        duration: 200,
        easing: "linear",
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  var randomColor = stringToColour(clip.id);

  return (
    <Box
      sx={{
        width: isOverlay ? "100%" : width,
        transition: "width .25s",
        height: isOverlay ? 52 : null,
        opacity: isOverlay ? 0.8 : null,
      }}
      className={`time-clip relative`}
      onClick={() => {
        setSelectedClip(clip.id);
      }}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
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
          sx={{
            background: randomColor,
            width: 20,
            height: 20,
            position: "absolute",
            top: 0,
            left: 20,
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
    </Box>
  );
}
