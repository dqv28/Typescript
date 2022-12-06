import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUsersApi, login, register } from "../api/user";
import { IUser } from "../interfaces/user";

export const registerUser = createAsyncThunk(
    'users/registerUser',
    async (user: IUser) => {
        const data = await register(user)
        return data
    }
)

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        user: {}
    } as any,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(registerUser.fulfilled.type, (state: any, action: PayloadAction<IUser>) => {
            state.user = action.payload
        })
    }
})

export default userSlice.reducer