import React, { useEffect, useState } from 'react';
import "../../assets/styles/components/_editEvents.scss";
import apiService from "../../services/api";
import { useSelector } from "react-redux";
import { Artist } from "../../types";
import useFetchArtists from "../../hooks/fetchArtists";
import { RootState } from "../../store";
import useFetchEvents from "../../hooks/fetchEvents";

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
        artists: Artist[];
    };
    onClose: () => void;
}

const EditEvent: React.FC<EditEventProps> = ({ event, onClose }) => {
    const fetchEvents = useFetchEvents(); // Access the refetch function
    const artists = useSelector((state: RootState) => state.artists.artists);
    const [eventData, setEventData] = useState(event);
    const [availableArtists, setAvailableArtists] = useState<Artist[]>([]);
    const [selectedArtistIds, setSelectedArtistIds] = useState<string[]>(
        event.artists.map((artist) => artist.id)
    );
    const [originalArtistIds, setOriginalArtistIds] = useState<string[]>([]);

    useFetchArtists();

    useEffect(() => {
        setAvailableArtists(artists);
    }, [artists]);

    useEffect(() => {
        // Fetch original artists for the event
        const fetchEventArtists = async () => {
            try {
                const eventArtists = await apiService.getArtistsByEvent(event.id);
                setOriginalArtistIds(eventArtists.map((artist) => artist.id));
            } catch (error) {
                console.error('Error fetching event artists:', error);
            }
        };

        fetchEventArtists();
    }, [event.id]);

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Update the event details
            await apiService.updateEvent(eventData.id, eventData);

            // Compare and update artists
            const addedArtists = selectedArtistIds.filter(
                (id) => !originalArtistIds.includes(id)
            );
            const removedArtists = originalArtistIds.filter(
                (id) => !selectedArtistIds.includes(id)
            );

            if (addedArtists.length > 0) {
                await apiService.addArtistsToEvent(eventData.id, addedArtists);
            }

            for (const artistId of removedArtists) {
                await apiService.removeArtistFromEvent(eventData.id, artistId);
            }

            await fetchEvents()

            // Close the modal only after Redux is updated
            onClose();
            alert('Event updated successfully!');
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
                            <label htmlFor="artists">Artists</label>
                            {availableArtists.length > 0 ? (
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
