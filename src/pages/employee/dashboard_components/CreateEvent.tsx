import React, { useState } from 'react';
import "../../../assets/styles/components/_createEvent.scss"

const CreateEvent: React.FC = () => {
    const [eventData, setEventData] = useState<{
        title: string;
        description: string;
        date: string;
        location: string;
        ticketPrice: string;
        eventPicture: File | null;
        published: boolean;
        billetto_eventId: string;
    }>({
        title: '',
        description: '',
        date: '',
        location: '',
        ticketPrice: '',
        eventPicture: null,
        published: false,
        billetto_eventId: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEventData({ ...eventData, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setEventData({ ...eventData, eventPicture: e.target.files[0] });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            const response = await fetch("http://localhost:5000/api/events", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(eventData), // Include eventData in the request body
            });

            if(!response.ok) {
                throw new Error(`Error posting event: ${response.status}`)
            }

            const responseData = await response.json();
            console.log("Event created succesfully", responseData);

            setEventData({
                title: '',
                description: '',
                date: '',
                location: '',
                ticketPrice: '',
                eventPicture: null,
                published: false,
                billetto_eventId: '',
            });
            alert(`Event created successfully:\n${JSON.stringify(responseData, null, 2)}`);
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    return (
        <div className="create-event-container">
            <h1>Create Event</h1>
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
                                placeholder="Enter event title"
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
                                placeholder="Enter event description"
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
                                placeholder="Enter event location"
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
                                placeholder="Enter ticket price"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="eventPicture">Event Picture</label>
                            <input
                                type="file"
                                id="eventPicture"
                                name="eventPicture"
                                onChange={handleFileChange}
                                accept="image/*"
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
                                        setEventData({...eventData, published: !eventData.published})
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
                                placeholder="Enter Billetto Event ID"
                            />
                        </div>

                        <button type="submit" className="submit-button">
                            Create Event
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default CreateEvent;
