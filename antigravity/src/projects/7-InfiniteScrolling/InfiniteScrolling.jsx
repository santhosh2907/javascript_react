import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';

const InfiniteScrolling = () => {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const observer = useRef();

    const lastElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });

        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    const fetchItems = async () => {
        setLoading(true);
        try {
            // Intentionally slow delay to show loading state
            await new Promise(resolve => setTimeout(resolve, 800));

            const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`);
            const data = await res.json();

            setItems(prev => [...prev, ...data]);
            setHasMore(data.length > 0);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, [page]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
            <div className="w-full max-w-2xl">
                <div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-10 p-4 flex items-center">
                    <Link to="/" className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-4">
                        <ArrowLeft size={24} />
                    </Link>
                    <h1 className="text-xl font-bold text-gray-800">Project 7: Infinite Scrolling</h1>
                </div>

                <div className="mt-20 space-y-4 pb-10">
                    {items.map((item, index) => {
                        if (items.length === index + 1) {
                            return (
                                <div ref={lastElementRef} key={`${item.id}-${index}`} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                                    <div className="flex items-center mb-2">
                                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded mr-2">#{item.id}</span>
                                        <h2 className="text-lg font-bold text-gray-800 capitalize truncate">{item.title}</h2>
                                    </div>
                                    <p className="text-gray-600 line-clamp-2">{item.body}</p>
                                </div>
                            );
                        } else {
                            return (
                                <div key={`${item.id}-${index}`} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                                    <div className="flex items-center mb-2">
                                        <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded mr-2">#{item.id}</span>
                                        <h2 className="text-lg font-bold text-gray-800 capitalize truncate">{item.title}</h2>
                                    </div>
                                    <p className="text-gray-600 line-clamp-2">{item.body}</p>
                                </div>
                            );
                        }
                    })}
                </div>

                {loading && (
                    <div className="flex justify-center p-4 mb-8">
                        <Loader className="animate-spin text-blue-500" size={32} />
                    </div>
                )}

                {!hasMore && (
                    <div className="text-center p-4 text-gray-500 mb-8">
                        No more posts to load.
                    </div>
                )}
            </div>
        </div>
    );
};

export default InfiniteScrolling;
