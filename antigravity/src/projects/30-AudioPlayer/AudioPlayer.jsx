import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, List, Music } from 'lucide-react';
import { Link } from 'react-router-dom';

const TRACKS = [
    {
        id: 1,
        title: "Ambient Piano",
        artist: "Relaxing Sounds",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Public domain test MP3
        cover: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=500&q=80"
    },
    {
        id: 2,
        title: "Synthwave Vibe",
        artist: "Retro Future",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        cover: "https://images.unsplash.com/photo-1514525253440-b393452e23f0?w=500&q=80"
    },
    {
        id: 3,
        title: "Acoustic Breeze",
        artist: "Nature Flows",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        cover: "https://images.unsplash.com/photo-1445985543470-4102eb9c5c39?w=500&q=80"
    }
];

const AudioPlayer = () => {
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.5);
    const [isMuted, setIsMuted] = useState(false);
    const [showPlaylist, setShowPlaylist] = useState(false);

    const audioRef = useRef(null);
    const currentTrack = TRACKS[currentTrackIndex];

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying, currentTrackIndex]);

    useEffect(() => {
        audioRef.current.volume = isMuted ? 0 : volume;
    }, [volume, isMuted]);

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
        setDuration(audioRef.current.duration || 0);
    };

    const handleSeek = (e) => {
        const time = Number(e.target.value);
        audioRef.current.currentTime = time;
        setCurrentTime(time);
    };

    const handleNext = () => {
        setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
        setIsPlaying(true);
    };

    const handlePrev = () => {
        setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
        setIsPlaying(true);
    };

    const handleEnded = () => {
        handleNext();
    };

    const formatTime = (time) => {
        if (!time) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-8 text-white relative overflow-hidden">
            {/* Background Blur */}
            <div
                className="absolute inset-0 z-0 opacity-30 transform scale-150 blur-3xl transition-all duration-1000"
                style={{
                    backgroundImage: `url(${currentTrack.cover})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                }}
            ></div>

            <Link to="/" className="absolute top-4 left-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-20">
                <ArrowLeft size={24} />
            </Link>

            <div className="w-full max-w-sm bg-black/60 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-white/10 relative z-10 flex flex-col">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-bold tracking-widest text-gray-400">NOW PLAYING</span>
                    <button
                        onClick={() => setShowPlaylist(!showPlaylist)}
                        className={`p-2 rounded-full transition-colors ${showPlaylist ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                        <List size={20} />
                    </button>
                </div>

                {/* Playlist Overlay */}
                {showPlaylist && (
                    <div className="absolute inset-0 bg-gray-900/95 z-20 rounded-3xl p-6 overflow-y-auto animate-fade-in">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold">Playlist</h3>
                            <button onClick={() => setShowPlaylist(false)} className="text-gray-400 hover:text-white">Close</button>
                        </div>
                        <div className="space-y-4">
                            {TRACKS.map((track, idx) => (
                                <div
                                    key={track.id}
                                    onClick={() => { setCurrentTrackIndex(idx); setIsPlaying(true); setShowPlaylist(false); }}
                                    className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer hover:bg-white/10 transition-colors ${idx === currentTrackIndex ? 'bg-white/10 border border-purple-500/50' : ''}`}
                                >
                                    <img src={track.cover} alt={track.title} className="w-12 h-12 rounded-lg object-cover" />
                                    <div>
                                        <p className={`font-bold text-sm ${idx === currentTrackIndex ? 'text-purple-400' : 'text-white'}`}>{track.title}</p>
                                        <p className="text-xs text-gray-400">{track.artist}</p>
                                    </div>
                                    {idx === currentTrackIndex && <div className="ml-auto w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Album Art */}
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl mb-8 group">
                    <img
                        src={currentTrack.cover}
                        alt={currentTrack.title}
                        className={`w-full h-full object-cover transition-transform duration-700 ease-in-out ${isPlaying ? 'scale-100' : 'scale-100 group-hover:scale-105'}`}
                    />
                </div>

                {/* Track Info */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold truncate mb-1">{currentTrack.title}</h2>
                    <p className="text-gray-400">{currentTrack.artist}</p>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between text-xs text-gray-400 font-mono mb-2">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max={duration || 0}
                        value={currentTime}
                        onChange={handleSeek}
                        className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-purple-500 hover:accent-purple-400"
                    />
                </div>

                {/* Controls */}
                <div className="flex justify-between items-center mb-8">
                    <button onClick={() => setIsMuted(!isMuted)} className="text-gray-400 hover:text-white transition-colors">
                        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>

                    <div className="flex items-center gap-6">
                        <button onClick={handlePrev} className="text-white hover:text-purple-400 transition-colors">
                            <SkipBack size={28} />
                        </button>
                        <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-900/50 hover:bg-purple-500 hover:scale-105 transition-all text-white"
                        >
                            {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
                        </button>
                        <button onClick={handleNext} className="text-white hover:text-purple-400 transition-colors">
                            <SkipForward size={28} />
                        </button>
                    </div>

                    <div className="w-5"></div> {/* Spacer for balance */}
                </div>

                {/* Volume Slider (Hidden normally or small) */}
                <div className="bg-white/5 rounded-lg p-3 flex items-center gap-3">
                    <Volume2 size={16} className="text-gray-400" />
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={(e) => setVolume(Number(e.target.value))}
                        className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-gray-400"
                    />
                </div>

                {/* Hidden Audio Element */}
                <audio
                    ref={audioRef}
                    src={currentTrack.src}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={handleEnded}
                    onLoadedMetadata={handleTimeUpdate}
                />
            </div>
        </div>
    );
};

export default AudioPlayer;
