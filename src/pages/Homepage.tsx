// src/components/HomePage.tsx

import React, {useState} from 'react';

import stockImage from '../assets/files/event3.jpg';
import Slider from "react-slick"
import { useSelector } from 'react-redux';
import { Artist} from '../store/eventSlice';
import { RootState } from '../store';

import '../assets/styles/components/_homepage.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useFetchEvents from "../hooks/fetchEvents";

const HomePage: React.FC = () => {
    const events = useSelector((state: RootState) => state.events.events);
    const user = useSelector((state: any) => state.auth.user);

    const [selectedEvent, setSelectedEvent] = useState<Artist | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useFetchEvents()

    const openModal = (event: Artist) => {
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

    const getUpcomingEvent = (): Artist | null => {
        const now = new Date().getTime();
        const upcomingEvent = events.find(event => event.date && new Date(event.date).getTime() > now);
        return upcomingEvent || null;
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
                    {getUpcomingEvent() ? (
                        <div className="next-event-details">
                            <h1>{getUpcomingEvent()?.title}</h1>
                            <h2>
                                {getUpcomingEvent()?.date ? new Date(getUpcomingEvent()!.date).toLocaleDateString() : 'N/A'}
                            </h2>
                            <p>{getUpcomingEvent()?.description}</p>
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