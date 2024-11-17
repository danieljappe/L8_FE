// src/components/HomePage.tsx

import React, {useEffect, useState} from 'react';

import stockImage from '../assets/files/event3.jpg';
import Slider from "react-slick"
import { useDispatch, useSelector } from 'react-redux';
import { Event, setEvents } from '../store/eventSlice';
import { RootState } from '../store';


import '../assets/styles/components/_homepage.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomePage: React.FC = () => {
    const dispatch = useDispatch();
    const events = useSelector((state: RootState) => state.events.events);

    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const openModal = (event: Event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    }

    const closeModal = (event?: React.MouseEvent) => {
        setSelectedEvent(null);
        setIsModalOpen(false);
    };

    // Find the index of the next upcoming event
    const getNextEventIndex = (): number => {
        const now = new Date().getTime();
        const index = events.findIndex(event => new Date(event.date).getTime() > now);
        return index !== -1 ? index : 0; // Default to 0 if no future events
    };

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        speed: 500,
        initialSlide: getNextEventIndex() // Center the next upcoming event
    };


    return (
        <div className="homepage">
            <section>
                <div className='next-event-container'>
                    <h1>
                        Next event:
                    </h1>
                </div>
                <div className='event-list-container'>
                    <h2>Events:</h2>
                    <div className="slider-container">
                        <Slider {...settings}>
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
                        </Slider>
                    </div>
                </div>
            </section>
            <section></section>

            {isModalOpen && selectedEvent && (
                <div className="modal-overlay" onClick={() => closeModal()}>
                <div
                        className="modal"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
                    >
                        <h2>{selectedEvent.title}</h2>
                        <img src={stockImage} alt={"Event"} />
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