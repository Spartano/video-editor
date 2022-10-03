import createStore from "./createStore";

export type ChannelClip = {
  src: string;
  duration: number;
  id: string;
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

export const setTimelineChannel = (newClips: ChannelClip[]) => {
  const state = store.getState();

  store.setState({
    ...state,
    timelineChannel: newClips,
  });
};
