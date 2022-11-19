import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProduct } from '../interfaces/product';

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getProducts: builder.query<IProduct[], void>({
            query: () => '/products',
            providesTags: ['Product']
        }),
        getProduct: builder.query<IProduct, number>({
            query: (id: number) => `products/${id}`,
            providesTags: ['Product']
        }),
        addProduct: builder.mutation<IProduct, Omit<IProduct, 'id'>>({
            query: (product: IProduct) => ({
                url: '/products',
                method: 'POST',
                body: product
            }),
            invalidatesTags: ['Product']
        }),
        editProduct: builder.mutation<IProduct, Partial<IProduct> & Pick<IProduct, 'id'>>({
            query: (product: IProduct) => ({
                url: `/products/${product.id}`,
                method: 'PUT',
                body: product
            }),
            invalidatesTags: ['Product']
        }),
        removeProduct: builder.mutation({
            query: (id: number) => ({
                url: `/products/${id}`,
                method: 'DELETE',
                credentials: 'include'
            }),
            invalidatesTags: ['Product']
        })
    })
})

export const {
    useGetProductsQuery,
    useGetProductQuery,
    useAddProductMutation,
    useEditProductMutation,
    useRemoveProductMutation
} = productApi