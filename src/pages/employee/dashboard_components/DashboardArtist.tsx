import React, {useState} from 'react';
import "../../../assets/styles/components/_createArtist.scss"
import fetchArtists from "../../../hooks/fetchArtists";
import {Artist} from "../../../store/artistSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store";
import apiService from "../../../services/api";
import {deleteArtist} from "../../../store/artistSlice"

const DashboardArtist: React.FC = () => {
    const dispatch = useDispatch();
    const artists = useSelector((state: RootState) => state.artists.artists);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<React.ReactNode>(null);
    const [artistData, setArtistData] = useState<{
        name: string,
        description: string,
        spotify_link: string
    }>({
        name: '',
        description: '',
        spotify_link: ''
    });

    fetchArtists()

    const openEditModal = (artist: Artist) => {
        setModalContent(<div><p>something</p></div>
        );
        setIsModalOpen(true);
    };

    const openCreateModal = () => {
        setModalContent(
            <div><p>something</p></div>
        );
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setModalContent(null);
        setIsModalOpen(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setArtistData({ ...artistData, [name]: value });
    };

    //const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //    if (e.target.files) {
    //        setArtistData({ ...artistData, eventPicture: e.target.files[0] });
    //    }
    //};

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            const response = await fetch("http://localhost:5000/api/artists", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(artistData), // Include eventData in the request body
            });

            if(!response.ok) {
                throw new Error(`Error posting event: ${response.status}`)
            }

            const responseData = await response.json();
            console.log("Event created succesfully", responseData);

            setArtistData({
                name: '',
                description: '',
                spotify_link: ''
            });
            alert(`Event created successfully:\n${JSON.stringify(responseData, null, 2)}`);
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await apiService.deleteArtist(id) // Call the API to delete the event
            dispatch(deleteArtist(id)); // Update the Redux store
        } catch (error) {
            console.error("Error deleting artist:", error);
        }
    };

    return (
        <div className="create-artist-container">
            <div className="artistslist">
                <div className="title-container">
                    <h1>All Artists</h1>
                    <button className="create-artist-btn" onClick={openCreateModal}>
                        Create Artist
                    </button>
                </div>
                <section>
                    <div className="artist-table">
                        <div className="artist-table-header">
                            <div>Title</div>
                            <div>Date</div>
                            <div>Location</div>
                            <div>Edit</div>
                            <div>Delete</div>
                        </div>
                        {artists.map((artist) => (
                            <div key={artist.id} className="artist-row">
                                <div>{artist.name}</div>
                                <div>{artist.description}</div>
                                <div>{artist.spotify_link}</div>
                                <button className="edit-btn" onClick={() => openEditModal(artist)}>
                                    Edit
                                </button>
                                <button className="delete-btn" onClick={() => handleDelete(artist.id)}>
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

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
                            <label htmlFor="date">Spotify Link</label>
                            <input
                                id="spotify_link"
                                name="spotify_link"
                                value={artistData.spotify_link}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="artistPicture">Artist Picture</label>
                            <input
                                type="file"
                                id="artistPicture"
                                name="artistPicture"
                                //onChange={handleFileChange}
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
