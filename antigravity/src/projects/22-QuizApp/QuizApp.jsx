import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, XCircle, Trophy, RefreshCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

const QUESTIONS = [
    {
        id: 1,
        question: "What is the Virtual DOM?",
        options: [
            "A direct copy of the real DOM",
            "A lightweight copy of the real DOM in memory",
            "A browser extension for debugging",
            "A database for React apps"
        ],
        answer: 1
    },
    {
        id: 2,
        question: "Which hook is used for side effects?",
        options: [
            "useState",
            "useMemo",
            "useEffect",
            "useReducer"
        ],
        answer: 2
    },
    {
        id: 3,
        question: "How do you pass data to child components?",
        options: [
            "State",
            "Props",
            "LocalStorage",
            "Cookies"
        ],
        answer: 1
    },
    {
        id: 4,
        question: "What produces the JSX?",
        options: [
            "React.createElement",
            "document.createElement",
            "html.create",
            "browser.render"
        ],
        answer: 0
    },
    {
        id: 5,
        question: "Which keyword creates a constant in JavaScript?",
        options: [
            "var",
            "let",
            "const",
            "constant"
        ],
        answer: 2
    }
];

const QuizApp = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const handleAnswerClick = (index) => {
        if (isAnswered) return;

        setSelectedOption(index);
        setIsAnswered(true);

        if (index === QUESTIONS[currentQuestion].answer) {
            setScore(score + 1);
        }
    };

    const handleNext = () => {
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < QUESTIONS.length) {
            setCurrentQuestion(nextQuestion);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            setShowScore(true);
        }
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
        setSelectedOption(null);
        setIsAnswered(false);
    };

    return (
        <div className="min-h-screen bg-indigo-900 flex flex-col items-center justify-center p-4">
            <Link to="/" className="absolute top-4 left-4 p-2 bg-indigo-800 text-indigo-200 rounded-full hover:bg-indigo-700 transition-colors">
                <ArrowLeft size={24} />
            </Link>

            <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden min-h-[500px] flex flex-col">
                {showScore ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-fade-in">
                        <Trophy size={80} className="text-yellow-400 mb-6 drop-shadow-md" />
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Completed!</h2>
                        <p className="text-gray-500 mb-8">You scored {score} out of {QUESTIONS.length}</p>

                        <div className="relative w-48 h-48 mb-8">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-200" />
                                <circle
                                    cx="96" cy="96" r="88"
                                    stroke="currentColor" strokeWidth="12" fill="transparent"
                                    strokeDasharray={2 * Math.PI * 88}
                                    strokeDashoffset={2 * Math.PI * 88 * (1 - score / QUESTIONS.length)}
                                    className={`text-indigo-600 transition-all duration-1000 ease-out`}
                                />
                            </svg>
                            <span className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-indigo-600">
                                {Math.round((score / QUESTIONS.length) * 100)}%
                            </span>
                        </div>

                        <button
                            onClick={resetQuiz}
                            className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-bold shadow-lg shadow-indigo-200"
                        >
                            <RefreshCcw size={20} /> Try Again
                        </button>
                    </div>
                ) : (
                    <div className="flex-1 p-8 flex flex-col">
                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-indigo-600 font-bold bg-indigo-50 px-3 py-1 rounded-full text-sm">
                                    Question {currentQuestion + 1}/{QUESTIONS.length}
                                </span>
                                <span className="text-gray-400 text-sm">Score: {score}</span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 leading-relaxed">
                                {QUESTIONS[currentQuestion].question}
                            </h2>
                        </div>

                        <div className="flex-1 space-y-3">
                            {QUESTIONS[currentQuestion].options.map((option, index) => {
                                let buttonClass = "w-full p-4 border-2 rounded-xl text-left font-medium transition-all duration-200 flex justify-between items-center ";

                                if (isAnswered) {
                                    if (index === QUESTIONS[currentQuestion].answer) {
                                        buttonClass += "border-green-500 bg-green-50 text-green-700";
                                    } else if (index === selectedOption) {
                                        buttonClass += "border-red-500 bg-red-50 text-red-700";
                                    } else {
                                        buttonClass += "border-gray-100 text-gray-400";
                                    }
                                } else {
                                    buttonClass += "border-gray-100 hover:border-indigo-200 hover:bg-indigo-50 text-gray-600";
                                }

                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswerClick(index)}
                                        disabled={isAnswered}
                                        className={buttonClass}
                                    >
                                        {option}
                                        {isAnswered && index === QUESTIONS[currentQuestion].answer && <CheckCircle size={20} />}
                                        {isAnswered && index === selectedOption && index !== QUESTIONS[currentQuestion].answer && <XCircle size={20} />}
                                    </button>
                                );
                            })}
                        </div>

                        {isAnswered && (
                            <div className="mt-8 flex justify-end animate-fade-in">
                                <button
                                    onClick={handleNext}
                                    className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                                >
                                    {currentQuestion === QUESTIONS.length - 1 ? 'Finish Quiz' : 'Next Question'}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizApp;
