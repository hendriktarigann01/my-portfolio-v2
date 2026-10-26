"use client";

import {
  createContext,
  useContext,
  useSyncExternalStore,
  ReactNode,
} from "react";

interface AudioContextValue {
  isPlaying: boolean;
  toggleSound: () => void;
}

const AudioCtx = createContext<AudioContextValue>({
  isPlaying: false,
  toggleSound: () => {},
});

let audioInstance: HTMLAudioElement | null = null;
let isAudioPlaying = false;
const listeners = new Set<() => void>();

function getAudioInstance(): HTMLAudioElement {
  if (!audioInstance) {
    audioInstance = new Audio("/sounds/backsound.mp3");
    audioInstance.loop = true;
  }
  return audioInstance;
}

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

function playAudio() {
  const audio = getAudioInstance();
  audio
    .play()
    .then(() => {
      isAudioPlaying = true;
      notifyListeners();
    })
    .catch(() => {});
}

function pauseAudio() {
  if (audioInstance) {
    audioInstance.pause();
    isAudioPlaying = false;
    notifyListeners();
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return isAudioPlaying;
}

function getServerSnapshot() {
  return false;
}

export function AudioProvider({ children }: { children: ReactNode }) {
  const isPlaying = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleSound = () => {
    if (isAudioPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  return (
    <AudioCtx.Provider value={{ isPlaying, toggleSound }}>
      {children}
    </AudioCtx.Provider>
  );
}

export function useAudio() {
  return useContext(AudioCtx);
}
