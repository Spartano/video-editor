import { Box, Button, Typography } from "@mui/material";
import React from "react";
import VideoPreview from "./components/VideoPreview";
import EditorTimeline from "./components/EditorTimeline";

function App() {
  const videos = [
    { src: "video1.mp4", id: Math.random().toString(36).substring(2, 15) },
    { src: "video2.mp4", id: Math.random().toString(36).substring(2, 15) },
    { src: "video3.mp4", id: Math.random().toString(36).substring(2, 15) },
  ];
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateRows: "[header] 60px [main] 1fr [footer] auto",
        gridTemplateColumns: "[main] 1fr",
        mr: "400px",
      }}
    >
      <header className="flex items-center px-2">
        <nav className="flex flex-1 items-center">
          <Typography variant="h4" component="h1" gutterBottom>
            Project 1
          </Typography>
        </nav>
        <div className="">
          <Button variant={"contained"} color="error">
            <span>Export video</span>
          </Button>
        </div>
      </header>

      <Box
        component="main"
        className={"p-4 pb-2"}
        sx={{
          display: "grid",
          gridTemplateColumns: "[panels] clamp(180px, 20%, 260px) [player] 1fr",
          gridTemplateRows: "[player] 1fr [timeline] 174px",
          gap: "10px",
          height: "300px",
        }}
      >
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
        <main className="flex flex-col items-center justify-center">
          <Box
            sx={{
              width: "786px",
              height: "442px",
              display: "grid",
              backgroundColor: "#000",
            }}
          >
            {videos.map((video, i) => (
              <Box
                component={"video"}
                key={i}
                id={video.id}
                src={video.src}
                height={"100%"}
                width={"100%"}
                preload="auto"
                sx={{
                  display: i === 0 ? "auto" : "none",
                }}
              />
            ))}
          </Box>
          <Box>controls</Box>
        </main>
        <EditorTimeline />
      </Box>
    </Box>
  );
}

export default App;
