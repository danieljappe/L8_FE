// src/components/HomePage.tsx

import React, {useEffect, useState} from 'react';

import stockImage from '../assets/files/event3.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { setEvents } from '../store/eventSlice';
import { RootState } from '../store';
import  '../assets/styles/pages/_eventspage.scss'

const Eventspage: React.FC = () => {
    const dispatch = useDispatch();
    const events = useSelector((state: RootState) => state.events.events);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/events');
                const data = await response.json();
                const sortedEvents = data.sort((a: { date: string | number | Date; }, b: { date: string | number | Date; }) => new Date(a.date).getTime() - new Date(b.date).getTime());
                dispatch(setEvents(sortedEvents));
            } catch (error) {
                console.error('Failed to fetch events:', error);
            }
        };
        fetchEvents()
    }, [dispatch]);

    return (
        <div className="eventspage">
            <section>
                <div className="title-container">
                    <h1>All events</h1>
                </div>

                <div className='event-list-container'>
                    <div className="event-table">
                        {events.map((event) => (
                            <div
                                key={event.id}
                                className="event-card"
                            >
                                <div className='event-card-content'>
                                    <h3>{event.title}</h3>
                                    <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                                    //TODO: add
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Eventspage;