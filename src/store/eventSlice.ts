import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

interface EventsState {
    events: Event[];
}

const initialState: EventsState = {
    events: [],
};

const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        setEvents(state, action: PayloadAction<Event[]>) {
            state.events = action.payload;
        },
        deleteEvent(state, action: PayloadAction<string>) {
            state.events = state.events.filter(event => event.id !== action.payload)
        }
    },
});

export const { setEvents, deleteEvent } = eventsSlice.actions;
export default eventsSlice.reducer;
