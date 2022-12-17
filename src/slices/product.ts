import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProduct } from "../api/product"

export const fetchProduct = createAsyncThunk(
    'products/fetchProduct', getProduct
)
const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        filteredProducts: [],
        isLoading: true,
        search: ''
    } as any,
    reducers: {
        productsSuccess: (state, action) => {
            state.products = action.payload.products;
            state.isLoading = false;
        },
        searchByKey: (state, action) => {
            return {
                ...state.filteredProducts,
                filteredProducts: [...state.products].filter((product) =>
                    product.name.toLowerCase().includes(
                        action.payload.toLowerCase()
                    )
                )
            }
        },
        filterByCate: (state, action) => {
            return {
                ...state.filteredProducts,
                filteredProducts: [...state.products].filter((product) =>
                    product.category.includes(action.payload)
                )
            }
        }
    }
})

export const { productsSuccess, searchByKey, filterByCate } = productSlice.actions;
export default productSlice.reducer

