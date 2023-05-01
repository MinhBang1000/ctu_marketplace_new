// store/aboutSlice.js
import _ from 'lodash';

import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";

import AboutService from "../services/about.service";

const GET_ABOUTS = 'about/getAll';
const GET_ABOUT_BY_ID = 'about/getById';

// Khởi tạo state cho slice, có thể kèm giá trị mặc định ban đầu
const initialState = { data: [], isloading: false };

export const retrieveAbouts = createAsyncThunk(
  GET_ABOUTS,
  async () => {
    const res = await AboutService.getAll();
    return res.data.data;
  }
);

export const retrieveAboutById = createAsyncThunk(
  GET_ABOUT_BY_ID,
  async (id) => {
    const res = await AboutService.getById(id);
    return res.data.data;
  }
);


// Cấu hình slice
export const aboutSlice = createSlice({
  name: "abouts",  // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
  initialState,
  // Reducers chứa các hàm xử lý cập nhật state
  extraReducers: {
    [retrieveAbouts.pending]: (state, action) => {
      state.isloading = true;
      return state
    },
    [retrieveAbouts.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, ..._.mapKeys(action.payload, 'id')}
      return state
    },
    [retrieveAbouts.rejected]: (state, action) => {
      state.isloading = true;
      return state
    },

    [retrieveAboutById.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, [action.payload.id]: action.payload}
      return state
    },
  }
});


const { reducer } = aboutSlice;
export default reducer;