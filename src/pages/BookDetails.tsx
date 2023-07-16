import { useParams } from "react-router-dom";
import BookReview from "../components/BookReview";
import { Button } from "../components/ui/button";
import { useSingleBookQuery } from "../redux/features/books/bookApi";

export default function BookDetails() {
  const { id } = useParams();

  const { data: book } = useSingleBookQuery(id);
  return (
    <>
      <div className="flex max-w-3xl mx-auto items-center border-b border-gray-300">
        <div className="w-[100%]">
          <img src={book?.image_link} alt="" />
        </div>
        <div className="w-[100%] space-y-3">
          <h1 className="text-4xl font-bold">{book?.title}</h1>
          <p className="text-xl">Author: {book?.author}</p>
          <p className="text-xl">Genre: {book?.genre}</p>
          <p className="text-xl">Publication Date: {book?.publicationDate}</p>
          <div>
            <Button className="me-2">Edit</Button>
            <Button>Delete</Button>
          </div>
        </div>
      </div>
      <BookReview id={id!} />
    </>
  );
}
