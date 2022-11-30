import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUsers } from "../api/user";
import { IUser } from "../interfaces/user";

export const fetchUsers = createAsyncThunk('users/fetchUsers', getUsers)

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        username: ''
    } as any,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled.type, (state, action: PayloadAction<IUser[]>) => {
            state.username = action.payload
        })
    }
})

export default userSlice.reducer