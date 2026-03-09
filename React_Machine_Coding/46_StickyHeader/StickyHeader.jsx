import React, { useState, useEffect } from 'react';
import './StickyHeader.css';

const StickyHeader = () => {
  const [isSticky, setSticky] = useState(false);
  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="sticky-page">
      <header className={`header ${isSticky ? 'sticky' : ''}`}>
        <h2>My Logo</h2>
        <nav>Links...</nav>
      </header>
      <main style={{ height: '200vh', padding: '20px' }}>
        <p>Scroll down to see the sticky header action...</p>
      </main>
    </div>
  );
};
export default StickyHeader;
