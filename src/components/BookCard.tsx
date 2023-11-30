import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useAddReadListMutation,
  useAddWishListMutation,
} from "../redux/features/user/userApi";
import { IBook, IError } from "../types/globalTypes";
import { Button } from "./ui/button";

interface IProps {
  book: IBook;
}

export default function BookCard({ book }: IProps) {
  const [
    addWishList,
    {
      isSuccess: isWishListSuccess,
      data: wishListData,
      isError: isWishListError,
      error: wishListError,
      reset: wishListReset,
    },
  ] = useAddWishListMutation();

  const [
    addReadingList,
    {
      isSuccess: isReadingListSuccess,
      data: readingListData,
      isError: isReadingListError,
      error: readingListError,
      reset: readingListReset,
    },
  ] = useAddReadListMutation();

  useEffect(() => {
    if (isWishListSuccess) {
      toast.success(wishListData?.message);
      wishListReset();
    } else if (isWishListError) {
      toast.error((wishListError as IError)?.data?.message);
      wishListReset();
    }

    if (isReadingListSuccess) {
      toast.success(readingListData?.message);
      readingListReset();
    } else if (isReadingListError) {
      toast.error((readingListError as IError)?.data?.message);
      readingListReset();
    }
  }, [
    isWishListSuccess,
    isWishListError,
    wishListData,
    wishListError,
    wishListReset,
    isReadingListSuccess,
    isReadingListError,
    readingListData,
    readingListError,
    readingListReset,
  ]);

  return (
    <div>
      <div className="rounded-2xl m-5 h-[450px] flex flex-col items-start justify-between p-5 overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[102%] transition-all">
        <Link to={`/book-details/${book._id}`} className="w-full">
          <img
            className="h-52 mx-auto w-auto"
            src={book?.image_link}
            alt="book"
          />
          <h1 className="text-xl font-semibold">{book?.title}</h1>
        </Link>
        <p className="text-sm">Author: {book?.author}</p>
        <p className="text-sm">Genre: {book?.genre}</p>
        <p className="text-sm">Publication Date: {book?.publicationDate}</p>
        <div>
          <Button
            variant="default"
            className="mb-1 me-1"
            onClick={() => addWishList({ data: { bookId: book._id } })}
          >
            Wish list +
          </Button>
          <Button
            variant="default"
            onClick={() => addReadingList({ data: { bookId: book._id } })}
          >
            Reading list +
          </Button>
        </div>
      </div>
    </div>
  );
}
