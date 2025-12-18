import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const IMAGES = [
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1501854140884-074bf6b243c7?auto=format&fit=crop&w=1200&q=80',
];

const ImageSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlay, setIsAutoPlay] = useState(true);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? IMAGES.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === IMAGES.length - 1 ? 0 : prev + 1));
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        let interval;
        if (isAutoPlay) {
            interval = setInterval(() => {
                nextSlide();
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [currentIndex, isAutoPlay]);

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <Link to="/" className="absolute top-4 left-4 p-2 text-white bg-white/20 hover:bg-white/30 rounded-full transition-colors z-50">
                <ArrowLeft size={24} />
            </Link>

            <div className="max-w-[1000px] w-full h-[600px] relative group m-auto rounded-2xl overflow-hidden shadow-2xl">
                {/* Main Image */}
                <div
                    style={{ backgroundImage: `url(${IMAGES[currentIndex]})` }}
                    className="w-full h-full bg-center bg-cover bg-no-repeat duration-500 ease-out"
                ></div>

                {/* Info - Optional to show index or pause hint */}
                <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {currentIndex + 1} / {IMAGES.length}
                </div>

                {/* Left Arrow */}
                <div className="absolute top-[50%] -translate-y-[50%] left-5 p-2 rounded-full bg-black/20 hover:bg-black/50 text-white cursor-pointer group-hover:block transition-all transform hover:scale-110" onClick={prevSlide}>
                    <ChevronLeft size={30} />
                </div>

                {/* Right Arrow */}
                <div className="absolute top-[50%] -translate-y-[50%] right-5 p-2 rounded-full bg-black/20 hover:bg-black/50 text-white cursor-pointer group-hover:block transition-all transform hover:scale-110" onClick={nextSlide}>
                    <ChevronRight size={30} />
                </div>

                {/* Dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {IMAGES.map((_, index) => (
                        <div
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${index === currentIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
                                }`}
                        ></div>
                    ))}
                </div>

                {/* Autoplay Toggle */}
                <div className="absolute bottom-4 right-4">
                    <button
                        onClick={() => setIsAutoPlay(!isAutoPlay)}
                        className={`text-xs px-3 py-1 rounded-full transition-colors ${isAutoPlay ? 'bg-green-500/80 text-white' : 'bg-red-500/80 text-white'
                            }`}
                    >
                        {isAutoPlay ? 'Autoplay ON' : 'Autoplay OFF'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageSlider;
