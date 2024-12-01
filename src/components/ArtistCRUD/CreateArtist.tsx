import React, { useState } from 'react';
import "../../assets/styles/components/_createArtist.scss"
import apiService from "../../services/api";
import {useDispatch} from "react-redux";
import {setArtists} from "../../store/artistSlice";

interface CreateArtistProps {
    onClose: () => void;
}

const CreateArtist: React.FC<CreateArtistProps> = ({ onClose }) => {
    const dispatch = useDispatch();

    const [artistData, setArtistData] = useState<{
        name: string,
        description: string,
        spotify_link: string
        artistPicture: File | null;
    }>({
        name: '',
        description: '',
        spotify_link: '',
        artistPicture: null
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setArtistData({ ...artistData, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setArtistData({ ...artistData, artistPicture: e.target.files[0] });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            const responseData = await apiService.createArtist(artistData)

            setArtistData({
                name: '',
                description: '',
                spotify_link: '',
                artistPicture: null
            });

            const data = await apiService.getArtists();
            const sortedArtists = data.sort(
                (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
            );
            dispatch(setArtists(sortedArtists));

            onClose()

            alert(`Artist created successfully:\n${JSON.stringify(responseData, null, 2)}`);
        } catch (error) {
            console.error('Error creating artist:', error);
        }
    };

    return (
        <div className="create-artist-container">
            <div className="title-container">
                <h1>Create Artist</h1>
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

                        <div className="form-group">
                            <label htmlFor="artistPicture">Artist Picture</label>
                            <input
                                type="file"
                                id="artistPicture"
                                name="artistPicture"
                                onChange={handleFileChange}
                                accept="image/*"
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

export default CreateArtist;
