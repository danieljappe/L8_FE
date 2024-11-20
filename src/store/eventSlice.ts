import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    ticketPrice: number;
    eventPicture: string;
    published: number;
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
    },
});

export const { setEvents } = eventsSlice.actions;
export default eventsSlice.reducer;
