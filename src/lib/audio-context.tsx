// Tujuan      : Global audio context — singleton persist antar navigasi dan re-render
// Caller      : src/app/layout.tsx (AudioProvider wrapper), src/components/Navbar.tsx
// Dependensi  : React context
// Main Exports: AudioProvider, useAudio
// Side Effects: Audio playback (browser)

"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface AudioContextValue {
  isPlaying: boolean;
  toggleSound: () => void;
}

const AudioCtx = createContext<AudioContextValue>({
  isPlaying: false,
  toggleSound: () => {},
});

// ─── Module-level singleton ─────────────────────────────────────────────────
// Disimpan di luar React agar TIDAK terikat ke lifecycle component.
// Ini persist selama tab terbuka — tidak terpengaruh oleh mount/unmount/StrictMode.
let _audio: HTMLAudioElement | null = null;
let _isPlaying = false;
const _listeners = new Set<(playing: boolean) => void>();

function getAudio(): HTMLAudioElement {
  if (!_audio) {
    _audio = new Audio("/sounds/backsound.mp3");
    _audio.loop = true;
  }
  return _audio;
}

function notifyListeners() {
  _listeners.forEach((fn) => fn(_isPlaying));
}

function playAudio() {
  const audio = getAudio();
  audio.play().then(() => {
    _isPlaying = true;
    notifyListeners();
  }).catch(() => {});
}

function pauseAudio() {
  if (_audio) {
    _audio.pause();
    _isPlaying = false;
    notifyListeners();
  }
}

// ─── Provider ────────────────────────────────────────────────────────────────

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(_isPlaying);

  useEffect(() => {
    // Sync initial state dari singleton
    setIsPlaying(_isPlaying);

    // Subscribe ke perubahan state audio
    const listener = (playing: boolean) => setIsPlaying(playing);
    _listeners.add(listener);

    // Auto-play pertama kali jika belum pernah
    if (!_audio) {
      playAudio();
    }

    return () => {
      _listeners.delete(listener);
      // TIDAK pause audio saat unmount — ini yang bikin persist
    };
  }, []);

  const toggleSound = () => {
    if (_isPlaying) {
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
