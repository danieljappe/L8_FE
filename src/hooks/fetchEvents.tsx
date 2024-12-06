import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import apiService from '../services/api';
import { setEvents } from '../store/eventSlice';

const useFetchEvents = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchEventsWithArtists = async () => {
            try {
                const events = await apiService.getEvents();
                const sortedEvents = events.sort(
                    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
                );

                // Fetch artists for each event
                const eventsWithArtists = await Promise.all(
                    sortedEvents.map(async (event) => {
                        try {
                            const artists = await apiService.getArtistsByEvent(event.id);
                            return { ...event, artists };
                        } catch (error) {
                            console.error(`Failed to fetch artists for event ${event.id}:`, error);
                            return { ...event, artists: [] }; // Graceful fallback
                        }
                    })
                );

                dispatch(setEvents(eventsWithArtists));
            } catch (error) {
                console.error('Failed to fetch events:', error);
            }
        };

        fetchEventsWithArtists();
    }, [dispatch]);
};

export default useFetchEvents;
