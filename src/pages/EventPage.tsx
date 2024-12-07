import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import useFetchEvent from "../hooks/fetchEvent";
import '../assets/styles/pages/_eventpage.scss';
import BackButton from "../components/BackButton";

import stockImage from '../assets/files/event3.jpg';
import {useSelector} from "react-redux";
import {RootState} from "../store";

const EventPage: React.FC = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const { eventId } = useParams<{ eventId: string }>();
    const { event, loading, error } = useFetchEvent(eventId);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!event) {
        return <div>No event found</div>;
    }

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    const fadeInLeft = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
    };

    return (
        <motion.div
            className="event-page"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.header className="event-header" variants={fadeInLeft}>
                <BackButton className="back-button" />
                <motion.h1 className="event-title">{event.title}</motion.h1>
            </motion.header>

            <motion.section
                className="event-image-section"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <img src={stockImage} alt={event.title} className="event-picture" />
            </motion.section>

            <motion.section className="event-details" variants={fadeInUp}>
                <div className="event-info-group">
                    <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
                    <p><strong>Location:</strong> {event.location}</p>
                    <p><strong>Ticket Price:</strong> ${event.ticketPrice}</p>
                    <a><strong>Billet</strong></a>
                </div>
                <div className="description-box">
                    <p>{event.description}</p>
                </div>

                {token && (
                    <aside className="event-meta">
                        <h2 className="meta-title">Additional Info</h2>
                        <ul>
                            <li><strong>Event ID:</strong> {event.id}</li>
                            <li><strong>Published:</strong> {event.published ? 'Yes' : 'No'}</li>
                            <li><strong>Billetto Event ID:</strong> {event.billetto_eventId}</li>
                            <li><strong>Created At:</strong> {new Date(event.createdAt).toLocaleString()}</li>
                            <li><strong>Updated At:</strong> {new Date(event.updatedAt).toLocaleString()}</li>
                        </ul>
                    </aside>
                )}
            </motion.section>

        </motion.div>
    );
};

export default EventPage;
