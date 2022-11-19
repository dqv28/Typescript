import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../api/product'
import { IProduct } from '../interfaces/product'

const initialState: { value: IProduct[] } = {
    value: []
}
export const fetchProducts = createAsyncThunk(
    'products/getProducts', getProducts
)

export const fetchProduct = createAsyncThunk(
    'products/getProduct', getProduct
)

export const removeProduct = createAsyncThunk(
    'products/removeProduct', deleteProduct

)

export const addProduct = createAsyncThunk(
    'products/addProduct', createProduct

)

export const editProduct = createAsyncThunk(
    'products/editProduct', updateProduct

)

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled.type, (state, action: PayloadAction<IProduct[]>) => {
            state.value = action.payload
        }),
            builder.addCase(removeProduct.fulfilled.type, (state, action: PayloadAction<IProduct>) => {
                state.value = state.value.filter(item => item.id !== action.payload.id)
            }),
            builder.addCase(addProduct.fulfilled.type, (state, action: PayloadAction<IProduct>) => {
                state.value = [...state.value, action.payload]

            })
    }
})

export default productSlice.reducer