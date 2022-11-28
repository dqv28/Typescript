import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getUsers } from "../api/user";
import { State } from "../interfaces/state";

export const fetchUsers = createAsyncThunk('users/fetchUsers', getUsers)

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        isLogin: false
    } as State,
    reducers: {
        login(state) {
            state.isLogin = true;
        },
        logout(state) {
            state.isLogin = false;
        }
    },
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer