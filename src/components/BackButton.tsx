import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
    style?: React.CSSProperties; // Allows passing custom inline styles
    className?: string; // Allows applying external CSS classes
}

const BackButton: React.FC<BackButtonProps> = ({ style, className }) => {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(-1)} // Go back to the previous page
            className={className}
            style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
                ...style, // Merge custom styles with defaults
            }}
        >
            Back
        </button>
    );
};

export default BackButton;
