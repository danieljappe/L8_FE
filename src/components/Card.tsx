// src/components/Card.tsx

import React from 'react';
import '../assets/styles/components/_card.scss';

interface CardProps {
    title: string;
    children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => (
    <div className="card">
        <h2 className="card-title">{title}</h2>
        <div className="card-content">{children}</div>
    </div>
);

export default Card;
