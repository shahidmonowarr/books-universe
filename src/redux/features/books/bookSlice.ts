import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IBookFilter {
  genre: string;
  publicationDate: string;
}

const initialState: IBookFilter = {
  genre: "",
  publicationDate: "",
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setGenre: (state, action: PayloadAction<string>) => {
      state.genre = action.payload;
    },
    setPublicationDate: (state, action: PayloadAction<string>) => {
      state.publicationDate = action.payload;
    },
  },
});

export const { setGenre, setPublicationDate } = bookSlice.actions;

export default bookSlice.reducer;
