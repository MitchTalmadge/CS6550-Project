import { IEpisode } from "@/models/episode";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface RootState {
  favoriteEpisodes: IEpisode[];
}

const initialState: RootState = {
  favoriteEpisodes: [],
};

export const rootSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    setFavoriteEpisode: (state, action: PayloadAction<{ episode: IEpisode, favorite: boolean }>) => {
      const { episode, favorite } = action.payload;
      if (favorite) {
        state.favoriteEpisodes.push(episode);
      } else {
        state.favoriteEpisodes = state.favoriteEpisodes.filter(e => !(e.id === episode.id && e.season === episode.season));
      }
    }
  }
});