import { mockApi } from "./mockApi";

export interface Comment {
  id?: number;
  text: string;
  author: string;
  rating: number;
}

const commentsApi = mockApi.injectEndpoints({
  endpoints: (builder) => ({
    addComment: builder.mutation<void, Comment>({
      query: (body) => ({
        url: "/comments",
        method: "POST",
        body,
      }),
      invalidatesTags: ['Comments']
    }),
    getComments: builder.query<Comment[], void>({
      query: () => '/comments',
      providesTags: ['Comments']
    })
  }),
});

export const { useAddCommentMutation, useGetCommentsQuery } = commentsApi;
