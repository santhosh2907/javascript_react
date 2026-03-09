import React, { useState, useEffect } from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, title, children }) => {
    // Close the modal when the Escape key is pressed
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);

        // Cleanup the event listener on unmount
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    // Prevent background scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            {/* Stop click propagation to prevent closing when clicking inside the modal content */}
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>{title}</h3>
                    <button className="modal-close" onClick={onClose}>
                        &times;
                    </button>
                </div>

                <div className="modal-body">
                    {children}
                </div>

                <div className="modal-footer">
                    <button className="btn-secondary" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="btn-primary" onClick={onClose}>
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

// Example Usage Wrapper to test it easily
const ModalExample = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="modal-example-container">
            <h2>Modal Overlay Component</h2>
            <button
                className="btn-primary open-btn"
                onClick={() => setIsModalOpen(true)}
            >
                Open Modal
            </button>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Confirmation Required"
            >
                <p>Are you sure you want to perform this action? This cannot be undone.</p>
                <p>This modal also supports closing via the `Escape` key or by clicking on the darkened overlay background.</p>
            </Modal>
        </div>
    );
};

export default ModalExample;
