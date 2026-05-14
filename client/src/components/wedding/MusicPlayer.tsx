/**
 * MusicPlayer — Player de música com autoplay ao abrir o convite
 * Escuta eventos globais "wedding-music-play" e "wedding-music-pause"
 * emitidos pelo HeroSection e pelo botão visível no convite.
 */

import { useState, useRef, useEffect } from "react";
import { Music, Pause, Play, Volume2, VolumeX, ChevronUp, ChevronDown } from "lucide-react";

const MUSIC_URL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

const PLAYLIST = [
  { title: "Canon em Ré Maior", artist: "Pachelbel" },
  { title: "Clair de Lune", artist: "Debussy" },
  { title: "Gymnopédie No. 1", artist: "Satie" },
];

interface MusicPlayerProps {
  autoPlay?: boolean;
}

export default function MusicPlayer({ autoPlay = false }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [currentTrack] = useState(0);
  const [volume, setVolume] = useState(0.45);

  const doPlay = () => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
    audioRef.current.loop = true;
    audioRef.current.play().then(() => {
      setPlaying(true);
      window.dispatchEvent(new CustomEvent("wedding-music-playing"));
    }).catch(() => {});
  };

  const doPause = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setPlaying(false);
    window.dispatchEvent(new CustomEvent("wedding-music-paused"));
  };

  // Listen for global events from HeroSection button
  useEffect(() => {
    const onPlay  = () => doPlay();
    const onPause = () => doPause();
    window.addEventListener("wedding-music-play",  onPlay);
    window.addEventListener("wedding-music-pause", onPause);
    return () => {
      window.removeEventListener("wedding-music-play",  onPlay);
      window.removeEventListener("wedding-music-pause", onPause);
    };
  }, [volume]);

  const togglePlay = () => {
    playing ? doPause() : doPlay();
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
      <audio ref={audioRef} src={MUSIC_URL} preload="auto" />

      <div
        className="fixed bottom-6 right-6 z-50 music-player rounded-sm overflow-hidden transition-all duration-300"
        style={{ width: expanded ? "220px" : "auto" }}
      >
        {/* Expanded playlist + volume */}
        {expanded && (
          <div className="p-4 border-b border-[rgba(201,168,76,0.2)]">
            <p className="font-label text-[0.55rem] tracking-[0.25em] uppercase text-[#9A7A20] mb-3">
              Trilha Sonora
            </p>
            <div className="space-y-2">
              {PLAYLIST.map((track, i) => (
                <div
                  key={i}
                  className={`flex flex-col py-1.5 px-2 rounded-sm ${
                    i === currentTrack ? "bg-[rgba(201,168,76,0.1)]" : "hover:bg-[rgba(201,168,76,0.05)]"
                  }`}
                >
                  <span className={`font-body text-xs ${i === currentTrack ? "text-[#9A7A20]" : "text-[#2C2416]"}`}>
                    {track.title}
                  </span>
                  <span className="font-body text-[0.65rem] text-[#8A7D68] italic">{track.artist}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2">
              <Volume2 size={12} className="text-[#C9A84C]" />
              <input
                type="range" min="0" max="1" step="0.05"
                value={volume} onChange={handleVolume}
                className="flex-1 h-1 cursor-pointer"
                style={{ accentColor: "#C9A84C" }}
              />
            </div>
          </div>
        )}

        {/* Controls bar */}
        <div className="flex items-center gap-2 px-3 py-2.5">
          <button
            onClick={togglePlay}
            className="w-8 h-8 rounded-full border border-[rgba(201,168,76,0.4)] flex items-center justify-center text-[#9A7A20] hover:border-[#C9A84C] hover:bg-[rgba(201,168,76,0.1)] transition-all duration-200"
            title={playing ? "Pausar música" : "Tocar música"}
          >
            {playing ? <Pause size={12} /> : <Play size={12} />}
          </button>

          {expanded ? (
            <div className="flex-1 min-w-0">
              <p className="font-body text-xs text-[#2C2416] truncate">{PLAYLIST[currentTrack].title}</p>
              {playing && (
                <div className="flex gap-0.5 mt-0.5">
                  {[1, 2, 3, 4].map((b) => (
                    <div
                      key={b}
                      className="w-0.5 bg-[#C9A84C] rounded-full"
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
          ) : (
            <div className="flex items-center gap-1">
              <Music size={11} className="text-[#C9A84C]" />
              {playing && (
                <div className="flex gap-0.5">
                  {[1, 2, 3].map((b) => (
                    <div
                      key={b}
                      className="w-0.5 bg-[#C9A84C] rounded-full"
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
            className="text-[#C9A84C] hover:text-[#9A7A20] transition-colors"
            title={muted ? "Ativar som" : "Silenciar"}
          >
            {muted ? <VolumeX size={13} /> : <Volume2 size={13} />}
          </button>

          <button
            onClick={() => setExpanded((e) => !e)}
            className="text-[#C9A84C] hover:text-[#9A7A20] transition-colors"
          >
            {expanded ? <ChevronDown size={13} /> : <ChevronUp size={13} />}
          </button>
        </div>
      </div>
    </>
  );
}
