import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQS = [
    {
        question: "What is React?",
        answer: "React is a free and open-source front-end JavaScript library for building user interfaces based on components."
    },
    {
        question: "Why use Tailwind CSS?",
        answer: "Tailwind CSS is a utility-first CSS framework that allows you to build modern websites rapidly without leaving your HTML."
    },
    {
        question: "What is the purpose of useEffect?",
        answer: "The useEffect Hook allows you to perform side effects in your components, such as fetching data, directly updating the DOM, and timers."
    },
    {
        question: "How does State work?",
        answer: "State is a plain JavaScript object used by React to represent information about the component's current situation. There’s no guarantee that the state changes will happen immediately."
    }
];

const AccordionItem = ({ item, isOpen, onClick, variant = 'default' }) => {
    return (
        <div className={`border-b border-gray-200 last:border-0 ${variant === 'modern' ? 'bg-white mb-4 rounded-lg border-0 shadow-sm' : ''}`}>
            <button
                className={`w-full flex justify-between items-center p-6 text-left transition-colors ${isOpen ? 'text-blue-600' : 'text-gray-700 hover:text-gray-900'
                    }`}
                onClick={onClick}
            >
                <span className="text-lg font-medium">{item.question}</span>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    {variant === 'modern' ? (isOpen ? <Minus size={20} /> : <Plus size={20} />) : <ChevronDown size={20} />}
                </span>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="p-6 pt-0 text-gray-600 leading-relaxed">
                    {item.answer}
                </div>
            </div>
        </div>
    );
};

const Accordion = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [multiSelect, setMultiSelect] = useState([]);
    const [mode, setMode] = useState('single'); // 'single' or 'multi'

    const handleSingleClick = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const handleMultiClick = (index) => {
        if (multiSelect.includes(index)) {
            setMultiSelect(multiSelect.filter(i => i !== index));
        } else {
            setMultiSelect([...multiSelect, index]);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
            <Link to="/" className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
                <ArrowLeft size={24} />
            </Link>

            <div className="w-full max-w-2xl">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Accordion FAQ</h1>

                    <div className="inline-flex bg-white p-1 rounded-lg shadow-sm border border-gray-200">
                        <button
                            onClick={() => { setMode('single'); setActiveIndex(null); }}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${mode === 'single' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            Single Open
                        </button>
                        <button
                            onClick={() => { setMode('multi'); setMultiSelect([]); }}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${mode === 'multi' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            Multi Select
                        </button>
                    </div>
                </div>

                {/* Classic Style */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                        <h2 className="text-gray-500 font-semibold uppercase tracking-wider text-sm">Classic Accordion</h2>
                    </div>
                    <div>
                        {FAQS.map((faq, index) => (
                            <AccordionItem
                                key={index}
                                item={faq}
                                isOpen={mode === 'single' ? activeIndex === index : multiSelect.includes(index)}
                                onClick={() => mode === 'single' ? handleSingleClick(index) : handleMultiClick(index)}
                            />
                        ))}
                    </div>
                </div>

                {/* Modern Style */}
                <div>
                    <div className="px-2 pb-4">
                        <h2 className="text-gray-500 font-semibold uppercase tracking-wider text-sm">Modern Isolated Cards</h2>
                    </div>
                    {FAQS.map((faq, index) => (
                        <AccordionItem
                            key={index}
                            item={faq}
                            variant="modern"
                            isOpen={mode === 'single' ? activeIndex === index : multiSelect.includes(index)}
                            onClick={() => mode === 'single' ? handleSingleClick(index) : handleMultiClick(index)}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Accordion;
