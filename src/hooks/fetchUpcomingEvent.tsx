import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Event } from '../store/eventSlice';

const useUpcomingEvent = (): Event | null => {
    const events = useSelector((state: RootState) => state.events.events);

    const upcomingEvent = useMemo(() => {
        const now = new Date().getTime();
        return events.find(event => event.date && new Date(event.date).getTime() > now) || null;
    }, [events]);

    return upcomingEvent;
};

export default useUpcomingEvent;
