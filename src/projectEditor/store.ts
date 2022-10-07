import createStore from "./createStore";

export type TrimPos = "left" | "right";

export type ChannelClip = {
  src: string;
  duration: number;
  id: string;

  //clip trimming
  trimStartOffset: number;
  trimEndOffset: number;
};

export type ValuesStore = {
  timelineChannel: ChannelClip[];
  selectedClip: null | string;
  timeSeeker: number;
};

const store = createStore<ValuesStore>({
  timelineChannel: [],
  selectedClip: null,
  timeSeeker: 0,
});

export default store;

export const getTimelineChannel = () => {
  const clips = store.useStore((state) => state.timelineChannel);

  const duration = clips.reduce((result, clip) => {
    result += clip.duration;
    return result;
  }, 0);

  return {
    clips,
    duration,
  };
};
export const getTimeSeeker = () => {
  return store.useStore((state) => state.timeSeeker);
};

export const setTimeSeeker = (newTimeSeeker: number) => {
  const state = store.getState();

  store.setState({
    ...state,
    timeSeeker: newTimeSeeker,
  });
};

export const getSelectedClip = () => {
  return store.useStore((state) => state.selectedClip);
};

export const updateClip = ({
  clip,
  trimPos,
  trimPercentage,
}: {
  clip: ChannelClip;
  trimPos: TrimPos;
  trimPercentage: number;
}) => {
  const state = store.getState();

  //subtract the percentage
  const newTrim = (clip.duration * trimPercentage) / 100;

  //hack to keep them with max 2 float 1,23
  const roundestTrim = parseFloat(newTrim.toFixed(2));

  const newDuration = clip.duration - roundestTrim;
  const newClip: ChannelClip = {
    ...clip,
    duration: parseFloat(newDuration.toFixed(2)),
  };

  if (trimPos === "left") {
    newClip.trimStartOffset = parseFloat(
      (roundestTrim + newClip.trimStartOffset).toFixed(2)
    );
  } else {
    newClip.trimEndOffset = parseFloat(
      (roundestTrim + newClip.trimEndOffset).toFixed(2)
    );
  }

  console.log(newClip);

  const updatedData = state.timelineChannel.map((oldClip) => {
    if (oldClip.id === clip.id) {
      return newClip;
    }
    return oldClip;
  });

  store.setState({
    ...state,
    timelineChannel: updatedData,
  });
};

export const deleteSelectedClip = (clipId: string) => {
  const state = store.getState();

  const newClips = state.timelineChannel.filter((clip) => clip.id !== clipId);
  store.setState({
    ...state,
    timelineChannel: newClips,
  });
};

export const setTimelineChannel = (newClips: ChannelClip[]) => {
  const state = store.getState();

  store.setState({
    ...state,
    timelineChannel: newClips,
  });
};
