import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DeleteForever from "@mui/icons-material/DeleteForever";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import * as React from "react";
import { useRef, useState } from "react";
import {
  ChannelClip,
  deleteSelectedClip,
  TrimPos,
  updateClip,
} from "../../store";

export default function TimeClip({
  clip,
  duration,
  isOverlay,
}: {
  clip: ChannelClip;
  duration: number;
  isOverlay?: boolean;
}) {
  const [initialPos, setInitialPos] = useState(0);
  const [trimPos, setTrimPos] = useState<TrimPos | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const deleteDivRef = useRef<HTMLDivElement>(null);

  const initial = (e: React.DragEvent<HTMLDivElement>) => {
    setInitialPos(e.clientX);
  };

  const final = (e: React.DragEvent<HTMLDivElement>) => {
    if (containerRef.current?.offsetWidth && trimPos) {
      const currentWidth = containerRef.current?.offsetWidth;
      const startOffset = e.clientX - initialPos;
      const trimPercentage = Math.abs(
        Math.floor((startOffset * 100) / currentWidth)
      );

      // update the clipTrimOffset
      updateClip({
        clip,
        trimPos,
        trimPercentage,
      });

      setInitialPos(0);
      setTrimPos(null);
    }
  };

  const leftHandleResize = (e: React.DragEvent<HTMLDivElement>) => {
    if (containerRef.current?.offsetWidth && e) {
      const currentWidth = containerRef.current?.offsetWidth;
      const startOffset = e.clientX - initialPos;

      if (startOffset < 0) {
        //guard for resizing in oposite direction
        setTrimPos(null);
        return;
      }
      const trimPercentage = Math.abs(
        Math.floor((startOffset * 100) / currentWidth)
      );

      if (deleteDivRef.current) {
        deleteDivRef.current.style.width = trimPercentage + "%";
        deleteDivRef.current.style.left = "0";
        deleteDivRef.current.style.right = "auto";
      }

      setTrimPos("left");
    }
  };

  const rightHandleResize = (e: React.DragEvent<HTMLDivElement>) => {
    if (containerRef.current?.offsetWidth) {
      const currentWidth = containerRef.current?.offsetWidth;
      const startOffset = e.clientX - initialPos;

      if (startOffset > 0) {
        //guard for resizing in oposite direction
        setTrimPos(null);
        return;
      }
      const trimPercentage = Math.abs(
        Math.floor((startOffset * 100) / currentWidth)
      );

      if (deleteDivRef.current) {
        deleteDivRef.current.style.width = trimPercentage + "%";
        deleteDivRef.current.style.left = "auto";
        deleteDivRef.current.style.right = "0";
      }

      setTrimPos("right");
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

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

  return (
    <Box
      id={clip.id}
      sx={{
        position: "relative",
        width: isOverlay ? "90%" : width,
        transition: "width .25s",
        height: isOverlay ? 52 : null,
        opacity: isOverlay ? 0.8 : null,
      }}
      className={`time-clip relative`}
      ref={containerRef}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      {trimPos && (
        <Box
          ref={deleteDivRef}
          sx={{
            height: "100%",
            zIndex: 1,
            position: "absolute",
            boxShadow: "inset 0 0 0 2px rgba(230,0,77,.8)",
            backgroundImage:
              "repeating-linear-gradient(130deg, transparent 0, rgba(230, 0, 77, 0.2) 1px 6px, transparent 7px 12px),linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))",
          }}
        ></Box>
      )}

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
          ref={setNodeRef}
          component={"canvas"}
          className={"timeline-clips"}
          sx={{
            gridArea: "main",
            placeSelf: "stretch",
            contain: "strict",
            backgroundImage:
              "repeating-linear-gradient(to right, rgba(255, 255, 255, 0.1) 0 52px, rgb(19, 19, 19) 0 54px)",
          }}
          style={style}
          {...attributes}
          {...listeners}
        ></Box>

        <div className="timeline-controls absolute flex flex-1 right-[8px] z-[2]">
          <IconButton
            color="info"
            size={"small"}
            onClick={() => deleteSelectedClip(clip.id)}
          >
            <DeleteForever fontSize={"small"} />
          </IconButton>
        </div>
        <Box
          draggable="true"
          onDragStart={initial}
          onDragEnd={final}
          onDrag={leftHandleResize}
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
          draggable="true"
          onDragStart={initial}
          onDragEnd={final}
          onDrag={rightHandleResize}
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
