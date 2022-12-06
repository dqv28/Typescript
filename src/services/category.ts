import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ICategory } from "../interfaces/category";

export const cateApi = createApi({
    reducerPath: 'cateApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    tagTypes: ['Category'],
    endpoints: (builder) => ({
        getCates: builder.query<ICategory[], void>({
            query: () => '/categories',
            providesTags: ['Category']
        }),
        getCate: builder.query<ICategory, number>({
            query: (id: number) => `/categories/${id}`,
            providesTags: ['Category']
        }),
        addCate: builder.mutation({
            query: (cate: ICategory) => ({
                url: '/categories',
                method: 'POST',
                body: cate
            }),
            invalidatesTags: ['Category']
        }),
        updateCate: builder.mutation({
            query: (cate: ICategory) => ({
                url: `/categories/${cate.id}`,
                method: 'PUT',
                body: cate
            }),
            invalidatesTags: ['Category']
        }),
        deleteCate: builder.mutation({
            query: (id: number) => ({
                url: `/categories/${id}`,
                method: 'DELETE',
                credentials: 'include'
            }),
            invalidatesTags: ['Category']
        })
    })
})

export const {
    useGetCatesQuery,
    useGetCateQuery,
    useAddCateMutation,
    useUpdateCateMutation,
    useDeleteCateMutation,
} = cateApi