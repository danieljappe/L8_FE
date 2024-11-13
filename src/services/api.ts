// src/services/api.ts
import { Event } from '../types';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

export const getEvents = async (): Promise<Event[]> => {
    try {
        const response = await api.get('/events');
        return response.data;
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
    }
};