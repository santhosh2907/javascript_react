import React, { useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_DATA = [
    'Apple', 'Banana', 'Cherry', 'Date', 'Elderberry',
    'Fig', 'Grape', 'Honeydew', 'Kiwi', 'Lemon',
    'Mango', 'Nectarine', 'Orange', 'Papaya', 'Quince',
    'Raspberry', 'Strawberry', 'Tangerine', 'Ugli Fruit', 'Watermelon'
];

const SearchFilter = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredItems = MOCK_DATA.filter(item =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
            <Link to="/" className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
                <ArrowLeft size={24} />
            </Link>

            <div className="w-full max-w-md">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Search Filter</h1>

                <div className="relative mb-6">
                    <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search fruits..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                </div>

                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    {filteredItems.length > 0 ? (
                        <ul className="divide-y divide-gray-100">
                            {filteredItems.map((item, index) => (
                                <li key={index} className="px-6 py-4 hover:bg-gray-50 transition-colors text-gray-700">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="p-8 text-center text-gray-500">
                            No items found matching "{searchTerm}"
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchFilter;
