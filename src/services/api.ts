import axios, { AxiosInstance } from 'axios';
import { Event, Artist } from '../types';

class ApiService {
    private api: AxiosInstance;

    constructor(baseURL: string) {
        this.api = axios.create({ baseURL });
    }

    // Event Routes
    async getEvents(): Promise<Event[]> {
        try {
            const response = await this.api.get('/events');
            return response.data;
        } catch (error) {
            console.error('Error fetching events:', error);
            throw error;
        }
    }

    async getEventById(id: string): Promise<Event> {
        try {
            const response = await this.api.get(`/events/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching event with ID ${id}:`, error);
            throw error;
        }
    }

    async createEvent(eventData: {
        title: string;
        description: string;
        date: string;
        location: string;
        ticketPrice: string;
        eventPicture: File | null;
        published: boolean;
        billetto_eventId: string
    }): Promise<Event> {
        try {
            const response = await this.api.post('/events', eventData);
            return response.data;
        } catch (error) {
            console.error('Error creating event:', error);
            throw error;
        }
    }

    async updateEvent(id: string, eventData: Partial<Event>): Promise<Event> {
        try {
            const response = await this.api.put(`/events/${id}`, eventData);
            return response.data;
        } catch (error) {
            console.error(`Error updating event with ID ${id}:`, error);
            throw error;
        }
    }

    async deleteEvent(id: string): Promise<void> {
        try {
            await this.api.delete(`/events/${id}`);
        } catch (error) {
            console.error(`Error deleting event with ID ${id}:`, error);
            throw error;
        }
    }

    // Artist Routes
    async getArtists(): Promise<any[]> {
        try {
            const response = await this.api.get('/artists');
            return response.data;
        } catch (error) {
            console.error('Error fetching artists:', error);
            throw error;
        }
    }

    async getArtistById(id: string): Promise<any> {
        try {
            const response = await this.api.get(`/artists/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching artist with ID ${id}:`, error);
            throw error;
        }
    }

    async createArtist(artistData: any): Promise<any> {
        try {
            const response = await this.api.post('/artists', artistData);
            return response.data;
        } catch (error) {
            console.error('Error creating artist:', error);
            throw error;
        }
    }

    async updateArtist(id: string, artistData: Partial<Artist>): Promise<Artist> {
        try {
            const response = await this.api.put(`/artists/${id}`, artistData);
            return response.data;
        } catch (error) {
            console.error(`Error updating artist with ID ${id}:`, error);
            throw error;
        }
    }

    async deleteArtist(id: string): Promise<void> {
        try {
            await this.api.delete(`/artists/${id}`);
        } catch (error) {
            console.error(`Error deleting artist with ID ${id}:`, error);
            throw error;
        }
    }

    // User Routes
    async getUsers(): Promise<any[]> {
        try {
            const response = await this.api.get('/users');
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }

    async deleteUser(id: string): Promise<void> {
        try {
            await this.api.delete(`/users/${id}`);
        } catch (error) {
            console.error(`Error deleting user with ID ${id}:`, error);
            throw error;
        }
    }

    async loginUser(credentials: { email: string; password: string }): Promise<any> {
        try {
            const response = await this.api.post('/users/login', credentials);
            return response.data;
        } catch (error) {
            console.error('Error logging in user:', error);
            throw error;
        }
    }

    async getDashboardData(): Promise<any> {
        try {
            const response = await this.api.get('/users/dashboard');
            return response.data;
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    }
}

const apiService = new ApiService('http://localhost:5000/api');
export default apiService;
