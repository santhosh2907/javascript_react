import React, { useState, useEffect } from 'react';
import { ArrowLeft, Quote, Twitter, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

const RandomQuoteGenerator = () => {
    const [quote, setQuote] = useState({ content: '', author: '' });
    const [loading, setLoading] = useState(false);
    const [color, setColor] = useState('#4f46e5'); // Initial Indigo-600

    const COLORS = [
        '#4f46e5', // indigo
        '#059669', // emerald
        '#dc2626', // red
        '#d97706', // amber
        '#7c3aed', // violet
        '#db2777', // pink
        '#2563eb', // blue
        '#0d9488', // teal
    ];

    const fetchQuote = async () => {
        setLoading(true);
        try {
            const res = await fetch('https://api.quotable.io/random');
            const data = await res.json();
            setQuote({ content: data.content, author: data.author });

            // Change color
            const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
            setColor(randomColor);
        } catch (error) {
            console.error(error);
            setQuote({
                content: "Life is what happens when you're busy making other plans.",
                author: "John Lennon"
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuote();
    }, []);

    const tweetQuote = () => {
        const twitterUrl = `https://twitter.com/intent/tweet?text="${quote.content}" - ${quote.author}`;
        window.open(twitterUrl, '_blank');
    };

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-700 ease-in-out"
            style={{ backgroundColor: color }}
        >
            <Link to="/" className="absolute top-4 left-4 p-2 bg-white/20 hover:bg-white/40 text-white rounded-full transition-colors">
                <ArrowLeft size={24} />
            </Link>

            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 w-full max-w-2xl transition-all duration-300 transform">
                {loading ? (
                    <div className="h-48 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" style={{ borderColor: color }}></div>
                    </div>
                ) : (
                    <div className="animate-fade-in">
                        <div className="mb-6">
                            <Quote size={48} className="transform rotate-180 mb-4 opacity-30" style={{ color: color }} />
                            <h2
                                className="text-2xl md:text-3xl font-medium text-center leading-relaxed transition-colors duration-500"
                                style={{ color: color }}
                            >
                                {quote.content}
                            </h2>
                            <div className="mt-6 flex justify-end">
                                <p className="text-gray-500 italic font-medium">- {quote.author}</p>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mt-12">
                            <button
                                onClick={tweetQuote}
                                className="p-3 rounded-lg hover:opacity-80 transition-opacity bg-gray-100 hover:bg-gray-200"
                                title="Tweet this quote"
                            >
                                <Twitter size={24} style={{ color: color }} />
                            </button>

                            <button
                                onClick={fetchQuote}
                                className="flex items-center gap-2 px-6 py-3 rounded-lg text-white font-bold text-sm uppercase tracking-wider transition-transform active:scale-95 hover:shadow-lg"
                                style={{ backgroundColor: color }}
                            >
                                <RefreshCw size={18} /> New Quote
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <p className="text-white/70 text-xs mt-8">by Random Quote Machine</p>
        </div>
    );
};

export default RandomQuoteGenerator;
