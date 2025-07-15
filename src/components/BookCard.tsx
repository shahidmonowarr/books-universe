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
    <div className="group h-full">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col overflow-hidden">
        <Link to={`/book-details/${book._id}`} className="flex-1 flex flex-col">
          {/* Image Container */}
          <div className="relative p-6 pb-4 bg-gray-50 flex items-center justify-center min-h-[240px]">
            <img
              className="h-48 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              src={book?.image_link}
              alt={book?.title}
            />
          </div>

          {/* Content Container */}
          <div className="flex-1 p-6 pt-4 flex flex-col">
            <h1 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 leading-tight">
              {book?.title}
            </h1>

            <div className="flex-1 space-y-2 mb-4">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Author:</span> {book?.author}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Genre:</span> {book?.genre}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Published:</span>{" "}
                {book?.publicationDate}
              </p>
            </div>
          </div>
        </Link>

        {/* Action Buttons */}
        <div className="p-6 pt-0 flex flex-col gap-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-colors"
            onClick={() => addWishList({ data: { bookId: book._id } })}
          >
            Add to Wishlist
          </Button>
          <Button
            variant="default"
            size="sm"
            className="w-full bg-gray-900 hover:bg-gray-800 text-white transition-colors"
            onClick={() => addReadingList({ data: { bookId: book._id } })}
          >
            Add to Reading List
          </Button>
        </div>
      </div>
    </div>
  );
}
