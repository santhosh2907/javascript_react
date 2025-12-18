import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, X, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

// Portal Component
const ModalPortal = ({ children }) => {
    const mount = document.getElementById('portal-root') || document.body;
    return createPortal(children, mount);
};

const Modal = ({ isOpen, onClose, title, children, type = 'info' }) => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setAnimate(true);
            document.body.style.overflow = 'hidden';
        } else {
            const timer = setTimeout(() => setAnimate(false), 300);
            document.body.style.overflow = 'unset';
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isOpen && !animate) return null;

    const colors = {
        info: 'bg-blue-600',
        success: 'bg-green-600',
        danger: 'bg-red-600',
        warning: 'bg-yellow-500'
    };

    const icons = {
        info: <Info className="text-blue-600" size={32} />,
        success: <CheckCircle className="text-green-600" size={32} />,
        danger: <AlertTriangle className="text-red-600" size={32} />,
        warning: <AlertTriangle className="text-yellow-500" size={32} />
    };

    return (
        <ModalPortal>
            <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={onClose}
                ></div>

                {/* Modal Content */}
                <div className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all duration-300 ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}`}>
                    <div className={`${colors[type]} p-4 flex justify-between items-center text-white`}>
                        <h3 className="font-bold text-lg">{title}</h3>
                        <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="p-6 md:p-8 flex gap-6">
                        <div className="flex-shrink-0 bg-gray-50 p-3 rounded-full h-fit">
                            {icons[type]}
                        </div>
                        <div>
                            {children}
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onClose}
                            className={`px-4 py-2 text-white rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-95 font-medium ${colors[type]}`}
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </ModalPortal>
    );
};

const ModalPopup = () => {
    const [modalConfig, setModalConfig] = useState({ isOpen: false, type: 'info', title: '' });

    const openModal = (type, title) => {
        setModalConfig({ isOpen: true, type, title });
    };

    const closeModal = () => {
        setModalConfig({ ...modalConfig, isOpen: false });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
            <Link to="/" className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
                <ArrowLeft size={24} />
            </Link>

            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">React Portals & Modals</h1>
                <p className="text-gray-600 mb-12 max-w-md mx-auto">
                    Demonstrating how to render content outside the DOM hierarchy of the parent component using React Portals.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
                    <button
                        onClick={() => openModal('info', 'Information')}
                        className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all border-l-4 border-blue-500 text-left group"
                    >
                        <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">Info Modal</h3>
                        <p className="text-gray-500 text-sm mt-1">Standard informational popup</p>
                    </button>

                    <button
                        onClick={() => openModal('success', 'Success!')}
                        className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all border-l-4 border-green-500 text-left group"
                    >
                        <h3 className="font-bold text-gray-800 group-hover:text-green-600 transition-colors">Success Modal</h3>
                        <p className="text-gray-500 text-sm mt-1">Action completed successfully</p>
                    </button>

                    <button
                        onClick={() => openModal('warning', 'Warning')}
                        className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all border-l-4 border-yellow-500 text-left group"
                    >
                        <h3 className="font-bold text-gray-800 group-hover:text-yellow-600 transition-colors">Warning Modal</h3>
                        <p className="text-gray-500 text-sm mt-1">Cautionary message</p>
                    </button>

                    <button
                        onClick={() => openModal('danger', 'Destructive Action')}
                        className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all border-l-4 border-red-500 text-left group"
                    >
                        <h3 className="font-bold text-gray-800 group-hover:text-red-600 transition-colors">Danger Modal</h3>
                        <p className="text-gray-500 text-sm mt-1">Delete or destructive confirm</p>
                    </button>
                </div>
            </div>

            <Modal
                isOpen={modalConfig.isOpen}
                onClose={closeModal}
                title={modalConfig.title}
                type={modalConfig.type}
            >
                <p className="text-gray-600">
                    This is a modal rendered using <code>createPortal</code>.
                    It sits at the top of the DOM tree, avoiding z-index issues with parent containers.
                </p>
                <p className="text-gray-600 mt-2">
                    You can click the backdrop or the buttons to close me.
                </p>
            </Modal>
        </div>
    );
};

export default ModalPopup;
