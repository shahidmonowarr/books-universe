import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IBookFilter {
  genre: string;
  publicationDate: string;
  search: string;
}

const initialState: IBookFilter = {
  genre: "",
  publicationDate: "",
  search: "",
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
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
});

export const { setGenre, setPublicationDate, setSearch } = bookSlice.actions;

export default bookSlice.reducer;
