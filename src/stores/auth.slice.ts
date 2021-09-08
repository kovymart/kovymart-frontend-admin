import { AppState } from "./index"
import {
    createAsyncThunk,
    createSlice,
    createSelector
} from "@reduxjs/toolkit"
import { NotifyHelper } from "../helpers/NotifyHelper/notify-helper"
import authApi from "../api/auth.api"
import { MessageStatus } from '../constants/message-status'
import { AccountI } from "../types"
import { setAccessTokenToLocalStorage } from '../helpers/auth'

interface InitialStateI {
    accessToken?: string,
    requesting: boolean,
    success?: boolean,
    message?: string,
    signUpMsg: string,
    signInMsg: string,
}

const initialState: InitialStateI = {
    requesting: false,
    signUpMsg: MessageStatus.IDLE,
    signInMsg: MessageStatus.IDLE,
}

const prefix = 'auth'
//------------------------ACTIONS------------------------

export const signUp = createAsyncThunk(
    `${prefix}/signUp`,
    async (data: AccountI) => {
        return await authApi.signUp(data)
    }
)

export const signIn = createAsyncThunk(
    `${prefix}/signIn`,
    async (data: AccountI) => {
        return await authApi.signIn(data)
    }
)

//------------------------SLICERS------------------------
const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setSignUpMsgToDefault: (state) => {
            state.signUpMsg = MessageStatus.IDLE
        },
        setSignInMsgToDefault: (state) => {
            state.signInMsg = MessageStatus.IDLE
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUp.pending, (state) => {
                state.requesting = true
                state.signUpMsg = MessageStatus.PENDING
            })
            .addCase(signUp.rejected, (state, action: any) => {
                state.requesting = false
                state.signUpMsg = MessageStatus.ERROR
                NotifyHelper.error(action.payload, MessageStatus.ERROR)
            })
            .addCase(signUp.fulfilled, (state) => {
                state.requesting = false
                state.signUpMsg = MessageStatus.SUCCESS
                NotifyHelper.success('Đăng ký thành công !', MessageStatus.SUCCESS)
            })

            .addCase(signIn.pending, (state) => {
                state.requesting = true
                state.signInMsg = MessageStatus.PENDING
            })
            .addCase(signIn.rejected, (state) => {
                state.requesting = false
                state.signInMsg = MessageStatus.ERROR
                NotifyHelper.error('Đăng nhập thất bại !', MessageStatus.ERROR)
            })
            .addCase(signIn.fulfilled, (state, action: any) => {
                state.requesting = false
                state.signInMsg = MessageStatus.SUCCESS
                state.accessToken = action.payload.accessToken

                setAccessTokenToLocalStorage(action.payload.accessToken)
                NotifyHelper.success('Đăng nhập thành công !', MessageStatus.SUCCESS)
            })
    },
})

//------------------------SELECTORS------------------------
export const { setSignUpMsgToDefault, setSignInMsgToDefault } =
    authSlice.actions

export const selectAuth = (state: AppState) => state.auth

export const selectRequesting = createSelector(
    [selectAuth],
    (state: any) => state.requesting
)
export const selectSignInMessage = createSelector(
    [selectAuth],
    (state: any) => state.signInMsg
)
export const selectSignUpMessage = createSelector(
    [selectAuth],
    (state: any) => state.signUpMsg
)


export default authSlice.reducer