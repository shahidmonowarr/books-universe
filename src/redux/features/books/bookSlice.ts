import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IBookFilter {
  genre: string;
  publicationDate: string;
  search: string;
  books: any;
}

const initialState: IBookFilter = {
  books: null,
  genre: "",
  publicationDate: "",
  search: "",
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    booksState: (state, action) => {
      state.books = action.payload.books;
    },
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

export const { booksState, setGenre, setPublicationDate, setSearch } =
  bookSlice.actions;

export default bookSlice.reducer;
