import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import apiService from '../services/api';
import { setEvents } from '../store/eventSlice';

const useFetchEvents = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await apiService.getEvents();
                const sortedEvents = data.sort(
                    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
                );
                dispatch(setEvents(sortedEvents));
            } catch (error) {
                console.error('Failed to fetch events:', error);
            }
        };

        fetchEvents();
    }, [dispatch]);
};

export default useFetchEvents;
