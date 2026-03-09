import React, { useState } from 'react';
import './Pagination.css';

const Pagination = ({ totalItems = 100, itemsPerPage = 10 }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Generate page numbers
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="pagination-container">
            <h2>Pagination Component</h2>

            {/* Mock Content */}
            <div className="content">
                <p>Displaying items {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}</p>
            </div>

            <div className="pagination">
                {/* Previous Button */}
                <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className="page-item prev-next"
                >
                    &laquo; Prev
                </button>

                {/* Page Numbers */}
                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageClick(page)}
                        className={`page-item ${currentPage === page ? 'active' : ''}`}
                    >
                        {page}
                    </button>
                ))}

                {/* Next Button */}
                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="page-item prev-next"
                >
                    Next &raquo;
                </button>
            </div>
        </div>
    );
};

export default Pagination;
