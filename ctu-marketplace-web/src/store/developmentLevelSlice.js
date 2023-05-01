// store/developmentLevelSlice.js
import _ from 'lodash';

import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";

import DevelopmentLevelService from "../services/developmentLevel.service";

const GET_DEVELOPMENT_LEVELS = 'developmentLevel/getAll';
// const GET_DEVELOPMENT_LEVEL = 'developmentLevel/getById';
// const CREATE_DEVELOPMENT_LEVEL = 'developmentLevel/create';
// const UPDATE_DEVELOPMENT_LEVEL = 'developmentLevel/update';
// const DELETE_DEVELOPMENT_LEVEL = 'developmentLevel/delete';
// const DELETE_ALL_DEVELOPMENT_LEVEL = 'developmentLevel/delete/all';

// Khởi tạo state cho slice, có thể kèm giá trị mặc định ban đầu
const initialState = { data: [], isloading: false };

export const retrieveDevelopmentLevels = createAsyncThunk(
  GET_DEVELOPMENT_LEVELS,
  async () => {
    const res = await DevelopmentLevelService.getAll();
    return res.data.data;
  }
);

// Cấu hình slice
export const developmentLevelSlice = createSlice({
  name: "developmentLevels",  // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
  initialState,
  // Reducers chứa các hàm xử lý cập nhật state
  extraReducers: {
    [retrieveDevelopmentLevels.pending]: (state, action) => {
      state.isloading = true;
      return state
    },
    [retrieveDevelopmentLevels.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, ..._.mapKeys(action.payload, 'id')}
      return state
    },
    [retrieveDevelopmentLevels.rejected]: (state, action) => {
      state.isloading = true;
      return state
    },
  }
});


const { reducer } = developmentLevelSlice;
export default reducer;