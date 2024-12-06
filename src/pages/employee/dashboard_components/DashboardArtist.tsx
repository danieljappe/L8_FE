import React, { useState, useEffect } from "react";
import "../../../assets/styles/components/_createArtist.scss";
import "../../../assets/styles/components/_dashboardArtist.scss";
import useFetchArtists from "../../../hooks/fetchArtists";
import { Artist } from "../../../store/artistSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import apiService from "../../../services/api";
import { deleteArtist } from "../../../store/artistSlice";
import EditArtist from "../../../components/ArtistCRUD/EditArtist";
import CreateArtist from "../../../components/ArtistCRUD/CreateArtist";
import Modal from "../../../components/Modal";
import { motion } from "framer-motion";
import useFetchEvents from "../../../hooks/fetchEvents";

const DashboardArtist: React.FC = () => {
    const dispatch = useDispatch();
    const artists = useSelector((state: RootState) => state.artists.artists);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<React.ReactNode>(null);
    const events = useSelector((state: RootState) => state.events.events); // Access events
    const [selectedEvent, setSelectedEvent] = useState<string | null>(null); // Track selected event

    useFetchArtists();

    useFetchEvents();

    const handleEventChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedEvent(event.target.value);
        console.log('Selected event ID:', event.target.value);
    };

    const openEditModal = (artist: Artist) => {
        setModalContent(
            <EditArtist
                artist={artist}
                onClose={() => {
                    setIsModalOpen(false);
                }}
            />
        );
        setIsModalOpen(true);
    };

    const openCreateModal = () => {
        setModalContent(
            <CreateArtist
                onClose={() => {
                    setIsModalOpen(false);
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
            await apiService.deleteArtist(id);
            dispatch(deleteArtist(id));
        } catch (error) {
            console.error("Error deleting artist:", error);
        }
    };

    const handleEventSelect = (eventId: string, artistId: string) => {
        setSelectedEvent(eventId);
        console.log(`Artist ${artistId} assigned to Event ${eventId}`);
        // You can make an API call here to assign the artist to the event
    };

    return (
        <motion.div
            className="create-artist-container"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", type: "spring", bounce: 0.4 }}
        >
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
                            <div>Description</div>
                            <div>Assign to Event</div>
                            <div>Edit</div>
                            <div>Delete</div>
                        </div>
                        <motion.div
                            className="event-table"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            {artists.map((artist) => (
                                <motion.div
                                    key={artist.id}
                                    className="artist-row"
                                >
                                    <div>{artist.name}</div>
                                    <div>
                                        {artist.description.length > 10
                                            ? `${artist.description.slice(0, 15)}...`
                                            : artist.description}
                                    </div>
                                    <div className="dashboard-artist">
                                        <div className="artist-select-container">
                                            <select
                                                id="event-select"
                                                value={selectedEvent || ''}
                                                onChange={handleEventChange}
                                            >
                                                <option value="" disabled>
                                                    -- Select an Event --
                                                </option>
                                                {events.map((event) => (
                                                    <option key={event.id} value={event.id}>
                                                        {event.title} ({new Date(event.date).toLocaleDateString()})
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <button
                                        className="edit-btn"
                                        onClick={() => openEditModal(artist)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(artist.id)}
                                    >
                                        Delete
                                    </button>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            </div>
            <Modal title="Artist Details" isOpen={isModalOpen} onClose={closeModal}>
                <motion.div
                    initial={{opacity: 0, scale: 0.8}}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                >
                    {modalContent}
                </motion.div>
            </Modal>
        </motion.div>
    );
};

export default DashboardArtist;
