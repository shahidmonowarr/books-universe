import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
