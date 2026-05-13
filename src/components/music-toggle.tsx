"use client";

import { useEffect, useRef, useState } from "react";

type MusicToggleProps = {
  musicUrl?: string;
  placeholder: string;
};

export function MusicToggle({ musicUrl, placeholder }: MusicToggleProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!musicUrl || !audioRef.current) {
      return;
    }

    audioRef.current.volume = 0.45;
  }, [musicUrl]);

  const togglePlayback = async () => {
    if (!audioRef.current || !musicUrl) {
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    await audioRef.current.play();
    setIsPlaying(true);
  };

  if (!musicUrl) {
    return (
      <div className="glass-panel luxury-border max-w-full rounded-[1.25rem] px-4 py-3 text-center text-[11px] leading-5 tracking-[0.22em] text-[#9f7b61] uppercase break-words sm:rounded-full sm:text-xs sm:tracking-[0.28em]">
        {placeholder}
      </div>
    );
  }

  return (
    <>
      <audio ref={audioRef} src={musicUrl} loop preload="auto" />
      <button
        type="button"
        onClick={togglePlayback}
        className="glass-panel luxury-border max-w-full rounded-[1.25rem] px-5 py-3 text-center text-xs font-semibold uppercase tracking-[0.28em] text-[#9f7b61] transition-transform duration-300 hover:scale-105 sm:rounded-full sm:tracking-[0.35em]"
      >
        {isPlaying ? "Әуенді тоқтату" : "Әуенді қосу"}
      </button>
    </>
  );
}
