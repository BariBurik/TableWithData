import IUser from "@/models/IUser"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"


interface AuthState {
    user: IUser
    isAuth: boolean
    xToken: string
}

interface AuthPayload {
    user: IUser
    xToken: string
}

const initialState: AuthState = {
    user: {
        username: '',
        password: ''
    },
    isAuth: false,
    xToken: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userLogin(state, action: PayloadAction<AuthPayload>) {
            state.user = action.payload.user
            state.xToken = action.payload.xToken
            state.isAuth = true
        },
        userLogout(state) {
            state.user = {
                username: '',
                password: ''
            },
            state.isAuth = false,
            state.xToken = ''
        }
    }
})

export default authSlice.reducer