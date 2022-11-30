import { createSlice } from "@reduxjs/toolkit"
import { State } from "../interfaces/state";

const authSlice = createSlice({
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

export const { login, logout } = authSlice.actions
export default authSlice.reducer