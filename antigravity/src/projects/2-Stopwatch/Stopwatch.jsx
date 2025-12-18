import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Play, Pause, RotateCcw, Flag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState([]);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else {
            clearInterval(intervalRef.current);
        }
        return () => clearInterval(intervalRef.current);
    }, [isRunning]);

    const handleStartStop = () => {
        setIsRunning(!isRunning);
    };

    const handleReset = () => {
        setIsRunning(false);
        setTime(0);
        setLaps([]);
    };

    const handleLap = () => {
        setLaps([...laps, time]);
    };

    const formatTime = (ms) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const milliseconds = Math.floor((ms % 1000) / 10);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Header */}
                <div className="bg-indigo-600 p-4 flex items-center text-white">
                    <Link to="/" className="p-2 hover:bg-indigo-700 rounded-full transition-colors">
                        <ArrowLeft size={24} />
                    </Link>
                    <h1 className="text-xl font-bold ml-4">Project 2: Stopwatch</h1>
                </div>

                {/* Display */}
                <div className="h-64 flex flex-col items-center justify-center bg-gray-900 text-white">
                    <div className="text-6xl font-mono font-bold tracking-wider">
                        {formatTime(time)}
                    </div>
                    <div className="mt-2 text-gray-400">
                        {laps.length > 0 && (
                            <span className="text-sm">Last Lap: {formatTime(laps[laps.length - 1] - (laps.length > 1 ? laps[laps.length - 2] : 0))}</span>
                        )}
                    </div>
                </div>

                {/* Controls */}
                <div className="p-6 flex justify-around items-center bg-gray-50 border-b">
                    <button
                        onClick={handleStartStop}
                        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${isRunning
                                ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-200'
                                : 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-200'
                            }`}
                    >
                        {isRunning ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
                    </button>

                    <button
                        onClick={handleLap}
                        disabled={!isRunning}
                        className="w-12 h-12 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Flag size={20} />
                    </button>

                    <button
                        onClick={handleReset}
                        className="w-12 h-12 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-300 transition-colors"
                    >
                        <RotateCcw size={20} />
                    </button>
                </div>

                {/* Laps */}
                <div className="h-48 overflow-y-auto p-4 bg-gray-50">
                    {laps.length === 0 ? (
                        <div className="text-center text-gray-400 mt-4">No laps recorded</div>
                    ) : (
                        <div className="space-y-2">
                            {[...laps].reverse().map((lapTime, index) => (
                                <div key={index} className="flex justify-between items-center p-2 bg-white rounded border border-gray-200">
                                    <span className="text-gray-500 font-medium">Lap {laps.length - index}</span>
                                    <span className="font-mono text-gray-800">{formatTime(lapTime)}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Stopwatch;
