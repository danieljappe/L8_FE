import React, { useState } from 'react';
import "../../assets/styles/components/_editArtists.scss";
import apiService from "../../services/api";
import { useDispatch } from "react-redux";
import { setArtists } from "../../store/artistSlice";

interface EditArtistProps {
    artist: {
        id: string;
        name: string;
        description: string;
        spotify_link: string;
        artistPicture: string;
    };
    onClose: () => void;
}

const EditArtist: React.FC<EditArtistProps> = ({ artist, onClose }) => {
    const dispatch = useDispatch();
    const [artistData, setArtistData] = useState(artist);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setArtistData({ ...artistData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await apiService.updateArtist(artistData.id, artistData); // Update artist via API

            // Refresh artists in the Redux store
            const data = await apiService.getArtists();
            const sortedArtists = data.sort(
                (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
            );
            dispatch(setArtists(sortedArtists));

            // Close the modal
            onClose();

            alert(`Artist updated successfully:\n${JSON.stringify(artistData, null, 2)}`);
        } catch (error) {
            console.error('Error updating artist:', error);
        }
    };

    return (
        <div className="edit-artist-container">
            <div className="title-container">
                <h1>Edit Artist</h1>
            </div>
            <section>
                <div className="artist-form">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Artist Name</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={artistData.name}
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
                                value={artistData.description}
                                onChange={handleChange}
                                placeholder="Enter artist description"
                            ></textarea>
                        </div>

                        <div className="form-group">
                            <label htmlFor="location">Spotify Link</label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={artistData.spotify_link}
                                onChange={handleChange}
                                placeholder="Enter artist spotify link"
                            />
                        </div>

                        <div className="button-container">
                            <button type="submit" className="submit-button">
                                Create Artist
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default EditArtist;
