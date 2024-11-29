import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Artist {
    id: string;
    name: string;
    description: string;
    spotify_link: string;
}

interface ArtistsState {
    artists: Artist[];
}

const initialState: ArtistsState = {
    artists: [],
};

const artistsSlice = createSlice({
    name: 'artists',
    initialState,
    reducers: {
        setArtists(state, action: PayloadAction<Artist[]>) {
            state.artists = action.payload;
        },
        deleteArtist(state, action: PayloadAction<string>) {
            state.artists = state.artists.filter(artist => artist.id !== action.payload)
        }
    },
});

export const { setArtists, deleteArtist } = artistsSlice.actions;
export default artistsSlice.reducer;
