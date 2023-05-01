// store/statusSlice.js
import _ from 'lodash';

import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";

import StatusService from "../services/researcher.status.service";

const GET_STATUSES = 'status/getAll';

// Khởi tạo state cho slice, có thể kèm giá trị mặc định ban đầu
const initialState = { data: [], isloading: false };

export const retrieveStatuses = createAsyncThunk(
  GET_STATUSES,
  async () => {
    const res = await StatusService.getAll();
    return res.data.data;
  }
);


// Cấu hình slice
export const statusSlice = createSlice({
  name: "researcher.status",  // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
  initialState,
  // Reducers chứa các hàm xử lý cập nhật state
  extraReducers: {
    [retrieveStatuses.pending]: (state, action) => {
      state.isloading = true;
      return state
    },
    [retrieveStatuses.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, ..._.mapKeys(action.payload, 'id')}
      return state
    },
    [retrieveStatuses.rejected]: (state, action) => {
      state.isloading = true;
      return state
    },
  }
});


const { reducer } = statusSlice;
export default reducer;