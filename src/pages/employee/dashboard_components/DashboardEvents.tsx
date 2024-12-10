import React, { useState } from 'react';
import "../../../assets/styles/components/_dashboardEvents.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import CreateEvent from "../../../components/EventCRUD/CreateEvent";
import { deleteEvent, Event } from "../../../store/eventSlice";
import useFetchEvents from "../../../hooks/fetchEvents";
import EditEvent from "../../../components/EventCRUD/EditEvent";
import { motion } from "framer-motion";
import Modal from "../../../components/Modal";
import apiService from "../../../services/api";
import ConfirmModal from "../../../components/ConfirmModal";
import {deleteArtist} from "../../../store/artistSlice";

const DashboardEvents: React.FC = () => {
    const dispatch = useDispatch();
    const fetchEvents = useFetchEvents();
    const events = useSelector((state: RootState) => state.events.events); // Now includes artists
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<React.ReactNode>(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [eventToDelete, setEventToDelete] = useState<string | null>(null);


    useFetchEvents();

    const openEditModal = (event: Event) => {
        setModalContent(
            <EditEvent
                event={event}
                onClose={() => {
                    setIsModalOpen(false);
                    fetchEvents(); // Refetch events after modal closes
                }}
            />
        );
        setIsModalOpen(true);
    };

    const openCreateModal = () => {
        setModalContent(
            <CreateEvent onClose={() => setIsModalOpen(false)} />
        );
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setModalContent(null);
        setIsModalOpen(false);
    };

    const openConfirmModal = (id: string) => {
        setEventToDelete(id);
        setIsConfirmModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!eventToDelete) return;

        try {
            await apiService.deleteEvent(id);
            dispatch(deleteEvent(id));
        } catch (error) {
            console.error("Error deleting event:", error);
        } finally {
            setIsConfirmModalOpen(false)
            setEventToDelete(null)
        }
    };

    const handleConfirmDelete = async () => {
        if (!eventToDelete) return;

        try {
            await apiService.deleteEvent(eventToDelete);
            dispatch(deleteEvent(eventToDelete));
        } catch (error) {
            console.error("Error deleting event:", error);
        } finally {
            setIsConfirmModalOpen(false);
            setEventToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setIsConfirmModalOpen(false);
        setEventToDelete(null);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const childVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            className="container"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", type: "spring", bounce: 0.4 }}
        >
            <div className="eventslist">
                <div className="title-container">
                    <h1>All Events</h1>
                    <button className="create-event-btn" onClick={openCreateModal}>
                        Create Event
                    </button>
                </div>
                <section>
                    <div className="event-table">
                        <div className="event-table-header">
                            <div>Title</div>
                            <div>Date</div>
                            <div>Artists</div>
                            <div>Edit</div>
                            <div>Delete</div>
                        </div>
                        <motion.div
                            className="event-table"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {events.map((event) => (
                                <motion.div
                                    key={event.id}
                                    className="event-row"
                                    variants={childVariants}
                                >
                                    <div>{event.title}</div>
                                    <div>{new Date(event.date).toLocaleDateString()}</div>
                                    <div>
                                        <ul className="artist-list">
                                            {event.artists?.length > 0 ? (
                                                event.artists.map((artist) => (
                                                    <li key={artist.id}>{artist.name}</li>
                                                ))
                                            ) : (
                                                <li>No artists found</li>
                                            )}
                                        </ul>
                                    </div>
                                    <button
                                        className="edit-btn"
                                        onClick={() => openEditModal(event)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => openConfirmModal(event.id)}
                                    >
                                        Delete
                                    </button>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            </div>

            <Modal title="Event Details" isOpen={isModalOpen} onClose={closeModal}>
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
                message="Are you sure you want to delete this event?"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </motion.div>
    );
};

export default DashboardEvents;
