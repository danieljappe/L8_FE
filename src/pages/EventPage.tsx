import React from 'react';
import { useParams } from 'react-router-dom';
import useFetchEvent from "../hooks/fetchEvent";
import '../assets/styles/pages/_eventpage.scss';
import BackButton from "../components/BackButton";

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
            <section>
                <BackButton/>
                <p><strong>id: </strong>{event.id}</p>
                <p><strong>title: </strong>{event.title}</p>
                <p><strong>description: </strong>{event.description}</p>
                <p><strong>date: </strong>{new Date(event.date).toLocaleString()}</p>
                <p><strong>location: </strong>{event.location}</p>
                <p><strong>ticketPrice: </strong>{event.ticketPrice}</p>
                <p><strong>eventPicture: </strong>{event.eventPicture}</p>
                <p><strong>published: </strong>{event.published}</p>
                <p><strong>billetto_eventId: </strong>{event.billetto_eventId}</p>
                <p><strong>createdAt: </strong>{new Date(event.createdAt).toLocaleString()}</p>
                <p><strong>updatedAt: </strong>{new Date(event.updatedAt).toLocaleString()}</p>
            </section>
        </div>
    );
};

export default EventPage;
