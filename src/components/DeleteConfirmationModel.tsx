import React from "react";

interface Props {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<Props> = ({
  show,
  onClose,
  onConfirm,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold">Delete Confirmation</h2>
        <p>Are you sure you want to delete this book?</p>
        <div className="flex justify-end mt-4">
          <button
            className="mr-2 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
            onClick={() => onConfirm()}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
