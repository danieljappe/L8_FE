import React, {useState} from 'react';
import "../../../assets/styles/components/_createArtist.scss"

const DashboardArtist: React.FC = () => {
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
        <div className="create-artist-container">
            <h1>Create Artist</h1>
            <section>
                <div className="artist-form">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Artist Name</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={eventData.title}
                                onChange={handleChange}
                                placeholder="Enter artist title"
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
                                placeholder="Enter artist description"
                            ></textarea>
                        </div>

                        <div className="form-group">
                            <label htmlFor="date">Spotify Link</label>
                            <input
                                id="spotify_link"
                                name="spotify_link"
                                value={eventData.date}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="eventPicture">Artist Picture</label>
                            <input
                                type="file"
                                id="artistPicture"
                                name="artistPicture"
                                onChange={handleFileChange}
                                accept="image/*"
                            />
                        </div>

                        <button type="submit" className="submit-button">
                            Create artist
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default DashboardArtist;
