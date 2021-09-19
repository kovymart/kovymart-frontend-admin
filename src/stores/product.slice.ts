import { AppState } from "./index"
import {
    createAsyncThunk,
    createSelector,
    createSlice,
    AnyAction,
} from "@reduxjs/toolkit"
import { NotifyHelper } from "../helpers/NotifyHelper/notify-helper"
import productApi from "../api/product.api"
import { MessageStatus } from '../constants/message-status'
import { ProductI } from "../types"

interface InitialStateI {
    requesting: boolean,
    success?: boolean,
    message?: string,
    list?: Array<ProductI> | null,
    object?: ProductI | null,
}

const initialState: InitialStateI = {
    requesting: false,
    list: [],
    object: null
}

//------------------------ACTIONS------------------------

export const getProductList = createAsyncThunk(
    "product/getProductList",
    async () => {
        return await productApi.getProductList()
    }
)

export const getProductById = createAsyncThunk(
    "product/getProductById",
    async (id: number) => {
        return await productApi.getProductById(id)
    }
)

export const addProduct = createAsyncThunk(
    "product/addProduct",
    async (data: ProductI) => {
        return await productApi.addProduct(data)
    }
)

export const updateProduct = createAsyncThunk(
    "product/updateProduct",
    async (data: any) => {
        return await productApi.updateProduct(data.id, data.data)
    }
)

export const deleteProduct = createAsyncThunk(
    "product/deleteProduct",
    async (id: number) => {
        return await productApi.deleteProduct(id)
    }
)

//------------------------UTILITIES------------------------
const isPendingAction = (action: AnyAction) =>
    action.type.endsWith("/pending") && action.type.includes("product")
const isRejectedAction = (action: AnyAction) =>
    action.type.endsWith("/rejected") && action.type.includes("product")


//------------------------SLICERS------------------------
const productSlice = createSlice({
    name: "product",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductList.fulfilled, (state, action: any) => {
                state.requesting = false;
                state.success = true;
                state.list = action.payload.data;
            })
            .addCase(addProduct.fulfilled, (state) => {
                state.requesting = false;
                state.success = true;
                NotifyHelper.success('Thêm thành công !', MessageStatus.SUCCESS)
            })
            .addCase(getProductById.fulfilled, (state, action: any) => {
                state.requesting = false;
                state.success = true;
                state.object = action.payload;
            })
            .addCase(deleteProduct.fulfilled, (state, action: any) => {
                state.requesting = false;
                state.success = true;
                NotifyHelper.success('Xóa thành công !', MessageStatus.SUCCESS);
                state.list = state.list!.filter(c => c.id! !== action.payload[1]);
            })
            .addCase(updateProduct.fulfilled, (state) => {
                state.requesting = false;
                state.success = true;
                NotifyHelper.success('Cập nhật thành công !', MessageStatus.SUCCESS);
            })

            // utilities for  pending, rejected
            .addMatcher(isPendingAction, (state) => {
                state.requesting = true;
            })
            .addMatcher(isRejectedAction, (state, action) => {
                state.requesting = state.success = false;
                state.message = action.error.message;

                NotifyHelper.error(action.error.message, MessageStatus.ERROR);
            })
    },
})


//------------------------SELECTORS------------------------
const selectProduct = (state: AppState) => state.product

export const selectProductList = createSelector(
    [selectProduct],
    (state: any) => state.list
)

export const selectRequesting = createSelector(
    [selectProduct],
    (state: any) => state.requesting
)

export const selectProductById = createSelector(
    [selectProduct],
    (product: any) => product.object
)

export default productSlice.reducer;