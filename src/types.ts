// src/types.ts

export interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    ticketPrice: number;
    eventPicture: string;
    published: boolean;
    billetto_eventId: string;
}

export interface Artist{
    id: string;
    name: string;
    description: string;
    spotify_link: string;
    artistPicture: string;
}
