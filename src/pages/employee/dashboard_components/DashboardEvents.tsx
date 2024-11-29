import React, { useState } from 'react';
import "../../../assets/styles/components/_dashboardEvents.scss"
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store";
import CreateEvent from "../../../components/EventCRUD/CreateEvent";
import {deleteEvent, Artist} from "../../../store/eventSlice"
import apiService from "../../../services/api";
import useFetchEvents from "../../../hooks/fetchEvents";
import Modal from "../../../components/Modal";
import EditEvent from "../../../components/EventCRUD/EditEvent";


const DashboardEvents: React.FC = () => {
    const dispatch = useDispatch();
    const events = useSelector((state: RootState) => state.events.events);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<React.ReactNode>(null);

    useFetchEvents()

    const openEditModal = (event: Artist) => {
        setModalContent(
            <EditEvent
                event={event} // Pass the event to be edited
                onClose={() => {
                    setIsModalOpen(false); // Close the modal after editing
                }}
            />
        );
        setIsModalOpen(true);
    };

    const openCreateModal = () => {
        setModalContent(
            <CreateEvent
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
            await apiService.deleteEvent(id) // Call the API to delete the event
            dispatch(deleteEvent(id)); // Update the Redux store
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    };

    return (
        <div className="container">
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
                            <div>Location</div>
                            <div>Edit</div>
                            <div>Delete</div>
                        </div>
                        {events.map((event) => (
                            <div key={event.id} className="event-row">
                                <div>{event.title}</div>
                                <div>{new Date(event.date).toLocaleDateString()}</div>
                                <div>{event.location}</div>
                                <button className="edit-btn" onClick={() => openEditModal(event)}>
                                    Edit
                                </button>
                                <button className="delete-btn" onClick={() => handleDelete(event.id)}>
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

export default DashboardEvents;