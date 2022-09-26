import createStore from "./createStore";

export type ChannelClip = {
  src: string;
  duration: number;
  id: string;
};

export type ValuesStore = {
  timelineChannel: ChannelClip[];
  selectedClip: null | string;
};

const store = createStore<ValuesStore>({
  timelineChannel: [],
  selectedClip: null,
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

export const getSelectedClip = () => {
  return store.useStore((state) => state.selectedClip);
};

export const setSelectedClip = (clipId: string | null) => {
  const state = store.getState();

  store.setState({
    ...state,
    selectedClip: clipId,
  });
};
export const deleteSelectedClip = () => {
  const state = store.getState();
  const selectedClip = state.selectedClip;

  const newClips = state.timelineChannel.filter(
    (clip) => clip.id !== selectedClip
  );
  store.setState({
    ...state,
    timelineChannel: newClips,
  });
};
