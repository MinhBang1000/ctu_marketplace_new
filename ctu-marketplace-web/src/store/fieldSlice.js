// store/field.js
import _ from 'lodash';

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import FieldService from "../services/field.service";

const GET_FIELDS = 'field/getAll';
const GET_PUBLIC_FIELDS = 'field/getAllPublic';

// Khởi tạo state cho slice, có thể kèm giá trị mặc định ban đầu
const initialState = { data: [], isloading: false };

export const retrieveFields = createAsyncThunk(
  GET_FIELDS,
  async () => {
    const res = await FieldService.getAll();
    return res.data.data;
  }
);

export const retrievePublicFields = createAsyncThunk(
  GET_PUBLIC_FIELDS,
  async () => {
    const res = await FieldService.getAllPublicFields();
    return res.data.data;
  }
);


// Cấu hình slice
export const fieldSlice = createSlice({
  name: "fields",  // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
  initialState,
  // Reducers chứa các hàm xử lý cập nhật state
  extraReducers: {
    [retrieveFields.pending]: (state, action) => {
      state.isloading = true;
      return state
    },
    [retrieveFields.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, ..._.mapKeys(action.payload, 'id')}
      return state
    },
    [retrieveFields.rejected]: (state, action) => {
      state.isloading = true;
      return state
    },
    
    // Public fields
    [retrievePublicFields.pending]: (state, action) => {
      state.isloading = true;
      return state
    },
    [retrievePublicFields.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, ..._.mapKeys(action.payload, 'id')}
      return state
    },
    [retrievePublicFields.rejected]: (state, action) => {
      state.isloading = true;
      return state
    },
  }
});


const { reducer } = fieldSlice;
export default reducer;