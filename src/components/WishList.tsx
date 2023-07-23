import { useEffect } from "react";
import { HiHeart, HiOutlineTrash } from "react-icons/hi";
import { toast } from "react-toastify";
import {
  useGetUserQuery,
  useRemoveWishListMutation,
} from "../redux/features/user/userApi";
import { IError } from "../types/globalTypes";
import Loading from "./Loading";
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
  const { data, isLoading } = useGetUserQuery(undefined);
  const wishLists = data?.data?.wishlist;

  // Calculate the count of items in the wishlist
  const wishListCount = wishLists?.length || 0;

  const [removeWishlist, { isSuccess, isError, error, reset }] =
    useRemoveWishListMutation();

  useEffect(() => {
    if (isSuccess) {
      reset();
    } else if (isError) {
      toast.error((error as IError).data.message);
      reset();
    }
  }, [isSuccess, isError, error, reset]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost">
          <HiHeart size="30" />
          {wishListCount > 0 && (
            <span className="ml-1 text-sm">{wishListCount}</span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="relative overflow-auto">
        <SheetHeader>
          <SheetTitle className="underline text-lg from-neutral-900">
            Wish Lists:
          </SheetTitle>
          {wishLists?.map((wishList: IWishList) => (
            <div
              className="border h-44 p-5 flex justify-between rounded-md"
              key={wishList.title}
            >
              <div className="border-r pr-5 shrink-0">
                <img src={wishList?.image_link} alt="" className="h-full" />
              </div>
              <div className="px-2 w-full flex flex-col gap-3">
                <h1 className="text-lg font-bold uppercase">
                  {wishList?.title}
                </h1>
                <>Author: {wishList.author?.slice(0, 10)}</>
                <p>Genre: {wishList.genre}</p>
                <p>{wishList.publicationDate}</p>
              </div>
              <div className="border-l pl-5 flex flex-col justify-between">
                <Button
                  variant="destructive"
                  className="bg-red-500 hover:bg-red-400"
                  onClick={() =>
                    removeWishlist({ data: { bookId: wishList._id } })
                  }
                >
                  <HiOutlineTrash size="20" />
                </Button>
              </div>
            </div>
          ))}
        </SheetHeader>
        <div className="space-y-5"></div>
      </SheetContent>
    </Sheet>
  );
}
