import { api } from "../../api/apiSlice";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => `/user/profile`,
      providesTags: ["wishlist", "readlist"],
    }),
    addWishList: builder.mutation({
      query: (data) => ({
        url: `/user/add-wishlist`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["wishlist"],
    }),
    removeWishList: builder.mutation({
      query: (data) => ({
        url: `/user/remove-wishlist`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["wishlist"],
    }),
    addReadList: builder.mutation({
      query: (data) => ({
        url: `/user/add-readlist`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["readlist"],
    }),
    markCompleted: builder.mutation({
      query: (data) => ({
        url: `/user/mark-finished`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["readlist"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useAddWishListMutation,
  useRemoveWishListMutation,
  useAddReadListMutation,
  useMarkCompletedMutation,
} = userApi;
