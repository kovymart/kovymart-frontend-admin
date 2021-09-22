import { AppState } from "./index";
import {
  createAsyncThunk,
  createSelector,
  createSlice,
  AnyAction,
} from "@reduxjs/toolkit";
import { NotifyHelper } from "../helpers/NotifyHelper/notify-helper";
import orderApi from '../api/order.api';
import { MessageStatus } from '../constants/message-status';
import { OrderI } from '../types';

interface InitialStateI {
  requesting: boolean,
  success?: boolean,
  message?: string,
  list?: Array<OrderI> | null,
  object?: OrderI | null,
  totalCount?: number,
  statusSelected?: number,
}
interface AsyncStatusI {
  id: number,
  status: number,
}
const initialState: InitialStateI = {
  requesting: false,
  list: [],
  object: null,
  statusSelected: 1,
};

//------------------------ACTIONS------------------------

export const getOrderList = createAsyncThunk(
  "order/getCategoryList",
  async (data: object) => {
    return await orderApi.getOrderList(data);
  }
);

export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async (data: AsyncStatusI) => {
    return await orderApi.updateOrderStatus(data.id, data.status);
  }
);
//------------------------UTILITIES------------------------
const isPendingAction = (action: AnyAction) =>
  action.type.endsWith("/pending") && action.type.includes("order");
const isRejectedAction = (action: AnyAction) =>
  action.type.endsWith("/rejected") && action.type.includes("order");


//------------------------SLICERS------------------------
const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    setStatusSelected: (state, action) => {
      state.statusSelected = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderList.fulfilled, (state, action: any) => {
        state.requesting = false;
        state.success = true;
        state.list = action.payload.data;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action: any) => {
        state.requesting = false;
        state.success = true;
        let index = state.list!.findIndex(
          (element: any) =>
            element.id === action.payload.id
        );
        state.list![index].status = action.payload.status;
      })

      // utilities for  pending, rejected
      .addMatcher(isPendingAction, (state) => {
        state.requesting = true;
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.requesting = state.success = false;
        state.message = action.error.message;
        NotifyHelper.error(action.error.message, MessageStatus.ERROR);
      });
  },
});


//------------------------SELECTORS------------------------
const selectOrder = (state: AppState) => state.order;

export const selectOrderList = createSelector(
  [selectOrder],
  (state: any) => state.list
);
export const selectPageSizeOrder = createSelector(
  [selectOrder],
  (state: any) => state.totalCount
);
export const selectStatusSelected = createSelector(
  [selectOrder],
  (state: any) => state.statusSelected
);

export const { setStatusSelected } = orderSlice.actions;

export default orderSlice.reducer;