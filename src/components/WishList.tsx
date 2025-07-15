import { useEffect } from "react";
import { HiHeart, HiOutlineTrash, HiOutlineHeart } from "react-icons/hi";
import { toast } from "react-toastify";
import {
  useGetUserQuery,
  useRemoveWishListMutation,
} from "../redux/features/user/userApi";
import { IError } from "../types/globalTypes";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

interface IWishList {
  _id: string | undefined;
  title: string | undefined;
  image_link: string | undefined;
  genre: string | undefined;
  author: string | undefined;
  publicationDate: string | undefined;
}

export default function WishList() {
  const { data } = useGetUserQuery(undefined);
  const wishLists = data?.data?.wishlist;

  // Calculate the count of items in the wishlist
  const wishListCount = wishLists?.length || 0;

  const [removeWishlist, { isSuccess, isError, error, reset }] =
    useRemoveWishListMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Book removed from wishlist");
      reset();
    } else if (isError) {
      toast.error((error as IError).data.message);
      reset();
    }
  }, [isSuccess, isError, error, reset]);

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.getFullYear().toString();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="relative hover:bg-gray-100 transition-colors duration-200 rounded-full p-2"
        >
          <HiHeart size="24" className="text-rose-500" />
          {wishListCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
              {wishListCount}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-lg bg-white">
        <SheetHeader className="pb-6">
          <SheetTitle className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <HiHeart className="w-6 h-6 text-rose-500" />
            Wishlist
          </SheetTitle>
          <p className="text-sm text-gray-500 mt-1">
            {wishListCount} {wishListCount === 1 ? "book" : "books"} you want to
            read
          </p>
        </SheetHeader>

        <div className="space-y-4 max-h-[calc(100vh-180px)] overflow-y-auto pr-2">
          {wishLists?.length === 0 ? (
            <div className="text-center py-12">
              <HiOutlineHeart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Your wishlist is empty</p>
              <p className="text-gray-400 text-sm mt-1">
                Add books you'd like to read!
              </p>
            </div>
          ) : (
            wishLists?.map((wishList: IWishList) => (
              <div
                className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200 group"
                key={wishList._id}
              >
                <div className="flex gap-4">
                  {/* Book Cover */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-20 bg-gray-100 rounded-lg overflow-hidden shadow-sm">
                      <img
                        src={wishList?.image_link}
                        alt={wishList?.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA2NCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yOCAzMkgzNlYyNEgyOFYzMloiIGZpbGw9IiM5Q0E0QUYiLz4KPHBhdGggZD0iTTI0IDQ4SDQwVjQ0SDI0VjQ4WiIgZmlsbD0iIzlDQTRBRiIvPgo8L3N2Zz4K";
                        }}
                      />
                    </div>
                  </div>

                  {/* Book Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1 line-clamp-2">
                      {wishList?.title}
                    </h3>
                    <p className="text-xs text-gray-500 mb-1">
                      by {wishList?.author}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      {wishList?.genre && (
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          {wishList.genre}
                        </span>
                      )}
                      {wishList?.publicationDate && (
                        <span>{formatDate(wishList.publicationDate)}</span>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex-shrink-0 flex items-center">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        removeWishlist({ data: { bookId: wishList._id } })
                      }
                      className="hover:bg-red-50 hover:text-red-600 text-gray-400 rounded-full p-2 h-8 w-8 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                    >
                      <HiOutlineTrash className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
