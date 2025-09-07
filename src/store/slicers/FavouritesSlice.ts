import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IFavourites {
  favouriteId: string[];
}

const initialState: IFavourites = {
  favouriteId: [],
};

const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    updateFavourite(state, action: PayloadAction<string>) {
      state.favouriteId.push(action.payload);
    },
    removeFavourite(state, action: PayloadAction<string>) {
      state.favouriteId = state.favouriteId.filter((id) => id !== action.payload);
    },
    resetFavourites(state) {
      state.favouriteId = initialState.favouriteId;
    },
  },
});

export const { updateFavourite, removeFavourite, resetFavourites } = favouritesSlice.actions;
export default favouritesSlice.reducer;
