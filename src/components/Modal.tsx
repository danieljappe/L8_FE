import React from 'react';
import "../assets/styles/components/_modal.scss"

interface ModalProps {
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, children, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h2>{title}</h2>
                {children}
                <button onClick={onClose} className="close-button">
                    Close
                </button>
            </div>
        </div>
    );
};

export default Modal;
