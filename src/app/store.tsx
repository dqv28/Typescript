import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import productSlice from "../slices/product";

const store = configureStore({
    reducer: {
        products: productSlice
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>

export default store

