import BookCard from '../components/BookCard';
import { useGetBooksQuery } from '../redux/api/apiSlice';
import { IBook } from '../types/globalTypes';


export default function Books() {
  const { data } = useGetBooksQuery(undefined);
  //const { toast } = useToast();

  return (
    <div className="grid grid-cols-12 max-w-7xl mx-auto relative ">
      <div className="col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start sticky top-16 h-[calc(100vh-80px)]">
      </div>
      <div className="col-span-9 grid grid-cols-3 gap-10 pb-20">
        {data?.data?.map((book: IBook) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
}