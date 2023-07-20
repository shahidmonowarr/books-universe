import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (query) => `/book?${query}`,
      providesTags: ["book"],
    }),
    singleBook: builder.query({
      query: (id) => `/book/${id}`,
      providesTags: ["book"],
    }),
    updateBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/book/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["book"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/book/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["book"],
    }),
    reviewBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/book/review/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["book"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useSingleBookQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useReviewBookMutation,
} = bookApi;
