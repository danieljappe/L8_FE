import { useState, useEffect } from 'react';

const useFetchEvent = (eventId: string | undefined) => {
    const [event, setEvent] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!eventId) {
            setError('No event ID provided');
            setLoading(false);
            return;
        }

        const fetchEventDetails = async () => {
            try {
                const response = await fetch(`/api/events/${eventId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch event details');
                }
                const data = await response.json();
                setEvent(data);
                setError(null);
            } catch (err) {
                setError((err as Error).message);
                setEvent(null);
            } finally {
                setLoading(false);
            }
        };

        fetchEventDetails();
    }, [eventId]);

    return { event, loading, error };
};

export default useFetchEvent;
