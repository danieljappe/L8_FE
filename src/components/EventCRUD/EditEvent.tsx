import React, { useState } from 'react';
import "../../assets/styles/components/_editEvents.scss";
import apiService from "../../services/api";
import { useDispatch } from "react-redux";
import { setEvents } from "../../store/eventSlice";
import {Artist} from "../../types";

interface EditEventProps {
    event: {
        id: string;
        title: string;
        description: string;
        date: string;
        location: string;
        ticketPrice: number;
        eventPicture: string;
        published: boolean;
        billetto_eventId: string;
        artists: Artist[]
    };
    onClose: () => void;
}

const EditEvent: React.FC<EditEventProps> = ({ event, onClose }) => {
    const dispatch = useDispatch();
    const [eventData, setEventData] = useState(event);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEventData({ ...eventData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await apiService.updateEvent(eventData.id, eventData); // Update event via API

            // Refresh events in the Redux store
            const data = await apiService.getEvents();
            const sortedEvents = data.sort(
                (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
            );
            dispatch(setEvents(sortedEvents));

            // Close the modal
            onClose();

            alert(`Event updated successfully:\n${JSON.stringify(eventData, null, 2)}`);
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    return (
        <div className="edit-event-container">
            <div className="title-container">
                <h1>Edit Event</h1>
            </div>
            <section>
                <div className="event-form">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Event Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={eventData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={eventData.description}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <div className="form-group">
                            <label htmlFor="date">Date</label>
                            <input
                                type="datetime-local"
                                id="date"
                                name="date"
                                value={eventData.date}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="location">Location</label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={eventData.location}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="ticketPrice">Ticket Price</label>
                            <input
                                type="number"
                                id="ticketPrice"
                                name="ticketPrice"
                                value={eventData.ticketPrice}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <div className="checkbox">
                                <label htmlFor="published">Published</label>
                                <input
                                    type="checkbox"
                                    id="published"
                                    name="published"
                                    checked={eventData.published}
                                    onChange={() =>
                                        setEventData({ ...eventData, published: !eventData.published })
                                    }
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="billetto_eventId">Billetto Event ID</label>
                            <input
                                type="text"
                                id="billetto_eventId"
                                name="billetto_eventId"
                                value={eventData.billetto_eventId}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="button-container">
                            <button type="submit" className="submit-button">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default EditEvent;
