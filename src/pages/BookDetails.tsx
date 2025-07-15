import { useEffect, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import { toast } from "react-toastify";
import BookReview from "../components/BookReview";
import DeleteConfirmationModal from "../components/DeleteConfirmationModel";
import { Button } from "../components/ui/button";
import {
  useDeleteBookMutation,
  useSingleBookQuery,
  useUpdateBookMutation,
} from "../redux/features/books/bookApi";
import { IError } from "../types/globalTypes";
import DetailsSkeleton from "../components/ui/skeleton/DetailsSkeleton";

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
    return <DetailsSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Book Image */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative group">
                <img
                  className="w-full max-w-md h-auto rounded-xl shadow-lg object-cover transition-transform duration-300 group-hover:scale-105"
                  src={book?.image_link}
                  alt={book?.title}
                />
                <div className="absolute inset-0 bg-black/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Book Info */}
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  {book?.title}
                </h1>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-500 w-24">
                      Author:
                    </span>
                    <span className="text-lg text-gray-900">
                      {book?.author}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-500 w-24">
                      Genre:
                    </span>
                    <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                      {book?.genre}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-500 w-24">
                      Published:
                    </span>
                    <span className="text-lg text-gray-900">
                      {book?.publicationDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => handleUpdate(id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Edit Book
                </Button>
                <Button
                  onClick={handleDeleteConfirmation}
                  variant="destructive"
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Delete Book
                </Button>
              </div>

              {/* PDF Viewer Toggle */}
              <div className="pt-4 border-t border-gray-200">
                {isBookOpen ? (
                  <Button
                    onClick={() => setIsBookOpen((prev) => !prev)}
                    variant="outline"
                    className="flex items-center gap-2 border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300"
                  >
                    <IoMdEyeOff className="w-5 h-5" />
                    Hide PDF
                  </Button>
                ) : (
                  <NavHashLink
                    to={`${location.pathname}/#bookPdfSection`}
                    onClick={() => setIsBookOpen((prev) => !prev)}
                  >
                    <Button className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white">
                      <IoMdEye className="w-5 h-5" />
                      View PDF
                    </Button>
                  </NavHashLink>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* PDF Viewer Section */}
        <div id="bookPdfSection" className="mt-8">
          {isBookOpen && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {book?.pdf_link ? (
                <>
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-6 bg-gray-50 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {book?.title} - PDF Reader
                    </h2>
                    <Button
                      onClick={() => setIsBookOpen((prev) => !prev)}
                      variant="outline"
                      className="flex items-center gap-2 border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300"
                    >
                      <IoMdEyeOff className="w-4 h-4" />
                      Hide PDF
                    </Button>
                  </div>
                  <div className="p-6">
                    <div className="w-full h-[80vh] border border-gray-300 rounded-lg overflow-hidden">
                      <iframe
                        src={book?.pdf_link}
                        width="100%"
                        height="100%"
                        className="border-none"
                        allow="autoplay"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-12 text-center">
                  <div className="max-w-sm mx-auto">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IoMdEyeOff className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No PDF Available
                    </h3>
                    <p className="text-gray-500">
                      This book doesn't have a PDF version available for
                      viewing.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Book Review Section */}
        <div className="mt-8">
          <BookReview id={id!} />
        </div>

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
          show={showDeleteModal}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
        />
      </div>
    </div>
  );
}
