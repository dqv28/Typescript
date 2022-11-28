import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IUser } from "../interfaces/user";

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getUsers: builder.query<IUser, void>({
            query: () => `/users`,
            providesTags: ['User']
        }),
        getUser: builder.query<IUser, number>({
            query: (id: number) => `/users/${id}`,
            providesTags: ['User']
        }),
        addUser: builder.mutation<IUser, Omit<IUser, 'id'>>({
            query: (user) => ({
                url: `/users`,
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['User']
        })
    })
})

export const { useGetUsersQuery, useGetUserQuery, useAddUserMutation } = userApi