import { Action, combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import { productApi } from "../services/product";
import storage from "redux-persist/lib/storage";
import userSlice from "../slices/user"
import { userApi } from "../services/user";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth']
}

const rootReducer = combineReducers({
    auth: userSlice,
    [productApi.reducerPath]: productApi.reducer,
    // [userApi.reducerPath]: userApi.reducer
})

const persistedRducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedRducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }).concat(productApi.middleware)
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>

export default persistStore(store)

