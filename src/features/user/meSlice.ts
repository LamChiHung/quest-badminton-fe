import type { MeResponse } from '@/types/userTypes';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface MeState {
    name: string,
    email: string,
    roles: string,
    isLogin: boolean
}

const initialState: MeState = {
    name: '',
    email: '',
    roles: '',
    isLogin: false
};

export const meSlice = createSlice({
    name: 'me',
    initialState,
    reducers: {
        setMe: (state, action: PayloadAction<MeResponse>) => {
            state = {
                name: action.payload.name,
                email: action.payload.email,
                roles: action.payload.roles,
                isLogin: true
            } as MeState
            console.log(state);
        },
        logout: (state) => {
            state = {
                name: "",
                email: "",
                roles: "",
                isLogin: false
            } as MeState
        }
    },
})

// Action creators are generated for each case reducer function
export const { setMe, logout } = meSlice.actions

export default meSlice.reducer