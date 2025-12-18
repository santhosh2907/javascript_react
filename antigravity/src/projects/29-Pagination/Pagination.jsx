import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_DATA = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: i % 3 === 0 ? 'Admin' : i % 2 === 0 ? 'Editor' : 'User',
    active: Math.random() > 0.3
}));

const Pagination = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [data, setData] = useState([]);

    // Simulate fetching data
    useEffect(() => {
        // In a real app, you might fetch only the current page's data from an API
        // Here we just slice the mock data
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        setData(MOCK_DATA.slice(start, end));
    }, [currentPage, itemsPerPage]);

    const totalPages = Math.ceil(MOCK_DATA.length / itemsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const getPageNumbers = () => {
        const pages = [];
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);

        if (currentPage <= 3) {
            endPage = Math.min(5, totalPages);
        }
        if (currentPage >= totalPages - 2) {
            startPage = Math.max(totalPages - 4, 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
            <Link to="/" className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
                <ArrowLeft size={24} />
            </Link>

            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col min-h-[600px]">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-gray-800">User Directory</h1>
                    <select
                        value={itemsPerPage}
                        onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                        className="bg-gray-50 border border-gray-200 rounded-lg text-sm p-2 outline-none focus:ring-2 focus:ring-blue-100"
                    >
                        <option value="5">5 per page</option>
                        <option value="10">10 per page</option>
                        <option value="20">20 per page</option>
                    </select>
                </div>

                <div className="flex-1 overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider font-semibold">
                            <tr>
                                <th className="p-4">ID</th>
                                <th className="p-4">Name</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Role</th>
                                <th className="p-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {data.map(user => (
                                <tr key={user.id} className="hover:bg-blue-50/50 transition-colors">
                                    <td className="p-4 text-gray-500 font-mono text-xs">#{user.id}</td>
                                    <td className="p-4 font-medium text-gray-800">{user.name}</td>
                                    <td className="p-4 text-gray-500">{user.email}</td>
                                    <td className="p-4">
                                        <span className={`
                                            px-2 py-1 rounded text-xs font-bold uppercase
                                            ${user.role === 'Admin' ? 'bg-purple-100 text-purple-700' : ''}
                                            ${user.role === 'Editor' ? 'bg-blue-100 text-blue-700' : ''}
                                            ${user.role === 'User' ? 'bg-gray-100 text-gray-600' : ''}
                                        `}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${user.active ? 'bg-green-500' : 'bg-red-400'}`}></div>
                                            <span className={`text-xs ${user.active ? 'text-green-600' : 'text-red-500'}`}>
                                                {user.active ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                        Showing <span className="font-bold text-gray-800">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-bold text-gray-800">{Math.min(currentPage * itemsPerPage, MOCK_DATA.length)}</span> of <span className="font-bold text-gray-800">{MOCK_DATA.length}</span> results
                    </span>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handlePageChange(1)}
                            disabled={currentPage === 1}
                            className="p-2 rounded-lg hover:bg-white hover:shadow-sm disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                        >
                            <ChevronsLeft size={18} />
                        </button>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-2 rounded-lg hover:bg-white hover:shadow-sm disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                        >
                            <ChevronLeft size={18} />
                        </button>

                        <div className="flex gap-1 mx-2">
                            {getPageNumbers().map(pageNum => (
                                <button
                                    key={pageNum}
                                    onClick={() => handlePageChange(pageNum)}
                                    className={`
                                        w-8 h-8 rounded-lg text-sm font-medium transition-all
                                        ${currentPage === pageNum
                                            ? 'bg-blue-600 text-white shadow-md shadow-blue-200 scale-110'
                                            : 'text-gray-600 hover:bg-white hover:shadow-sm'
                                        }
                                    `}
                                >
                                    {pageNum}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-lg hover:bg-white hover:shadow-sm disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                        >
                            <ChevronRight size={18} />
                        </button>
                        <button
                            onClick={() => handlePageChange(totalPages)}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-lg hover:bg-white hover:shadow-sm disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                        >
                            <ChevronsRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
