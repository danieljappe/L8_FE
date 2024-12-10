import React, { useState } from "react";
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
import ConfirmModal from "../../../components/ConfirmModal";

const DashboardArtist: React.FC = () => {
    const dispatch = useDispatch();
    const artists = useSelector((state: RootState) => state.artists.artists);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<React.ReactNode>(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [artistToDelete, setArtistToDelete] = useState<string | null>(null);

    useFetchArtists();
    useFetchEvents();

    const openEditModal = (artist: Artist) => {
        setModalContent(
            <EditArtist
                artist={artist}
                onClose={() => setIsModalOpen(false)}
            />
        );
        setIsModalOpen(true);
    };

    const openCreateModal = () => {
        setModalContent(
            <CreateArtist
                onClose={() => setIsModalOpen(false)}
            />
        );
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setModalContent(null);
        setIsModalOpen(false);
    };

    const openConfirmModal = (id: string) => {
        setArtistToDelete(id);
        setIsConfirmModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!artistToDelete) return;

        try {
            await apiService.deleteArtist(artistToDelete);
            dispatch(deleteArtist(artistToDelete));
        } catch (error) {
            console.error("Error deleting artist:", error);
        } finally {
            setIsConfirmModalOpen(false);
            setArtistToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setIsConfirmModalOpen(false);
        setArtistToDelete(null);
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
                            <div>Name</div>
                            <div>Description</div>
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
                                        {artist.description.length > 15
                                            ? `${artist.description.slice(0, 15)}...`
                                            : artist.description}
                                    </div>
                                    <button
                                        className="edit-btn"
                                        onClick={() => openEditModal(artist)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => openConfirmModal(artist.id)}
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
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                >
                    {modalContent}
                </motion.div>
            </Modal>
            <ConfirmModal
                isOpen={isConfirmModalOpen}
                message="Are you sure you want to delete this artist?"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </motion.div>
    );
};

export default DashboardArtist;
