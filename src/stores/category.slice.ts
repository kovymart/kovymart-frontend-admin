import { AppState } from "./index"
import {
    createAsyncThunk,
    createSelector,
    createSlice,
    AnyAction,
} from "@reduxjs/toolkit"
import { NotifyHelper } from "../helpers/NotifyHelper/notify-helper"
import categoryApi from "../api/category.api"
import { MessageStatus } from '../constants/message-status'
import { CategoryI } from "../types"

interface InitialStateI {
    requesting: boolean,
    success?: boolean,
    message?: string,
    list?: Array<CategoryI> | null,
    object?: CategoryI | null,
}

const initialState: InitialStateI = {
    requesting: false,
    list: [],
    object: null
}

//------------------------ACTIONS------------------------

export const getCategoryList = createAsyncThunk(
    "category/getCategoryList",
    async () => {
        return await categoryApi.getCategoryList()
    }
)

export const getCategoryById = createAsyncThunk(
    "category/getCategoryById",
    async (id: number) => {
        return await categoryApi.getCategoryById(id)
    }
)

export const addCategory = createAsyncThunk(
    "category/addCategory",
    async (data: CategoryI) => {
        return await categoryApi.addCategory(data)
    }
)

export const updateCategory = createAsyncThunk(
    "category/updateCategory",
    async (data: any) => {
        return await categoryApi.updateCategory(data.id, data.data)
    }
)

export const deleteCategory = createAsyncThunk(
    "category/deleteCategory",
    async (id: number) => {
        return await categoryApi.deleteCategory(id)
    }
)

//------------------------UTILITIES------------------------
const isPendingAction = (action: AnyAction) =>
    action.type.endsWith("/pending") && action.type.includes("category")
const isRejectedAction = (action: AnyAction) =>
    action.type.endsWith("/rejected") && action.type.includes("category")


//------------------------SLICERS------------------------
const categorySlice = createSlice({
    name: "category",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategoryList.fulfilled, (state, action: any) => {
                state.requesting = false
                state.success = true
                state.list = action.payload.data
            })
            .addCase(addCategory.fulfilled, (state) => {
                state.requesting = false
                state.success = true
                NotifyHelper.success('Thêm thành công !', MessageStatus.SUCCESS)
            })
            .addCase(getCategoryById.fulfilled, (state, action: any) => {
                state.requesting = false
                state.success = true
                state.object = action.payload
            })
            .addCase(deleteCategory.fulfilled, (state, action: any) => {
                state.requesting = false
                state.success = true
                NotifyHelper.success('Xóa thành công !', MessageStatus.SUCCESS)
                state.list = state.list!.filter(c => c.id! !== action.payload[1])
            })
            .addCase(updateCategory.fulfilled, (state) => {
                state.requesting = false
                state.success = true
                NotifyHelper.success('Cập nhật thành công !', MessageStatus.SUCCESS)
            })

            // utilities for  pending, rejected
            .addMatcher(isPendingAction, (state) => {
                state.requesting = true
            })
            .addMatcher(isRejectedAction, (state, action) => {
                state.requesting = state.success = false
                state.message = action.error.message

                NotifyHelper.error(action.error.message, MessageStatus.ERROR)
            })
    },
})


//------------------------SELECTORS------------------------
const selectCategory = (state: AppState) => state.category

export const selectCategoryList = createSelector(
    [selectCategory],
    (state: any) => state.list
)

export const selectRequesting = createSelector(
    [selectCategory],
    (state: any) => state.requesting
)

export const selectCategoryById = createSelector(
    [selectCategory],
    (category: any) => category.object
)

export default categorySlice.reducer