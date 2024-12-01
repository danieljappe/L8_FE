import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import apiService from '../services/api';
import { setArtists } from '../store/artistSlice';

const useFetchArtists = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const data = await apiService.getArtists();
                dispatch(setArtists(data));
            } catch (error) {
                console.error('Failed to fetch events:', error);
            }
        };

        fetchArtists();
    }, [dispatch]);
};

export default useFetchArtists;
