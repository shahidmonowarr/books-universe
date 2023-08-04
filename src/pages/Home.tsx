import BookCard from "../components/BookCard";
import Hero from "../components/Hero";
import Loading from "../components/Loading";
import NewsLetter from "../components/NewsLetter";
import Footer from "../layout/Footer";
import { useGetBooksQuery } from "../redux/features/books/bookApi";
import { IBook } from "../types/globalTypes";

export default function Home() {
  const { data, isLoading } = useGetBooksQuery(undefined);

  const topBooks: IBook[] = data?.data?.data
    ? data.data?.data
        .slice()
        .sort(
          (bookA: IBook, bookB: IBook) =>
            new Date(bookB.publicationDate).getTime() -
            new Date(bookA.publicationDate).getTime()
        )
        .slice(0, 10)
    : [];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Hero />
      {/* <div className="flex items-center h-[calc(80vh-180px)] max-w-3xl mx-auto ">
        <div className="items-center justify-center text-center">
          <h1 className="mt-10 text-5xl mx-auto font-black uppercase text-primary">
            Welcome to Books Universe
          </h1>
          <Button className="mt-10" asChild>
            <Link to="/books">Brows all books</Link>
          </Button>
        </div>
      </div> */}
      <div className="max-w-7xl mx-auto relative">
        <h2 className="text-2xl text-center font-semibold mt-10 mb-5">
          Top 10 Recently Added Books:
        </h2>
        <div className="grid grid-cols-4 gap-10 mb-5">
          {topBooks.map((book: IBook) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      </div>
      <NewsLetter />
      <Footer />
    </div>
  );
}
