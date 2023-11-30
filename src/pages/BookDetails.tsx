import { useEffect, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import { toast } from "react-toastify";
import BookReview from "../components/BookReview";
import DeleteConfirmationModal from "../components/DeleteConfirmationModel";
import { Button } from "../components/ui/button";
import HeroSkeleton from "../components/ui/skeleton/HeroSkeleton";
import {
  useDeleteBookMutation,
  useSingleBookQuery,
  useUpdateBookMutation,
} from "../redux/features/books/bookApi";
import { IError } from "../types/globalTypes";

export default function BookDetails() {
  const { id } = useParams();

  const { data, isLoading } = useSingleBookQuery(id);
  const book = data?.data;
  const navigate = useNavigate();
  const location = useLocation();
  const [isBookOpen, setIsBookOpen] = useState<boolean>(false);

  const [
    updateBook,
    {
      isSuccess: isUpdateSuccess,
      isError: isUpdateError,
      error: updateError,
      reset: updateReset,
    },
  ] = useUpdateBookMutation();
  const [
    deleteBook,
    {
      isSuccess: isDeleteSuccess,
      isError: isDeleteError,
      error: deleteError,
      reset: deleteReset,
    },
  ] = useDeleteBookMutation();

  const handleUpdate = (id: string | undefined) => {
    updateBook({ id });
  };

  const handleDelete = (id: string | undefined) => {
    deleteBook(id);
  };

  useEffect(() => {
    // for update
    if (isUpdateSuccess) {
      updateReset();
      navigate(`/edit-book/${id}`);
    } else if (isUpdateError) {
      toast.error((updateError as IError)?.data.message);
      updateReset();
    }

    // for delete
    if (isDeleteSuccess) {
      toast.success("Book deleted successfully");
      deleteReset();
      navigate("/books", { replace: true });
    } else if (isDeleteError) {
      toast.error((deleteError as IError)?.data.message);
      deleteReset();
    }
  }, [
    isUpdateSuccess,
    isUpdateError,
    updateError,
    updateReset,
    isDeleteSuccess,
    isDeleteError,
    deleteError,
    deleteReset,
    navigate,
    id,
  ]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteConfirmation = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteConfirm = () => {
    handleDelete(id);
    setShowDeleteModal(false);
  };

  if (isLoading) {
    return <HeroSkeleton />;
  }

  return (
    <div className="container px-5 py-10 mx-auto">
      <div className="grid grid-flow-row col-span-12 gap-5 border-b border-gray-300 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        <div className="flex flex-wrap items-center justify-center max-w-xl mx-auto ">
          <div className="my-2 me-3">
            <img
              className="object-cover object-center w-full rounded h-96"
              src={book?.image_link}
              alt={book?.title}
            />
          </div>
        </div>
        <div className="flex flex-col items-start w-full py-5 mb-5">
          <h2 className="text-3xl font-bold">{book?.title}</h2>
          <p className="text-xl">Author: {book?.author}</p>
          <p className="text-xl">Genre: {book?.genre}</p>
          <p className="text-xl">Publication Date: {book?.publicationDate}</p>
          <div>
            <Button className="me-2" onClick={() => handleUpdate(id)}>
              Edit
            </Button>
            <label
              htmlFor="deleteModal"
              className="duration-300 h-10 py-2.5 px-4 rounded-md text-sm font-medium cursor-pointer text-white bg-red-500 hover:bg-red-600"
              onClick={handleDeleteConfirmation}
            >
              Delete
            </label>
            <div className="flex gap-2 mt-3">
              {isBookOpen ? (
                <Button
                  className="bg-red-500 hover:bg-red-600"
                  onClick={() => setIsBookOpen((prev) => !prev)}
                >
                  <IoMdEyeOff className="text-lg me-1 " />
                  Hide Pdf
                </Button>
              ) : (
                <NavHashLink
                  to={`${location.pathname}/#bookPdfSection`}
                  onClick={() => setIsBookOpen((prev) => !prev)}
                >
                  <Button className="">
                    <IoMdEye className="text-lg me-1" />
                    View Pdf
                  </Button>
                </NavHashLink>
              )}
            </div>
          </div>
        </div>
      </div>
      <div id="bookPdfSection" className="w-full h-full flex justify-center">
        <div className="w-full">
          <div>
            {isBookOpen && (
              <>
                {book?.pdf_link ? (
                  <>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-2 my-10 ">
                      <h2 className="text-xl font-bold text-center">
                        {book?.title} Book's PDF
                      </h2>
                      <Button
                        className="bg-red-500 hover:bg-red-600"
                        onClick={() => setIsBookOpen((prev) => !prev)}
                      >
                        <IoMdEyeOff className="text-lg me-1" />
                        Hide Pdf
                      </Button>
                    </div>
                    <div className=" min-w-[100%] lg:w-[700px] h-[90vh] border-[15px]  ">
                      <iframe
                        src={book?.pdf_link}
                        width="100%"
                        height="100%"
                        allow="autoplay"
                      ></iframe>
                    </div>
                  </>
                ) : (
                  <div className="text-center my-10">
                    <h2 className="font-bold">[No PDF Available]</h2>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <BookReview id={id!} />
      <DeleteConfirmationModal
        show={showDeleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
