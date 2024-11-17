// src/components/HomePage.tsx

import React, {useEffect, useState} from 'react';
import '../assets/styles/components/_homepage.scss';
import stockImage from '../assets/files/event3.jpg';

interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    ticketPrice: number;
    eventPicture: string;
    published: number;
    billetto_eventId: string;
}



const HomePage: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/events');
                const data = await response.json()
                setEvents(data);
            } catch (error){
                console.error(error)
            }
        };
        fetchEvents()
    }, []);

    const openModal = (event: Event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    }

    const closeModal = (event?: React.MouseEvent) => {
        setSelectedEvent(null);
        setIsModalOpen(false);
    };


    return (
        <div className="homepage">
            <section>
                <div className='event-list-container'>
                    <h2>Events:</h2>
                    <div className="event-list">
                        {events.map((event) => (
                            <div
                                key={event.id}
                                className="event-card"
                                style={{
                                    backgroundImage: `url(${stockImage})`
                                }}
                            >
                                <div className='event-card-content'>
                                    <h3>{event.title}</h3>
                                    <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                                    <button
                                        className="details-button"
                                        onClick={() => openModal(event)}
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section>

            </section>

            {isModalOpen && selectedEvent && (
                <div className="modal-overlay" onClick={() => closeModal()}>
                    <div
                        className="modal"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
                    >
                        <h2>{selectedEvent.title}</h2>
                        <img src={stockImage}  alt={"image"}/>
                        <p><strong>Description:</strong> {selectedEvent.description}</p>
                        <p><strong>Date:</strong> {new Date(selectedEvent.date).toLocaleString()}</p>
                        <p><strong>Ticket Price:</strong> ${selectedEvent.ticketPrice}</p>
                        <button onClick={() => closeModal()} className="close-button">
                            Close
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default HomePage;
