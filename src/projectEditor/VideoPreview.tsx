import { Box } from "@mui/system";
import React, { useState } from "react";

type Props = { src: string };

export default function VideoPreview({ src }: Props) {
  const [showVideo, setShowVideo] = useState(false);
  return (
    <Box
      onMouseEnter={() => {
        setShowVideo(true);
      }}
      onMouseLeave={() => {
        setShowVideo(false);
      }}
      component="article"
      sx={{
        cursor: "pointer",
        display: "grid",
        gridTemplateColumns: "3px [main] minmax(0, 1fr) 3px",
        gridTemplateRows: "3px [main] 1fr 3px",
        borderRadius: "2px",
        backgroundColor: "rgba(19,19,19,.9)",
        contain: "content",
        "&:before": {
          content: '""',
          gridArea: "1/1/-1/-1",
          paddingBottom: "56.25%",
        },
      }}
    >
      <Box
        component="img"
        src="pic1.jpg"
        alt=""
        sx={{
          position: "relative",
          gridArea: "1/1/-1/-1",
          width: "101%",
          maxWidth: "none",
          height: "101%",
          transform: "rotate(0.001deg)",
          objectFit: "cover",

          ":after": {
            content: '""',
            position: "absolute",
            top: "0",
            left: "0",
            bottom: "0",
            right: "0",
            backgroundColor: "#131313",
          },
        }}
      ></Box>

      {showVideo && (
        <Box
          autoPlay
          muted
          component="video"
          loop
          preload={"metadata"}
          src={src}
          sx={{
            position: "relative",
            gridArea: "1/1/-1/-1",
            width: "101%",
            maxWidth: "none",
            height: "101%",
            transform: "rotate(0.001deg)",
            objectFit: "cover",
          }}
        />
      )}
    </Box>
  );
}
