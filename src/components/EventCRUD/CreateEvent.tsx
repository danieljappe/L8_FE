import React, { useEffect, useState } from 'react';
import "../../assets/styles/components/_createEvents.scss";
import apiService from "../../services/api";
import { useDispatch } from "react-redux";
import { setEvents } from "../../store/eventSlice";
import { Artist } from "../../types";

interface CreateEventProps {
    onClose: () => void;
}

const CreateEvent: React.FC<CreateEventProps> = ({ onClose }) => {
    const dispatch = useDispatch();
    const [availableArtists, setAvailableArtists] = useState<Artist[]>([]);
    const [loadingArtists, setLoadingArtists] = useState(true); // Track loading state
    const [selectedArtistIds, setSelectedArtistIds] = useState<string[]>([]);
    const [eventData, setEventData] = useState<{
        title: string;
        description: string;
        date: string;
        location: string;
        ticketPrice: string;
        eventPicture: File | null;
        published: boolean;
        billetto_eventId: string;
        artists: Artist[];
    }>({
        title: '',
        description: '',
        date: '',
        location: '',
        ticketPrice: '',
        eventPicture: null,
        published: false,
        billetto_eventId: '',
        artists: []
    });

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const artists = await apiService.getArtists();
                setAvailableArtists(artists);
            } catch (error) {
                console.error('Error fetching artists:', error);
            } finally {
                setLoadingArtists(false); // Update the loading state
            }
        };
        fetchArtists();
    }, []);

    const handleArtistSelection = (artist: Artist) => {
        const isSelected = selectedArtistIds.includes(artist.id);
        const updatedArtistIds = isSelected
            ? selectedArtistIds.filter((id) => id !== artist.id)
            : [...selectedArtistIds, artist.id];

        setSelectedArtistIds(updatedArtistIds);
    };

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
        try {
            const responseData = await apiService.createEvent({
                ...eventData
            });

            if (selectedArtistIds.length > 0) {
                await apiService.addArtistsToEvent(responseData.id, selectedArtistIds);
            }

            const events = await apiService.getEvents();
            dispatch(setEvents(events));
            onClose();
            alert(`Event created successfully!`);
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    return (
        <div className="create-event-container">
            <div className="title-container">
                <h1>Create Event</h1>
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
                                required
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
                                required
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
                                required
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
                            <label htmlFor="artists">Artists</label>
                            {loadingArtists ? (
                                <p>Loading artists...</p>
                            ) : availableArtists.length > 0 ? (
                                availableArtists.map((artist) => (
                                    <div key={artist.id}>
                                        <input
                                            type="checkbox"
                                            checked={selectedArtistIds.includes(artist.id)}
                                            onChange={() => handleArtistSelection(artist)}
                                        />
                                        {artist.name}
                                    </div>
                                ))
                            ) : (
                                <p>No artists available</p>
                            )}
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
                                placeholder="Enter Billetto Event ID"
                            />
                        </div>

                        <div className="button-container">
                            <button type="submit" className="submit-button">
                                Create Event
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default CreateEvent;
