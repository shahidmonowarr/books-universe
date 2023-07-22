import { useFormik } from "formik";
import { useEffect } from "react";
import { FiSend } from "react-icons/fi";
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
  console.log(data);

  const reviews = data?.data?.reviews;
  console.log(reviews);

  const { token } = useAppSelector((state) => state.auth);

  const [
    reviewBook,
    {
      isSuccess: isReviewSuccess,
      isError: isReviewError,
      error: reviewError,
      reset: reviewReset,
      data: reviewData,
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
    <div className="max-w-3xl mx-auto mt-5">
      <form className="flex gap-5 items-center" onSubmit={formik.handleSubmit}>
        <Textarea
          className="min-h-[30px]"
          placeholder="Write a review..."
          name="review"
          onChange={formik.handleChange("review")}
          value={formik.values.review}
        />
        {formik.touched.review && formik.errors.review ? (
          <div className="text-sm text-red-600">{formik.errors.review}</div>
        ) : null}
        <Button
          type="submit"
          className="rounded-full h-10 w-10 p-2 text-[25px]"
        >
          <FiSend />
        </Button>
      </form>
      <div className="mt-10">
        {reviews.map((review: IReview) => (
          <div key={review._id} className="flex gap-5 mb-4 border-b">
            <div className="w-1/12">
              <img
                className="rounded-full pb-1"
                src="https://user-images.githubusercontent.com/522079/90506845-e8420580-e122-11ea-82ca-31087fc8486c.png"
                alt=""
              />
            </div>
            <div className="w-11/12 border-l-2 px-2">
              <h5 className="text-lg font-bold">{review.review}</h5>
              <p className="italic text-gray-400">
                - by {review.reviewerId.firstName} {review.reviewerId.lastName}{" "}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
