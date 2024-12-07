import React, { useState } from 'react';
import stockImage from '../assets/files/event3.jpg';
import Slider from "react-slick";
import { useSelector } from 'react-redux';
import { Event } from '../store/eventSlice';
import { RootState } from '../store';

import '../assets/styles/components/_homepage.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useFetchEvents from "../hooks/fetchEvents";
import useUpcomingEvent from "../hooks/fetchUpcomingEvent";

const HomePage: React.FC = () => {
    const events = useSelector((state: RootState) => state.events.events);
    const upcomingEvent = useUpcomingEvent();

    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useFetchEvents();

    const openModal = (event: Event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedEvent(null);
        setIsModalOpen(false);
    };

    const getNextEventIndex = (): number => {
        const now = new Date().getTime();
        const index = events.findIndex(event => new Date(event.date).getTime() > now);
        return index !== -1 ? index : 0; // Default to 0 if no future events
    };

    const slider_settings = {
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
                <div className="next-event-container">
                    <h1>Næste event:</h1>
                    {upcomingEvent ? (
                        <div className="next-event-details">
                            <h1>{upcomingEvent.title}</h1>
                            <h2>
                                {upcomingEvent.date
                                    ? new Date(upcomingEvent.date).toLocaleDateString()
                                    : 'N/A'}
                            </h2>
                            <p>{upcomingEvent.description}</p>
                            <ul>
                                {upcomingEvent.artists && upcomingEvent.artists.length > 0 ? (
                                    upcomingEvent.artists.map((artist) => (
                                        <li key={artist.id}>{artist.name}</li>
                                    ))
                                ) : (
                                    <li>No artists found for this event.</li>
                                )}
                            </ul>
                        </div>
                    ) : (
                        <p>No upcoming events</p>
                    )}
                </div>

                <div className='event-list-container'>
                    <h2>Events:</h2>
                    <div className="slider-container">
                        <Slider {...slider_settings}>
                            {events.map((event) => (
                                <div
                                    key={event.id}
                                    className="event-card"
                                    style={{
                                        backgroundImage: `url(${stockImage})`
                                    }}
                                >
                                    <div className='event-card-content'>
                                        <a onClick={() => openModal(event)}>
                                            <h3>{event.title}</h3>
                                            <p>Date: {new Date(event.date).toLocaleDateString()}</p>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </section>

            {isModalOpen && selectedEvent && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div
                        className="modal"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
                    >
                        <h2>{selectedEvent.title}</h2>
                        <img src={stockImage} alt={"Event"} />
                        <p><strong>Description:</strong> {selectedEvent.description}</p>
                        <p><strong>Date:</strong> {new Date(selectedEvent.date).toLocaleString()}</p>
                        <p><strong>Ticket Price:</strong> ${selectedEvent.ticketPrice}</p>
                        <ul>
                            {selectedEvent.artists && selectedEvent.artists.length > 0 ? (
                                selectedEvent.artists.map((artist) => (
                                    <li key={artist.id}>{artist.name}</li>
                                ))
                            ) : (
                                <li>No artists found for this event.</li>
                            )}
                        </ul>
                        <button onClick={closeModal} className="close-button">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;
