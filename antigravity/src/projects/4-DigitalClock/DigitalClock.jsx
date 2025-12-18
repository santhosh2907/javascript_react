import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const DigitalClock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatWithLeadingZero = (num) => {
        return num.toString().padStart(2, '0');
    };

    const hours = formatWithLeadingZero(time.getHours());
    const minutes = formatWithLeadingZero(time.getMinutes());
    const seconds = formatWithLeadingZero(time.getSeconds());

    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = time.toLocaleDateString(undefined, dateOptions);

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
            <div className="absolute top-4 left-4">
                <Link to="/" className="p-2 text-white bg-gray-800 hover:bg-gray-700 rounded-full transition-colors inline-flex">
                    <ArrowLeft size={24} />
                </Link>
            </div>

            <div className="w-full max-w-3xl transform hover:scale-105 transition-transform duration-300">
                <div className="bg-black bg-opacity-50 backdrop-blur-md rounded-3xl p-12 border border-gray-700 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col items-center">

                    {/* Time */}
                    <div className="flex items-end mb-4 font-mono">
                        <div className="text-7xl md:text-9xl font-bold text-white tracking-widest bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            {hours}:{minutes}
                        </div>
                        <div className="text-4xl md:text-5xl font-bold text-gray-500 mb-4 md:mb-6 ml-4 w-20">
                            {seconds}
                        </div>
                    </div>

                    {/* Date */}
                    <div className="text-xl md:text-2xl text-blue-200 tracking-wide font-light">
                        {dateString}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DigitalClock;
