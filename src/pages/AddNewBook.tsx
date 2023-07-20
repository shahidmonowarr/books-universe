import { useFormik } from "formik";
import { useEffect } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useAddBookMutation } from "../redux/features/books/bookApi";
import { IError } from "../types/globalTypes";

export default function AddNewBook() {
  const [addBook, { isSuccess, isError, error, reset }] = useAddBookMutation();

  const formSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    author: Yup.string().required("Author name is required"),
    genre: Yup.string().required("Genre is required"),
    publicationDate: Yup.string().required("Publication date is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      image_link: "",
      author: "",
      genre: "",
      publicationDate: "",
    },

    validationSchema: formSchema,

    onSubmit: (values, { resetForm }) => {
      addBook(values);
      resetForm();
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Book added successfully");
      reset();
    } else if (isError) {
      toast.error((error as IError)?.data.message);
      reset();
    }
  }, [isSuccess, isError, error, reset]);

  return (
    <div className="flex items-center h-[calc(100vh-180px)] mt-5 max-w-2xl mx-auto ">
      <div className="box_shadow bg-slate-300 p-5 rounded-lg">
        <h1 className="text-center text-zinc-900 text-4xl uppercase font-bold mb-2">
          Add Book
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="md:flex gap-5">
            <div className="w-full mb-3">
              <label htmlFor="title">Title</label>
              <input
                className="w-full p-2 mb-3 mt-1 rounded-lg"
                placeholder="Write book title"
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
                placeholder="Write author name"
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
                placeholder="Write book genre"
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
                placeholder="Month 00, 0000"
                type="text"
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
            <label htmlFor="image_link">Book Image URL</label>
            <input
              className="w-full p-2 mb-3 mt-1 rounded-lg"
              placeholder="Write book image URL"
              type="text"
              name="image_link"
              id="image_link"
              onChange={formik.handleChange("image_link")}
              value={formik.values.image_link}
            />
          </div>
          <button
            type="submit"
            className="first_button duration-300 rounded-lg py-[10px] px-[10px] font-medium bg-blue-500 hover:bg-blue-600 text-white"
          >
            Add book
          </button>
        </form>
      </div>
    </div>
  );
}
