import { useEffect } from "react";
import { HiBookOpen, HiCheckCircle, HiClock, HiSparkles } from "react-icons/hi";
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

  const getStatusIcon = (status: string | undefined) => {
    switch (status) {
      case "Finished":
        return <HiCheckCircle className="w-4 h-4 text-green-500" />;
      case "Reading":
        return <HiBookOpen className="w-4 h-4 text-blue-500" />;
      default:
        return <HiClock className="w-4 h-4 text-amber-500" />;
    }
  };

  const getStatusColor = (status: string | undefined) => {
    switch (status) {
      case "Finished":
        return "bg-green-50 text-green-700 border-green-200";
      case "Reading":
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="relative hover:bg-gray-100 transition-colors duration-200 rounded-full p-2"
        >
          <HiBookOpen size="24" className="text-gray-700" />
          {readListCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
              {readListCount}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-lg bg-white">
        <SheetHeader className="pb-6">
          <SheetTitle className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            <HiBookOpen className="w-6 h-6 text-blue-600" />
            Reading List
          </SheetTitle>
          <p className="text-sm text-gray-500 mt-1">
            {readListCount} {readListCount === 1 ? "book" : "books"} in your
            list
          </p>
        </SheetHeader>

        <div className="space-y-4 max-h-[calc(100vh-180px)] overflow-y-auto pr-2">
          {readLists?.length === 0 ? (
            <div className="text-center py-12">
              <HiBookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                Your reading list is empty
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Add some books to get started!
              </p>
            </div>
          ) : (
            readLists?.map((readList: IReadList) => (
              <div
                className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
                key={readList.bookId?.title}
              >
                <div className="flex gap-4">
                  {/* Book Cover */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-20 bg-gray-100 rounded-lg overflow-hidden shadow-sm">
                      <img
                        src={readList?.bookId.image_link}
                        alt={readList?.bookId.title}
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
                      {readList?.bookId.title}
                    </h3>
                    <p className="text-xs text-gray-500 mb-2">
                      {readList?.bookId.author}
                    </p>

                    {/* Status Badge */}
                    <div
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        readList?.status
                      )}`}
                    >
                      {getStatusIcon(readList?.status)}
                      {readList?.status || "To Read"}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex-shrink-0 flex items-center">
                    {readList?.status !== "Finished" ? (
                      <Button
                        size="sm"
                        onClick={() =>
                          markCompleted({
                            data: {
                              bookId: readList?.bookId?._id,
                              status: "Finished",
                            },
                          })
                        }
                        className="bg-green-600 hover:bg-green-700 text-white rounded-full p-2 h-8 w-8 shadow-sm transition-colors duration-200"
                      >
                        <HiCheckCircle className="w-4 h-4" />
                      </Button>
                    ) : (
                      <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                        <HiSparkles className="w-4 h-4 text-green-600" />
                      </div>
                    )}
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
