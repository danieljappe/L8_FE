// src/components/EventList.tsx

import React, { useEffect, useState } from 'react';
import { getEvents } from '../services/api';
import { Event } from '../types';
import Button from './Button';

const EventList: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const handleToggleEvents = async () => {
        if (isVisible) {
            // Hide events if they are currently visible
            setIsVisible(false);
        } else {
            // Load events if they are not currently visible
            if (events.length === 0) {
                try {
                    const eventsData = await getEvents();
                    setEvents(eventsData);
                } catch (err) {
                    setError('Failed to load events');
                }
            }
            setIsVisible(true);
        }
    };

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h2>Events</h2>
            <Button label={isVisible ? "Hide Events" : "Load Events"} onClick={handleToggleEvents} />
            {error && <p>{error}</p>}
            {isVisible && (
                <ul>
                    {events.map((event) => (
                        <li key={event.id}>
                            <h3>{event.title}</h3>
                            <p>{event.date}</p>
                            <p>{event.location}</p>
                            <p>{event.description}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default EventList;