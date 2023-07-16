import { Link } from "react-router-dom";
import { IBook } from "../types/globalTypes";
import { Button } from "./ui/button";

interface IProps {
  book: IBook;
}

export default function bookCard({ book }: IProps) {
  return (
    <div>
      <div className="rounded-2xl h-[480px] flex flex-col items-start justify-between p-5 overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[102%] transition-all gap-2">
        <Link to={`/book-details/${book._id}`} className="w-full">
          <img className="h-52 w-auto" src={book?.image_link} alt="book" />
          <h1 className="text-xl font-semibold">{book?.title}</h1>
        </Link>
        <p className="text-sm">Author: {book?.author}</p>
        <p className="text-sm">Genre: {book?.genre}</p>
        <p className="text-sm">Publication Date: {book?.publicationDate}</p>
        <div>
          <Button variant="default" className="mb-1">
            Add to wishlist
          </Button>
          <Button variant="default">Add to reading list</Button>
        </div>
      </div>
    </div>
  );
}
