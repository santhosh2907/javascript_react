import React, { useState, useEffect, useRef } from 'react';

const generateItems = (count, start = 0) => {
    const result = [];
    for (let i = 0; i < count; i++) {
        result.push(`Item ${start + i + 1}`);
    }
    return result;
};

const InfiniteScroll = () => {
    const [items, setItems] = useState(generateItems(20));
    const [loading, setLoading] = useState(false);
    const loaderRef = useRef(null);

    const fetchMoreData = () => {
        setLoading(true);
        setTimeout(() => {
            setItems(prev => [...prev, ...generateItems(10, prev.length)]);
            setLoading(false);
        }, 1000);
    };

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !loading) fetchMoreData();
        });

        if (loaderRef.current) observer.observe(loaderRef.current);

        return () => {
            if (loaderRef.current) observer.unobserve(loaderRef.current);
        };
    }, [loading]);

    return (
        <div style={{ height: '300px', overflowY: 'auto', border: '1px solid black' }}>
            {items.map((_, i) => (
                <div key={i} style={{ padding: '20px', borderBottom: '1px solid #ccc' }}>Item {i + 1}</div>
            ))}
            <div ref={loaderRef} style={{ padding: '20px', textAlign: 'center' }}>
                {loading ? 'Loading more...' : 'Scroll down to load more'}
            </div>
        </div>
    );
};
export default InfiniteScroll;
