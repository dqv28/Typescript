import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../interfaces/product";
import { getProduct } from "../api/product"

export const fetchProduct = createAsyncThunk(
    'products/fetchProduct', getProduct
)

