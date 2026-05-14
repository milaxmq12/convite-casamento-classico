/**
 * MusicPlayer — Player de música flutuante e discreto
 * Design: Canto inferior direito, vidro fosco, controles mínimos
 * Nota: Usa uma URL de áudio de domínio público (música clássica)
 */

import { useState, useRef, useEffect } from "react";
import { Music, Pause, Play, Volume2, VolumeX, ChevronUp, ChevronDown } from "lucide-react";

// Public domain classical music - Pachelbel's Canon (royalty-free)
const MUSIC_URL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

// Playlist fictícia
const PLAYLIST = [
  { title: "Canon em Ré Maior", artist: "Pachelbel" },
  { title: "Clair de Lune", artist: "Debussy" },
  { title: "Gymnopédie No. 1", artist: "Satie" },
];

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [currentTrack] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.loop = true;
    }
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (!started) setStarted(true);
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !muted;
    setMuted(!muted);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  return (
    <>
      <audio ref={audioRef} src={MUSIC_URL} preload="none" />

      <div
        className="fixed bottom-6 right-6 z-50 music-player rounded-sm overflow-hidden transition-all duration-300"
        style={{ width: expanded ? "220px" : "auto" }}
      >
        {/* Expanded panel */}
        {expanded && (
          <div className="p-4 border-b border-[oklch(0.72_0.1_80/0.2)]">
            <p className="font-label text-[0.55rem] tracking-[0.25em] uppercase text-[oklch(0.62_0.1_75)] mb-3">
              Trilha Sonora
            </p>
            <div className="space-y-2">
              {PLAYLIST.map((track, i) => (
                <div
                  key={i}
                  className={`flex flex-col py-1.5 px-2 rounded-sm cursor-pointer transition-colors ${
                    i === currentTrack
                      ? "bg-[oklch(0.72_0.1_80/0.1)]"
                      : "hover:bg-[oklch(0.72_0.1_80/0.05)]"
                  }`}
                >
                  <span className={`font-body text-xs ${i === currentTrack ? "text-[oklch(0.52_0.1_75)]" : "text-[oklch(0.35_0.04_55)]"}`}>
                    {track.title}
                  </span>
                  <span className="font-body text-[0.65rem] text-[oklch(0.65_0.04_65)] italic">
                    {track.artist}
                  </span>
                </div>
              ))}
            </div>

            {/* Volume */}
            <div className="mt-3 flex items-center gap-2">
              <Volume2 size={12} className="text-[oklch(0.62_0.1_75)]" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolume}
                className="flex-1 h-1 accent-[oklch(0.72_0.1_80)] cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* Controls bar */}
        <div className="flex items-center gap-2 px-3 py-2.5">
          <button
            onClick={togglePlay}
            className="w-8 h-8 rounded-full border border-[oklch(0.72_0.1_80/0.4)] flex items-center justify-center text-[oklch(0.62_0.1_75)] hover:border-[oklch(0.72_0.1_80)] hover:bg-[oklch(0.72_0.1_80/0.1)] transition-all duration-200"
            title={playing ? "Pausar" : "Tocar música"}
          >
            {playing ? <Pause size={12} /> : <Play size={12} />}
          </button>

          {expanded && (
            <div className="flex-1 min-w-0">
              <p className="font-body text-xs text-[oklch(0.35_0.04_55)] truncate">
                {PLAYLIST[currentTrack].title}
              </p>
              {playing && (
                <div className="flex gap-0.5 mt-0.5">
                  {[1, 2, 3, 4].map((b) => (
                    <div
                      key={b}
                      className="w-0.5 bg-[oklch(0.72_0.1_80)] rounded-full"
                      style={{
                        height: "8px",
                        animation: `sound-bar ${0.4 + b * 0.1}s ease-in-out infinite alternate`,
                        animationDelay: `${b * 0.1}s`,
                      }}
                    />
                  ))}
                  <style>{`
                    @keyframes sound-bar {
                      from { transform: scaleY(0.3); }
                      to { transform: scaleY(1); }
                    }
                  `}</style>
                </div>
              )}
            </div>
          )}

          {!expanded && (
            <div className="flex items-center gap-1">
              <Music size={11} className="text-[oklch(0.72_0.1_80)]" />
              {playing && (
                <div className="flex gap-0.5">
                  {[1, 2, 3].map((b) => (
                    <div
                      key={b}
                      className="w-0.5 bg-[oklch(0.72_0.1_80)] rounded-full"
                      style={{
                        height: "8px",
                        animation: `sound-bar ${0.4 + b * 0.1}s ease-in-out infinite alternate`,
                        animationDelay: `${b * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          <button
            onClick={toggleMute}
            className="text-[oklch(0.72_0.1_80)] hover:text-[oklch(0.52_0.1_75)] transition-colors"
            title={muted ? "Ativar som" : "Silenciar"}
          >
            {muted ? <VolumeX size={13} /> : <Volume2 size={13} />}
          </button>

          <button
            onClick={() => setExpanded((e) => !e)}
            className="text-[oklch(0.72_0.1_80)] hover:text-[oklch(0.52_0.1_75)] transition-colors"
          >
            {expanded ? <ChevronDown size={13} /> : <ChevronUp size={13} />}
          </button>
        </div>
      </div>
    </>
  );
}
