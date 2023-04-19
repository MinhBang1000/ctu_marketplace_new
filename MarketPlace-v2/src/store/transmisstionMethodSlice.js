// store/transmisstionMethodSlice.js
import _ from 'lodash';

import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";

import TransmisstionMethodService from "../services/transmisstionMethod.service";

const GET_TRANSMISSTION_METHODS = 'transmisstionMethod/getAll';
// const GET_TRANSMISSTION_METHOD = 'transmisstionMethod/getById';
// const CREATE_TRANSMISSTION_METHOD = 'transmisstionMethod/create';
// const UPDATE_TRANSMISSTION_METHOD = 'transmisstionMethod/update';
// const DELETE_TRANSMISSTION_METHOD = 'transmisstionMethod/delete';
// const DELETE_ALL_TRANSMISSTION_METHOD = 'transmisstionMethod/delete/all';

// Khởi tạo state cho slice, có thể kèm giá trị mặc định ban đầu
const initialState = { data: [], isloading: false };

export const retrieveTransmisstionMethods = createAsyncThunk(
  GET_TRANSMISSTION_METHODS,
  async () => {
    const res = await TransmisstionMethodService.getAll();
    return res.data.data;
  }
);

// Cấu hình slice
export const transmisstionMethodSlice = createSlice({
  name: "transmisstionMethods",  // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
  initialState,
  // Reducers chứa các hàm xử lý cập nhật state
  extraReducers: {
    [retrieveTransmisstionMethods.pending]: (state, action) => {
      state.isloading = true;
      return state
    },
    [retrieveTransmisstionMethods.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, ..._.mapKeys(action.payload, 'id')}
      return state
    },
    [retrieveTransmisstionMethods.rejected]: (state, action) => {
      state.isloading = true;
      return state
    },
  }
});


const { reducer } = transmisstionMethodSlice;
export default reducer;