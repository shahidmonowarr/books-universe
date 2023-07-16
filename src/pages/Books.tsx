import { FiSearch } from "react-icons/fi";
import BookCard from "../components/BookCard";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useGetBooksQuery } from "../redux/api/apiSlice";
import { IBook } from "../types/globalTypes";

export default function Books() {
  const { data } = useGetBooksQuery(undefined);
  //const { toast } = useToast();

  return (
    <div className="max-w-7xl mx-auto relative ">
      <div className="max-w-2xl mx-auto mt-5 mb-5">
        <form className="flex gap-5 items-center">
          <Input className="min-h-[30px]" placeholder="Search for books" />
          <Button
            type="submit"
            className="rounded-full h-10 w-10 p-2 text-[25px]"
          >
            <FiSearch />
          </Button>
        </form>
      </div>
      <div className="grid grid-cols-12 max-w-7xl mx-auto relative ">
        <div className="col-span-12 grid grid-cols-4 gap-10 pb-20">
          {data?.data?.map((book: IBook) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
}
