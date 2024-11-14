// src/components/HomePage.tsx

import React from 'react';
import '../assets/styles/components/_homepage.scss';

const HomePage: React.FC = () => {
    return (
        <div className="homepage">
            <section className="next-event">
                <h2>Next Event</h2>
                <div className="event-card">
                    <h3>Event Title</h3>
                    <p>Date: TBD</p>
                    <p>Location: TBD</p>
                    <button className="details-button">View Details</button>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
