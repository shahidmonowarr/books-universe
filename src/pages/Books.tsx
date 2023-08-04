/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import { Input } from "../components/ui/input";
import { useGetBooksQuery } from "../redux/features/books/bookApi";
import {
  setGenre,
  setPublicationDate,
  setSearch,
} from "../redux/features/books/bookSlice";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { IBook } from "../types/globalTypes";

export default function Books() {
  const { data } = useGetBooksQuery(undefined);
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useAppDispatch();
  const { genre, publicationDate } = useAppSelector((state) => state.book);
  const genres: string[] = [
    ...new Set(
      data?.data?.data
        ?.map((book: IBook) => book.genre)
        .filter(
          (genre: null | undefined) => genre !== null && genre !== undefined
        )
    ),
  ] as string[];

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setGenre(event.target.value));
  };

  const handlePublicationDateChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(setPublicationDate(event.target.value));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(setSearch(searchInput));
  };

  useEffect(() => {
    dispatch(setGenre(""));
    dispatch(setPublicationDate(""));
    dispatch(setSearch(""));
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto relative">
      <div className="max-w-md mx-auto mt-5 mb-5 px-10">
        <form className="flex gap-5 items-center" onSubmit={handleSearchSubmit}>
          <Input
            className="min-h-[30px]"
            placeholder="Search for books"
            value={searchInput}
            onChange={handleSearchChange}
          />
        </form>
      </div>
      <div className="max-w-md mx-auto mt-5 mb-5 px-12">
        <div className="flex gap-5 items-center">
          <label htmlFor="genre">Genre:</label>
          <select
            id="genre"
            name="genre"
            value={genre}
            onChange={handleGenreChange}
          >
            <option value="">All</option>
            {genres.map((genre: string, index: number) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
        {genre && (
          <div className="flex gap-5 items-center mt-3">
            <label htmlFor="publicationDate">Publication Date:</label>
            <select
              id="publicationDate"
              name="publicationDate"
              value={publicationDate}
              onChange={handlePublicationDateChange}
            >
              <option value="">All</option>
              {data?.data?.data
                ?.filter((book: IBook) => book.genre === genre)
                .map((book: IBook, index: number) => (
                  <option key={index} value={book.publicationDate}>
                    {book.publicationDate}
                  </option>
                ))}
            </select>
          </div>
        )}
      </div>
      <div className="grid grid-cols-12 max-w-7xl mx-auto relative">
        <div className="col-span-12 grid grid-flow-row sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {data?.data?.data
            ?.filter((book: IBook) => {
              if (genre && !book.genre?.includes(genre)) {
                return false;
              }
              if (publicationDate && book.publicationDate !== publicationDate) {
                return false;
              }
              if (
                searchInput &&
                !(
                  book.title
                    ?.toLowerCase()
                    .includes(searchInput.toLowerCase()) ||
                  book.author
                    ?.toLowerCase()
                    .includes(searchInput.toLowerCase()) ||
                  book.genre?.toLowerCase().includes(searchInput.toLowerCase())
                )
              ) {
                return false;
              }
              return true;
            })
            .map((book: IBook) => (
              <BookCard key={book._id} book={book} />
            ))}
        </div>
      </div>
    </div>
  );
}
