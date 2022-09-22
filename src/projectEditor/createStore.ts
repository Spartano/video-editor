import { useSyncExternalStore } from "react";

export default function createStore<Shape>(initialState: Shape) {
  let currentState = initialState;
  const listeners = new Set<(state: Shape) => void>();
  const subscribe = (listener: (state: Shape) => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  return {
    getState: () => currentState,
    setState: (newState: Shape) => {
      currentState = newState;
      listeners.forEach((listener) => listener(currentState));
    },
    subscribe,
    useStore: <SelectorOutput>(
      selector: (state: Shape) => SelectorOutput
    ): SelectorOutput =>
      useSyncExternalStore(subscribe, () => selector(currentState)),
  };
}
