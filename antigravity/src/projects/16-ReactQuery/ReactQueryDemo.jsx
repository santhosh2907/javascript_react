import React from 'react';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowLeft, Loader, AlertCircle, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

const queryClient = new QueryClient();

const fetchPosts = async () => {
    // Simulating delay
    await new Promise(resolve => setTimeout(resolve, 800));
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
    if (!res.ok) throw new Error('Network response was not ok');
    return res.json();
};

const PostsList = () => {
    const {
        data,
        error,
        isLoading,
        isError,
        refetch,
        isFetching
    } = useQuery({ queryKey: ['posts'], queryFn: fetchPosts });

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center p-12">
                <Loader className="animate-spin text-blue-500 mb-4" size={48} />
                <p className="text-gray-500">Loading posts via React Query...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center p-12 text-red-500">
                <AlertCircle className="mx-auto mb-4" size={48} />
                <p>Error: {error.message}</p>
                <button onClick={refetch} className="mt-4 px-4 py-2 bg-red-100 rounded-lg hover:bg-red-200">
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center bg-blue-50 p-4 rounded-xl border border-blue-100">
                <span className="text-blue-800 font-medium">
                    {isFetching ? 'Refreshing...' : 'Data is fresh'}
                </span>
                <button
                    onClick={refetch}
                    disabled={isFetching}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                    <RefreshCw size={18} className={isFetching ? 'animate-spin' : ''} />
                    Refetch
                </button>
            </div>

            <div className="grid gap-4">
                {data.map(post => (
                    <div key={post.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <h3 className="font-bold text-gray-800 text-lg mb-2 capitalize">{post.title}</h3>
                        <p className="text-gray-600">{post.body}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ReactQueryDemo = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
                <Link to="/" className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
                    <ArrowLeft size={24} />
                </Link>

                <div className="w-full max-w-2xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">React Query Demo</h1>
                        <p className="text-gray-600">
                            Automatic background refetching, caching, and state management (loading/error) out of the box.
                        </p>
                    </div>

                    <PostsList />
                </div>
            </div>
        </QueryClientProvider>
    );
};

export default ReactQueryDemo;
