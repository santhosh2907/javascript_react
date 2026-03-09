import React, { useState } from 'react';
import './CarouselSlider.css';

const CarouselSlider = () => {
  const slides = ['Slide 1', 'Slide 2', 'Slide 3'];
  const [curr, setCurr] = useState(0);
  const next = () => setCurr(c => (c + 1) % slides.length);
  const prev = () => setCurr(c => (c - 1 + slides.length) % slides.length);
  return (
    <div className="carousel-container">
      <button onClick={prev}>&lt;</button>
      <div className="slide">{slides[curr]}</div>
      <button onClick={next}>&gt;</button>
    </div>
  );
};
export default CarouselSlider;
