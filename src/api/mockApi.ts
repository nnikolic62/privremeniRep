import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User, UserObj } from "../store/loginSlice";

export interface UserInterface {
  username: string;
  email: string;
  password: string;
}

export interface UserDatabase extends UserInterface {
  id: string;
}

export const mockApi = createApi({
  reducerPath: "mockApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://643551de83a30bc9ad5d808d.mockapi.io" }),
  tagTypes: ['Comments'],
  endpoints: (builder) => ({
    register: builder.mutation<void, UserInterface>({
      query: (data) => ({
        url: '/users',
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }),
    getUsers: builder.query<UserDatabase[], void>({
      query: () => '/users'
    })
  })
});

export const { useRegisterMutation, useLazyGetUsersQuery } = mockApi;
