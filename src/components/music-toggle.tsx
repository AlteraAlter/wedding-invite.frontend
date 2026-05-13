"use client";

import { useEffect, useRef, useState } from "react";

type MusicToggleProps = {
  musicUrl?: string;
  placeholder: string;
};

export function MusicToggle({ musicUrl, placeholder }: MusicToggleProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!musicUrl || !audioRef.current) {
      return;
    }

    const audio = audioRef.current;

    audio.volume = 0.45;
    setError(null);

    const tryAutoplay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    };

    void tryAutoplay();
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

    try {
      await audioRef.current.play();
      setIsPlaying(true);
      setError(null);
    } catch {
      setIsPlaying(false);
      setError("Әуенді ойнату мүмкін болмады.");
    }
  };

  if (!musicUrl) {
    return (
      <div className="music-inline music-inline-muted">
        <p className="music-inline-placeholder">{placeholder}</p>
      </div>
    );
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={musicUrl}
        loop
        autoPlay
        preload="auto"
        onEnded={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => {
          setIsPlaying(false);
          setError("Музыка файлы табылмады немесе ашылмады.");
        }}
      />
      <div className={`music-inline ${isPlaying ? "music-inline-playing" : ""}`}>
        <div className={`music-visualizer ${isPlaying ? "music-visualizer-active" : ""}`} aria-hidden="true">
          <span className="music-visualizer-wave" />
          <span className="music-visualizer-wave" />
          <span className="music-visualizer-wave" />
        </div>
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={isPlaying ? "Әуенді тоқтату" : "Әуенді қосу"}
          title={isPlaying ? "Әуенді тоқтату" : "Әуенді қосу"}
          className={`music-button ${isPlaying ? "music-button-playing" : ""}`}
        >
          <span className="music-button-rings" aria-hidden="true" />
          {isPlaying ? (
            <svg aria-hidden="true" viewBox="0 0 64 24" className="music-wave-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 12C7 12 7 6 12 6C17 6 17 18 22 18C27 18 27 6 32 6C37 6 37 18 42 18C47 18 47 6 52 6C57 6 57 12 62 12" />
            </svg>
          ) : (
            <svg aria-hidden="true" viewBox="0 0 24 24" className="music-button-icon ml-0.5 h-4.5 w-4.5 fill-current">
              <path d="M8.75 6.4c0-.58.63-.94 1.13-.64l8.2 4.9c.49.3.49 1 0 1.3l-8.2 4.9c-.5.3-1.13-.06-1.13-.64V6.4Z" />
            </svg>
          )}
        </button>
        {error ? <p className="music-inline-error">{error}</p> : null}
      </div>
    </>
  );
}
