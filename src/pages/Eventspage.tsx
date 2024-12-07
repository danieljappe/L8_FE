// src/components/HomePage.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import  '../assets/styles/pages/_eventspage.scss'
import useFetchEvents from "../hooks/fetchEvents";
import {Link} from "react-router-dom";

const Eventspage: React.FC = () => {
    const events = useSelector((state: RootState) => state.events.events);
    useFetchEvents()
    return (
        <div className="eventspage">
            <section>
                <div className="title-container">
                    <h1>All events</h1>
                </div>

                <div className='event-list-container'>
                    <div className="event-table">
                        {events.map((event) => (

                                <div key={event.id} className="event-card">
                                    <Link to={`/event/${event?.id}`} style={{ textDecoration: 'none' }}>
                                        <div className='event-card-content'>
                                            <h3>{event.title}</h3>
                                            <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                                            <p>Location: {event.location}</p>
                                        </div>
                                    </Link>
                                </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Eventspage;