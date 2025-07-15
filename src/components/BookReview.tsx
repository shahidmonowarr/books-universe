import { useFormik } from "formik";
import { useEffect } from "react";
import { FiSend, FiUser, FiMessageSquare, FiStar } from "react-icons/fi";
import { toast } from "react-toastify";
import * as Yup from "yup";
import {
  useReviewBookMutation,
  useSingleBookQuery,
} from "../redux/features/books/bookApi";
import { useAppSelector } from "../redux/hook";
import { IError } from "../types/globalTypes";
import Loading from "./Loading";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface IProps {
  id: string;
}

interface IReview {
  _id: string;
  review: string;
  reviewerId: {
    firstName: string;
    lastName: string;
  };
}

export default function BookReview({ id }: IProps) {
  const { data, isLoading } = useSingleBookQuery(id);

  const reviews = data?.data?.reviews;

  const { token } = useAppSelector((state) => state.auth);

  const [
    reviewBook,
    {
      isSuccess: isReviewSuccess,
      isError: isReviewError,
      error: reviewError,
      reset: reviewReset,
      data: reviewData,
      isLoading: isSubmitting,
    },
  ] = useReviewBookMutation();

  // review submit
  const formSchema = Yup.object().shape({
    review: Yup.string().required("Review is required"),
  });

  const formik = useFormik({
    initialValues: {
      review: "",
    },

    validationSchema: formSchema,

    onSubmit: (values, { resetForm }) => {
      if (token) {
        reviewBook({ id, data: values });
        resetForm();
      } else {
        toast.error(`Please login first`);
      }
    },
  });

  useEffect(() => {
    if (isReviewSuccess) {
      toast.success(`${reviewData?.message}`);
      reviewReset();
    } else if (isReviewError) {
      toast.error((reviewError as IError)?.data.message);
      reviewReset();
    }
  }, [isReviewSuccess, isReviewError, reviewError, reviewReset, reviewData]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-5xl mx-auto mt-8 px-4">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-slate-100 rounded-full">
            <FiMessageSquare className="text-slate-600 text-xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Reviews</h2>
          <div className="flex items-center gap-1 text-gray-500">
            <span className="text-sm">({reviews?.length || 0})</span>
          </div>
        </div>
      </div>

      {/* Review Form */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FiStar className="text-amber-500" />
          Share your thoughts
        </h3>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="relative">
            <Textarea
              className="min-h-[120px] resize-none border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 placeholder-gray-400"
              placeholder="Write your review... Share what you loved about this book, your favorite moments, or any insights you gained."
              name="review"
              onChange={formik.handleChange("review")}
              value={formik.values.review}
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-400">
              {formik.values.review.length}/500
            </div>
          </div>

          {formik.touched.review && formik.errors.review && (
            <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-lg">
              <div className="w-1 h-4 bg-red-500 rounded-full"></div>
              {formik.errors.review}
            </div>
          )}

          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              {!token
                ? "Please login to leave a review"
                : "Your review will be posted publicly"}
            </p>
            <Button
              type="submit"
              disabled={!formik.values.review.trim() || isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Posting...
                </>
              ) : (
                <>
                  <FiSend className="text-sm" />
                  Post Review
                </>
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews?.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <div className="p-4 bg-gray-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <FiMessageSquare className="text-gray-400 text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              No reviews yet
            </h3>
            <p className="text-gray-500">
              Be the first to share your thoughts about this book!
            </p>
          </div>
        ) : (
          reviews?.map((review: IReview, index: number) => (
            <div
              key={review._id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center shadow-md">
                      <FiUser className="text-white text-lg" />
                    </div>
                  </div>

                  {/* Review Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-3">
                      <h4 className="font-semibold text-gray-800">
                        {review.reviewerId.firstName}{" "}
                        {review.reviewerId.lastName}
                      </h4>
                      <span className="text-gray-400">•</span>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className="text-amber-400 text-sm fill-current"
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-gray-700 leading-relaxed mb-4">
                      {review.review}
                    </p>

                    {/* Review Footer */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Review #{index + 1}</span>
                      <div className="flex items-center gap-4">
                        {/* <button className="hover:text-blue-600 transition-colors">
                          Helpful
                        </button>
                        <button className="hover:text-blue-600 transition-colors">
                          Reply
                        </button> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
