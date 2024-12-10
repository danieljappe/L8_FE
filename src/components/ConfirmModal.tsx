import React from "react";
import '../assets/styles/components/_confirmModal.scss'

interface ConfirmModalProps {
    isOpen: boolean;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
           isOpen,
           message,
           onConfirm,
           onCancel,
       }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-backdrop">
            <div className="confirmmodal">
                <p>{message}</p>
                <div className="modal-actions">
                    <button className="cancel-btn" onClick={onCancel}>
                        Cancel
                    </button>
                    <button className="confirm-btn" onClick={onConfirm}>
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
