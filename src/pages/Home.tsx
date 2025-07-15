import BookCard from "../components/BookCard";
import Hero from "../components/Hero";
import NewsLetter from "../components/NewsLetter";
import HomeSkeletons from "../components/ui/skeleton/HomeSkeleton";
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
    return <HomeSkeletons />;
  }

  return (
    <div>
      <Hero />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mt-10 mb-5 text-2xl font-semibold text-center">
          Top 10 Recently Added Books:
        </h2>
        <div className="grid grid-flow-row gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
