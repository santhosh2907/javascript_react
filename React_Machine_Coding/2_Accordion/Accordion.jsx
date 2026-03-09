import React, { useState } from 'react';
import './Accordion.css';

const AccordionItem = ({ title, content, isOpen, onClick }) => {
    return (
        <div className={`accordion-item ${isOpen ? 'open' : ''}`}>
            <div className="accordion-header" onClick={onClick}>
                <h3>{title}</h3>
                <span className="icon">{isOpen ? '-' : '+'}</span>
            </div>
            {isOpen && (
                <div className="accordion-content">
                    <p>{content}</p>
                </div>
            )}
        </div>
    );
};

const Accordion = ({ items }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const handleItemClick = (index) => {
        // Toggle: if clicking the already open item, close it. Otherwise, open the new one.
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="accordion-container">
            <h2>Accordion Component</h2>
            <div className="accordion">
                {items.map((item, index) => (
                    <AccordionItem
                        key={index}
                        title={item.title}
                        content={item.content}
                        isOpen={openIndex === index}
                        onClick={() => handleItemClick(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Accordion;

// Usage Example:
// const data = [
//   { title: 'Section 1', content: 'Content for section 1...' },
//   { title: 'Section 2', content: 'Content for section 2...' },
// ];
// <Accordion items={data} />
