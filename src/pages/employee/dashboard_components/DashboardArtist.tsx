import React, {useState} from 'react';
import "../../../assets/styles/components/_createArtist.scss"
import "../../../assets/styles/components/_dashboardArtist.scss"
import useFetchArtists from "../../../hooks/fetchArtists";
import {Artist} from "../../../store/artistSlice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store";
import apiService from "../../../services/api";
import {deleteArtist} from "../../../store/artistSlice"
import EditArtist from "../../../components/ArtistCRUD/EditArtist";
import CreateArtist from "../../../components/ArtistCRUD/CreateArtist";
import Modal from "../../../components/Modal";

const DashboardArtist: React.FC = () => {
    const dispatch = useDispatch();
    const artists = useSelector((state: RootState) => state.artists.artists);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<React.ReactNode>(null);

    useFetchArtists()

    const openEditModal = (artist: Artist) => {
        setModalContent(
            <EditArtist
                artist={artist} // Pass the artist to be edited
                onClose={() => {
                    setIsModalOpen(false); // Close the modal after editing
                }}
            />
        );
        setIsModalOpen(true);
    };

    const openCreateModal = () => {
        setModalContent(
            <CreateArtist
                onClose={() => {
                    setIsModalOpen(false); // Close the modal
                }}
            />
        );
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setModalContent(null);
        setIsModalOpen(false);
    };

    const handleDelete = async (id: string) => {
        try {
            await apiService.deleteArtist(id) // Call the API to delete the artist
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
                            <div>Descripton</div>
                            <div>Location</div>
                            <div>Edit</div>
                            <div>Delete</div>
                        </div>
                        {artists.map((artist: Artist) => (
                            <div key={artist.id} className="artist-row">
                                <div>{artist.name}</div>
                                <div>
                                    {artist.description.length > 10
                                        ? `${artist.description.slice(0, 15)}...`
                                        : artist.description}
                                </div>
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
            <Modal title="Event Details" isOpen={isModalOpen} onClose={closeModal}>
                {modalContent}
            </Modal>
        </div>
    );
};

export default DashboardArtist;
