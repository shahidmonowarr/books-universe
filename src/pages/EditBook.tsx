import { useFormik } from "formik";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import Loading from "../components/Loading";
import { fileUploader } from "../helpers/fileUploader";
import {
  useSingleBookQuery,
  useUpdateBookMutation,
} from "../redux/features/books/bookApi";
import { IError } from "../types/globalTypes";

export default function EditBook() {
  const { id } = useParams();
  let bookData:
    | {
        data: {
          title: string;
          image_link: string;
          pdf_link: string;
          author: string;
          genre: string;
          publicationDate: string;
        };
      }
    | undefined = undefined;

  let bookLoading: boolean | undefined = undefined;

  if (id) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, isLoading } = useSingleBookQuery(id);
    bookData = data;
    bookLoading = isLoading;
  }

  const [
    updateBook,
    {
      isSuccess: isUpdateSuccess,
      isError: isUpdateError,
      error: updateError,
      reset: updateReset,
    },
  ] = useUpdateBookMutation();

  const formSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    author: Yup.string().required("Author name is required"),
    genre: Yup.string().required("Genre is required"),
    publicationDate: Yup.string().required("Publication date is required"),
    image_link: Yup.string().required("Image link is required"),
    pdf_link: Yup.string().optional(),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      image_link: "",
      pdf_link: "",
      author: "",
      genre: "",
      publicationDate: "",
    },

    validationSchema: formSchema,

    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData();
        formData.append("file", values.image_link);

        // call file uploader to upload selected file
        const imageUrl = await fileUploader(formData);

        if (imageUrl) {
          values.image_link = imageUrl;
        } else {
          toast.error("Image Upload Failed");

          return;
        }

        if (id) {
          updateBook({ id, data: values });
        } else {
          resetForm();
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    if (bookData) {
      const { title, author, genre, publicationDate, image_link } =
        // eslint-disable-next-line no-unsafe-optional-chaining
        bookData?.data;
      formik.setValues({
        title,
        author,
        genre,
        publicationDate,
        image_link,
        pdf_link: "",
      });
    }

    if (isUpdateSuccess) {
      toast.success("Book updated successfully");
      updateReset();
    } else if (isUpdateError) {
      toast.error((updateError as IError)?.data.message);
      updateReset();
    }
  }, [bookData, isUpdateSuccess, isUpdateError, updateError, updateReset]);

  if (bookLoading) {
    return <Loading />;
  }

  return (
    <div className="flex items-center my-10 max-w-2xl mx-auto ">
      <div className="bg-slate-300 p-5 rounded-lg">
        <h1 className="text-center text-zinc-900 text-4xl uppercase font-bold mb-2">
          Edit Book
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="md:flex gap-5">
            <div className="w-full mb-3">
              <label htmlFor="title">Title</label>
              <input
                className="w-full p-2 mb-3 mt-1 rounded-lg"
                type="text"
                name="title"
                id="title"
                onChange={formik.handleChange("title")}
                value={formik.values.title}
              />
              {formik.touched.title && formik.errors.title ? (
                <div className="text-sm text-red-600">
                  {formik.errors.title}
                </div>
              ) : null}
            </div>
            <div className="w-full mb-3">
              <label htmlFor="author">Author</label>
              <input
                className="w-full p-2 mb-3 mt-1 rounded-lg"
                type="text"
                name="author"
                id="author"
                onChange={formik.handleChange("author")}
                value={formik.values.author}
              />
              {formik.touched.author && formik.errors.author ? (
                <div className="text-sm text-red-600">
                  {formik.errors.author}
                </div>
              ) : null}
            </div>
          </div>
          <div className="md:flex gap-5">
            <div className="w-full mb-3">
              <label htmlFor="genre">Genre</label>
              <input
                className="w-full p-2 mb-3 mt-1 rounded-lg"
                type="text"
                name="genre"
                id="genre"
                onChange={formik.handleChange("genre")}
                value={formik.values.genre}
              />
              {formik.touched.genre && formik.errors.genre ? (
                <div className="text-sm text-red-600">
                  {formik.errors.genre}
                </div>
              ) : null}
            </div>
            <div className="w-full mb-3">
              <label htmlFor="publicationDate">Publication Date</label>
              <input
                className="w-full p-2 mb-3 mt-1 rounded-lg"
                type="date"
                name="publicationDate"
                id="publicationDate"
                onChange={formik.handleChange("publicationDate")}
                value={formik.values.publicationDate}
              />
              {formik.touched.publicationDate &&
              formik.errors.publicationDate ? (
                <div className="text-sm text-red-600">
                  {formik.errors.publicationDate}
                </div>
              ) : null}
            </div>
          </div>
          <div className="w-full mb-3">
            <label htmlFor="pdf_link">Pdf Link</label>
            <input
              className="w-full p-2 mb-3 mt-1 rounded-lg"
              placeholder="Write book pdf link"
              type=" text"
              name="pdf_link"
              id="pdf_link"
              onChange={formik.handleChange("pdf_link")}
              value={formik.values.pdf_link}
            />
            {formik.touched.pdf_link && formik.errors.pdf_link ? (
              <div className="text-sm text-red-600">
                {formik.errors.pdf_link}
              </div>
            ) : null}
          </div>
          <div className="w-full mb-3">
            <label htmlFor="image_link">Book Image URL</label>
            <input
              className="w-full p-2 mb-3 mt-1 rounded-lg"
              type="file"
              name="image_link"
              id="image_link"
              accept="image/png, image/jpeg, image/jpg"
              onChange={(event) => {
                const selectedFile =
                  event.target.files && event.target.files[0];
                if (selectedFile) {
                  formik.setFieldValue("image_link", selectedFile);
                }
              }}
            />
          </div>
          <button
            type="submit"
            className="duration-300 rounded-lg py-[10px] px-[10px] font-medium bg-blue-500 hover:bg-blue-600 text-white"
          >
            Edit book
          </button>
        </form>
      </div>
    </div>
  );
}
