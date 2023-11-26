/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookCard from "../components/BookCard";
import { Input } from "../components/ui/input";
import Skeletons from "../components/ui/skeleton/Skeletons";
import { useGetBooksQuery } from "../redux/features/books/bookApi";
import {
  setGenre,
  setPublicationDate,
  setSearch,
} from "../redux/features/books/bookSlice";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { IBook } from "../types/globalTypes";

export default function Books() {
  const navigate = useNavigate();
  const { data, isLoading } = useGetBooksQuery(undefined);
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
    <div className="relative mx-auto max-w-7xl">
      <div className="max-w-md px-2 mx-auto mt-5">
        <form className="flex items-center gap-5" onSubmit={handleSearchSubmit}>
          <Input
            placeholder="Search for books"
            value={searchInput}
            onChange={handleSearchChange}
            className="min-h-[30px] border border-[#000]"
          />
        </form>
      </div>
      <div className="max-w-md px-2 mx-auto mt-2 mb-5">
        <button
          className={[
            "px-3 mb-2 me-2 rounded-md text-lg text-[#000] border border-[#000] text-center hover:bg-[#000] hover:text-white ",
          ].join(" ")}
          onClick={() => {
            setSearchInput("");
            dispatch(setGenre(""));
            dispatch(setPublicationDate(""));
            dispatch(setSearch(""));
            navigate(`/books`);
          }}
        >
          All
        </button>
        <select
          id="genre"
          name="genre"
          value={genre}
          onChange={handleGenreChange}
          className="px-3 mb-2 me-2 rounded-md text-lg text-[#000] border border-[#000] text-center hover:bg-[#000] hover:text-white "
        >
          <option value="">Genre</option>
          {genres.map((genre: string, index: number) => (
            <option key={index} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        {genre && (
          <select
            id="publicationDate"
            name="publicationDate"
            value={publicationDate}
            onChange={handlePublicationDateChange}
            className="px-3 mb-2 rounded-md text-lg text-[#000] border border-[#000] text-center hover:bg-[#000] hover:text-white "
          >
            <option value="">Publish Date</option>
            {data?.data?.data
              ?.filter((book: IBook) => book.genre === genre)
              .map((book: IBook, index: number) => (
                <option key={index} value={book.publicationDate}>
                  {book.publicationDate}
                </option>
              ))}
          </select>
        )}
      </div>
      {isLoading ? (
        <Skeletons />
      ) : (
        <div className="relative grid grid-cols-12 mx-auto max-w-7xl">
          <div className="grid grid-flow-row col-span-12 gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data?.data?.data
              ?.filter((book: IBook) => {
                if (genre && !book.genre?.includes(genre)) {
                  return false;
                }
                if (
                  publicationDate &&
                  book.publicationDate !== publicationDate
                ) {
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
                    book.genre
                      ?.toLowerCase()
                      .includes(searchInput.toLowerCase())
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
      )}
    </div>
  );
}
