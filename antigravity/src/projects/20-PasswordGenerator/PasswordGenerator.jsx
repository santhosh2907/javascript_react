import React, { useState, useEffect } from 'react';
import { ArrowLeft, Copy, RefreshCw, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const PasswordGenerator = () => {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(12);
    const [options, setOptions] = useState({
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true
    });
    const [copied, setCopied] = useState(false);
    const [strength, setStrength] = useState('Medium');

    const generatePassword = () => {
        let charset = '';
        if (options.uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (options.lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (options.numbers) charset += '0123456789';
        if (options.symbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

        if (charset === '') {
            setPassword('');
            return;
        }

        let generatedPassword = '';
        for (let i = 0; i < length; i++) {
            generatedPassword += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        setPassword(generatedPassword);
    };

    useEffect(() => {
        generatePassword();
    }, [length, options]);

    useEffect(() => {
        // Simple strength calculation
        let score = 0;
        if (length > 8) score++;
        if (length > 12) score++;
        if (options.uppercase && options.lowercase) score++;
        if (options.numbers) score++;
        if (options.symbols) score++;

        if (score <= 2) setStrength('Weak');
        else if (score <= 4) setStrength('Medium');
        else setStrength('Strong');

    }, [password, options, length]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 text-white">
            <Link to="/" className="absolute top-4 left-4 p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                <ArrowLeft size={24} />
            </Link>

            <div className="w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-300">Password Generator</h1>

                <div className="bg-gray-800 p-4 rounded-xl mb-4 flex items-center justify-between border border-gray-700">
                    <span className="text-2xl font-mono tracking-wider break-all mr-2 text-emerald-400">
                        {password || 'Select options'}
                    </span>
                    <button
                        onClick={copyToClipboard}
                        className="p-2 text-emerald-400 hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
                    >
                        {copied ? <Check size={20} /> : <Copy size={20} />}
                    </button>
                </div>

                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 space-y-6">
                    {/* Length Slider */}
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-gray-400 font-medium">Character Length</label>
                            <span className="text-emerald-400 font-bold text-xl">{length}</span>
                        </div>
                        <input
                            type="range"
                            min="4"
                            max="32"
                            value={length}
                            onChange={(e) => setLength(Number(e.target.value))}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                        />
                    </div>

                    {/* Checkboxes */}
                    <div className="space-y-3">
                        {[
                            { id: 'uppercase', label: 'Include Uppercase Letters' },
                            { id: 'lowercase', label: 'Include Lowercase Letters' },
                            { id: 'numbers', label: 'Include Numbers' },
                            { id: 'symbols', label: 'Include Symbols' }
                        ].map(opt => (
                            <div key={opt.id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={opt.id}
                                    checked={options[opt.id]}
                                    onChange={() => setOptions({ ...options, [opt.id]: !options[opt.id] })}
                                    className="w-5 h-5 text-emerald-500 rounded focus:ring-emerald-600 bg-gray-700 border-gray-600"
                                />
                                <label htmlFor={opt.id} className="ml-3 text-sm font-medium text-gray-300">
                                    {opt.label}
                                </label>
                            </div>
                        ))}
                    </div>

                    {/* Strength Indicator */}
                    <div className="bg-gray-900 p-4 rounded-lg flex justify-between items-center">
                        <span className="text-gray-400 font-bold uppercase text-sm">Strength</span>
                        <div className="flex items-center gap-3">
                            <span className="font-bold text-lg uppercase">{strength}</span>
                            <div className="flex gap-1">
                                <div className={`w-2 h-6 border-2 ${strength === 'Weak' || strength === 'Medium' || strength === 'Strong' ? 'bg-emerald-400 border-emerald-400' : 'border-gray-600'}`}></div>
                                <div className={`w-2 h-6 border-2 ${strength === 'Medium' || strength === 'Strong' ? 'bg-emerald-400 border-emerald-400' : 'border-gray-600'}`}></div>
                                <div className={`w-2 h-6 border-2 ${strength === 'Strong' ? 'bg-emerald-400 border-emerald-400' : 'border-gray-600'}`}></div>
                                <div className={`w-2 h-6 border-2 ${strength === 'Strong' ? 'bg-emerald-400 border-emerald-400' : 'border-gray-600'}`}></div>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={generatePassword}
                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-gray-900 font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-colors uppercase tracking-wide"
                    >
                        Generate <ArrowLeft className="rotate-180" size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PasswordGenerator;
