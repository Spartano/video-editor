import { Box, Button, Typography } from "@mui/material";
import React from "react";
import store, { type ValuesStore } from "./store";
import VideoPreview from "./VideoPreview";

const DisplayValue = ({ item }: { item: keyof ValuesStore }) => (
  <div>
    {item}: {store.useStore((state) => state[item])}
  </div>
);

const IncrementValue = ({ item }: { item: keyof ValuesStore }) => (
  <button
    onClick={() => {
      const state = store.getState();
      store.setState({
        ...state,
        [item]: state[item] + 1,
      });
    }}
  >
    Increment {item}
  </button>
);

function ProjectEditor({ initialState }: { initialState: ValuesStore }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        maxWidth: 600,
        gap: "1rem",
      }}
    >
      <IncrementValue item="value1" />
      <DisplayValue item="value1" />
      <IncrementValue item="value2" />
      <DisplayValue item="value2" />
    </div>
  );
}

function App() {
  const videos = ["video1.mp4", "video2.mp4", "video3.mp4"];
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateRows: "[header] 60px [main] 1fr [footer] auto",
        gridTemplateColumns: "[main] 1fr",
        mr: "400px",
      }}
    >
      <ProjectEditor initialState={{ value1: 1, value2: 2 }} />
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
          gridTemplateRows: "[player] 1fr [timeline] 150px",
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
            <VideoPreview key={video} src={video} />
          ))}
        </Box>
        <main className="flex flex-col items-center justify-content-center">
          <Box
            sx={{
              width: "786px",
              height: "442px",
              display: "grid",
              backgroundColor: "#000",
            }}
          >
            video
          </Box>
          <Box>controls</Box>
        </main>
        <Box
          component="footer"
          className={"relative flex"}
          sx={{
            gridColumn: "1/-1",
          }}
        >
          timeline control
        </Box>
      </Box>
    </Box>
  );
}

export default App;
