import { AppState } from "./index";
import {
    createAsyncThunk,
    createSlice,
    createSelector
} from "@reduxjs/toolkit";
import { NotifyHelper } from "../helpers/NotifyHelper/notify-helper";
import authApi from "../api/auth.api";
import { MessageStatus } from '../constants/message-status';
import { AccountI } from "../types";
import { setAccessTokenToLocalStorage } from '../helpers/auth';

interface InitialStateI {
    accessToken?: string,
    requesting: boolean,
    success?: boolean,
    message?: string,
    signInMsg: string,
}

const initialState: InitialStateI = {
    requesting: false,
    signInMsg: MessageStatus.IDLE,
};

const prefix = 'auth';
//------------------------ACTIONS------------------------

export const signIn = createAsyncThunk(
    `${prefix}/signIn`,
    async (data: AccountI, { rejectWithValue }) => {
        try {
            const res = await authApi.signIn(data);
            return res;
        } catch (error: any) {
            if (!error.response) {
                throw error;
            }
            return rejectWithValue(error.response.data);
        }
    },
);

//------------------------SLICERS------------------------
const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setSignInMsgToDefault: (state) => {
            state.signInMsg = MessageStatus.IDLE;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signIn.pending, (state) => {
                state.requesting = true;
                state.signInMsg = MessageStatus.PENDING;
            })
            .addCase(signIn.rejected, (state, action: any) => {
                state.requesting = false;
                state.signInMsg = MessageStatus.ERROR;
                NotifyHelper.error(action.payload?.message ? action.payload.message
                    : action.error.message, 'Đăng nhập thất bại !');
            })
            .addCase(signIn.fulfilled, (state, action: any) => {
                state.requesting = false;
                state.signInMsg = MessageStatus.SUCCESS;
                state.accessToken = action.payload.accessToken;
                setAccessTokenToLocalStorage(action.payload.accessToken);
                console.log(action);
                NotifyHelper.success('Đăng nhập thành công !', MessageStatus.SUCCESS);
            });
    },
});

//------------------------SELECTORS------------------------
export const { setSignInMsgToDefault } =
    authSlice.actions;

export const selectAuth = (state: AppState) => state.auth;

export const selectRequesting = createSelector(
    [selectAuth],
    (state: any) => state.requesting
);
export const selectSignInMessage = createSelector(
    [selectAuth],
    (state: any) => state.signInMsg
);



export default authSlice.reducer;