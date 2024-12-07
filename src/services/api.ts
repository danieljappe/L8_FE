import axios, { AxiosInstance } from 'axios';
import { Event, Artist } from '../types';
import store from "../store";
import {selectToken} from "../store/authSlice";

class ApiService {
    private api: AxiosInstance;

    constructor(baseURL: string) {
        this.api = axios.create({ baseURL });

        // Attach Authorization token to every request
        this.api.interceptors.request.use((config) => {
            const token = selectToken(store.getState()); // Get the token from Redux

            if (config.headers?.requiresAuth) {
                if (!token) {
                    // If requiresAuth is true and token is missing, throw an error
                    return Promise.reject(new Error("No authentication token found."));
                }
                config.headers.Authorization = `Bearer ${token}`;
            }

            delete config.headers.requiresAuth; // Clean up custom header
            return config;
        });
    }

    // Event Routes
    async getAllEvents(): Promise<Event[]> {
        try {
            const response = await this.api.get('/events', {
                headers: { requiresAuth: false },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching events:', error);
            throw error;
        }
    }

    async getEventById(id: string): Promise<Event> {
        try {
            const response = await this.api.get(`/events/${id}`,{
                headers: { requiresAuth: false },
            });
            return response.data;
        } catch (error) {
            console.error(`Error fetching event with ID ${id}:`, error);
            throw error;
        }
    }

    async createEvent(eventData: {
        date: string;
        ticketPrice: string;
        eventPicture: File | null;
        description: string;
        location: string;
        published: boolean;
        title: string;
        billetto_eventId: string
    }): Promise<Event> {
        try {
            const response = await this.api.post('/events', eventData, {
                headers: { requiresAuth: true }
            });
            return response.data;
        } catch (error) {
            console.error('Error creating event:', error);
            throw error;
        }
    }

    async updateEvent(id: string, eventData: Partial<Event>): Promise<Event> {
        try {
            const response = await this.api.put(`/events/${id}`, eventData, {
                headers: { requiresAuth: true }
            });
            return response.data;
        } catch (error) {
            console.error(`Error updating event with ID ${id}:`, error);
            throw error;
        }
    }

    async deleteEvent(id: string): Promise<void> {
        try {
            await this.api.delete(`/events/${id}`, {
                headers: { requiresAuth: true }
            });
        } catch (error) {
            console.error(`Error deleting event with ID ${id}:`, error);
            throw error;
        }
    }

    // Artist Routes
    async getArtists(): Promise<any[]> {
        try {
            const response = await this.api.get('/artists', {
                headers: { requiresAuth: true }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching artists:', error);
            throw error;
        }
    }

    async getArtistById(id: string): Promise<any> {
        try {
            const response = await this.api.get(`/artists/${id}`, {
                headers: { requiresAuth: false }
            });
            return response.data;
        } catch (error) {
            console.error(`Error fetching artist with ID ${id}:`, error);
            throw error;
        }
    }

    async createArtist(artistData: any): Promise<any> {
        try {
            const response = await this.api.post('/artists', artistData, {
                headers: { requiresAuth: true }
            });
            return response.data;
        } catch (error) {
            console.error('Error creating artist:', error);
            throw error;
        }
    }

    async updateArtist(id: string, artistData: Partial<Artist>): Promise<Artist> {
        try {
            const response = await this.api.put(`/artists/${id}`, artistData, {
                headers: { requiresAuth: true }
            });
            return response.data;
        } catch (error) {
            console.error(`Error updating artist with ID ${id}:`, error);
            throw error;
        }
    }

    async deleteArtist(id: string): Promise<void> {
        try {
            await this.api.delete(`/artists/${id}`, {
                headers: { requiresAuth: true }
            });
        } catch (error) {
            console.error(`Error deleting artist with ID ${id}:`, error);
            throw error;
        }
    }

    async getArtistsByEvent(eventId: string): Promise<Artist[]> {
        try {
            const response = await this.api.get(`/events/${eventId}/artists`, {
                headers: { requiresAuth: false }
            });
            return response.data; // Ensure this returns an array of artists
        } catch (error) {
            console.error(`Error fetching artists for event ${eventId}:`, error);
            throw error;
        }
    }

    async addArtistsToEvent(eventId: string, artistIds: string[]): Promise<void> {
        try {
            const response = await this.api.post('/events/addArtist', {
                eventId,
                artistIds, // Send an array of artist IDs
            },
            {
                headers: { requiresAuth: true }
            });
            return response.data;
        } catch (error) {
            console.error(`Error adding artists to event ${eventId}:`, error);
            throw error;
        }
    }


    // User Routes
    async getUsers(): Promise<any[]> {
        try {
            const response = await this.api.get('/users', {
                headers: { requiresAuth: true }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }

    async deleteUser(id: string): Promise<void> {
        try {
            await this.api.delete(`/users/${id}`, {
                headers: { requiresAuth: true }
            });
        } catch (error) {
            console.error(`Error deleting user with ID ${id}:`, error);
            throw error;
        }
    }

    async loginUser(credentials: { email: string; password: string }): Promise<any> {
        try {
            const response = await this.api.post('/users/login', credentials,{
                headers: { requiresAuth: false }
            });
            return response.data;
        } catch (error) {
            console.error('Error logging in user:', error);
            throw error;
        }
    }

    async getDashboardData(): Promise<any> {
        try {
            const response = await this.api.get('/users/dashboard',{
                headers: { requiresAuth: true }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    }
}

const apiService = new ApiService('http://localhost:5000/api');
export default apiService;
