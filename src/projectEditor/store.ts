import createStore from "./createStore";

type ChannelClip = {
  src: string;
  duration: number;
};

export type ValuesStore = {
  timelineChannel: ChannelClip[];
};

const store = createStore<ValuesStore>({
  timelineChannel: [],
});

export default store;

export const getTimelineDuration = () => {
  const clips = store.useStore((state) => state.timelineChannel);

  return clips.reduce((result, clip) => {
    result += clip.duration;
    return result;
  }, 0);
};
