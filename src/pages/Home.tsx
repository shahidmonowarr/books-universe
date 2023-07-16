import { Link } from "react-router-dom";
import BookCard from "../components/BookCard";
import { Button } from "../components/ui/button";
import Footer from "../layout/Footer";
import { useGetBooksQuery } from "../redux/api/apiSlice";
import { IBook } from "../types/globalTypes";

export default function Home() {
  const { data } = useGetBooksQuery(undefined);

  const topBooks: IBook[] = data?.data
    ? data.data
        .slice()
        .sort(
          (bookA: IBook, bookB: IBook) =>
            new Date(bookB.publicationDate).getTime() -
            new Date(bookA.publicationDate).getTime()
        )
        .slice(0, 10)
    : [];

  return (
    <>
      <div className="flex items-center h-[calc(80vh-180px)] max-w-3xl mx-auto ">
        <div className="items-center justify-center text-center">
          <h1 className="mt-10 text-5xl mx-auto font-black uppercase text-primary">
            Welcome to Books Universe
          </h1>
          <Button className="mt-10" asChild>
            <Link to="/books">Brows all books</Link>
          </Button>
        </div>
      </div>
      <div className="  mx-10">
        <h2 className="text-2xl text-center font-semibold mt-10 mb-5">
          Top 10 Recently Added Books:
        </h2>
        <div className="grid grid-cols-4 gap-10 mb-5">
          {topBooks.map((book: IBook) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
