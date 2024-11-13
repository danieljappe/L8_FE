// src/components/Button.tsx
import React from 'react';
import '../assets/styles/components/_button.scss';

interface ButtonProps {
    label: string;
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => (
    <button className="btn" onClick={onClick}>
        {label}
    </button>
);

export default Button;
