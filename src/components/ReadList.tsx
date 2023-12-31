import { useEffect } from "react";
import { HiBookOpen, HiCheckCircle } from "react-icons/hi";
import { toast } from "react-toastify";
import {
  useGetUserQuery,
  useMarkCompletedMutation,
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

interface IReadList {
  _id: string | undefined;
  bookId: {
    _id: string | undefined;
    image_link: string | undefined;
    title: string | undefined;
    author: string | undefined;
    genre: string | undefined;
    publicationDate: string | undefined;
  };
  status: string | undefined;
}

export default function ReadList() {
  const { data } = useGetUserQuery(undefined);
  const readLists = data?.data?.readlist;

  // Calculate the count of items in the readlist
  const readListCount = readLists?.length || 0;

  const [markCompleted, { isSuccess, isError, error, reset }] =
    useMarkCompletedMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Book marked as Finished");
      reset();
    } else if (isError) {
      toast.error((error as IError).data.message);
      reset();
    }
  }, [isSuccess, isError, error, reset]);

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost">
          <HiBookOpen size="30" />
          {readListCount > 0 && (
            <span className="ml-1 text-sm">{readListCount}</span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="relative overflow-auto">
        <SheetHeader>
          <SheetTitle className="underline text-lg from-neutral-900">
            Reading List
          </SheetTitle>
          {readLists?.map((readList: IReadList) => (
            <div
              className="border h-44 p-5 flex justify-between rounded-md"
              key={readList.bookId?.title}
            >
              <div className="border-r pr-5 shrink-0">
                <img
                  src={readList?.bookId.image_link}
                  alt=""
                  className="h-full"
                />
              </div>
              <div className="px-2 w-2/3 flex flex-col gap-3">
                <h1 className="text-base font-bold uppercase">
                  {readList?.bookId.title}
                </h1>
                <p>Status: {readList?.status}</p>
              </div>
              <div className="border-l pl-5 flex flex-col justify-between">
                {readList?.status !== "Finished" ? (
                  <Button
                    className="mb-2"
                    onClick={() =>
                      markCompleted({
                        data: {
                          bookId: readList?.bookId?._id,
                          status: "Finished",
                        },
                      })
                    }
                  >
                    <HiCheckCircle size="30" />
                  </Button>
                ) : (
                  <Button className=" mx-auto" variant="ghost" disabled={true}>
                    <HiCheckCircle size="30" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </SheetHeader>
        <div className="space-y-5"></div>
      </SheetContent>
    </Sheet>
  );
}
