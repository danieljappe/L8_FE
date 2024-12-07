import React from 'react';
import { useParams } from 'react-router-dom';
import useFetchEvent from "../hooks/fetchEvent";
import '../assets/styles/pages/_eventpage.scss';
import BackButton from "../components/BackButton";

import stockImage from '../assets/files/event3.jpg';

const EventPage: React.FC = () => {
    const { eventId } = useParams<{ eventId: string }>();
    const { event, loading, error } = useFetchEvent(eventId);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!event) {
        return <div>No event found</div>;
    }

    return (
        <div className="event-page">
            <header className="event-header">
                <BackButton className="back-button" />
                <h1 className="event-title">{event.title}</h1>
            </header>
            <section className="event-image-section">
                <img src={stockImage} alt={event.title} className="event-picture"/>
            </section>
            <section className="event-details">
                <div className="event-info">
                    <h2 className="event-subtitle">Event Details</h2>
                    <div className="info-group">
                        <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
                        <p><strong>Location:</strong> {event.location}</p>
                        <p><strong>Ticket Price:</strong> ${event.ticketPrice}</p>
                    </div>
                    <div className="description">
                        <h3>About the Event</h3>
                        <p>{event.description}</p>
                    </div>
                </div>
                <aside className="event-meta">
                    <h2 className="meta-title">Additional Info</h2>
                    <ul>
                        <li><strong>Event ID:</strong> {event.id}</li>
                        <li><strong>Published:</strong> {event.published ? 'Yes' : 'No'}</li>
                        <li><strong>Billetto Event ID:</strong> {event.billetto_eventId}</li>
                        <li><strong>Created At:</strong> {new Date(event.createdAt).toLocaleString()}</li>
                        <li><strong>Updated At:</strong> {new Date(event.updatedAt).toLocaleString()}</li>
                    </ul>
                </aside>
            </section>
        </div>


    );
};

export default EventPage;
