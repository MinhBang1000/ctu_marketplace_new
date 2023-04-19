// store/admin.footerSlice.js
import _ from 'lodash';

import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";

import FooterService from "../services/admin.footer.service";

const GET_FOOTERS = 'admin/footer/getAll';
const GET_FOOTER = 'admin/footer/getById';
const CREATE_FOOTER = 'admin/footer/create';
const UPDATE_FOOTER = 'admin/footer/update';
const DELETE_FOOTER = 'admin/footer/delete';
const DELETE_ALL_FOOTER = 'admin/footer/delete/all';

// Khởi tạo state cho slice, có thể kèm giá trị mặc định ban đầu
const initialState = { data: [], isloading: false };

export const retrieveFooters = createAsyncThunk(
  GET_FOOTERS,
  async () => {
    const res = await FooterService.getAll();
    return res.data.data;
  }
);

export const retrieveFooter = createAsyncThunk(
  GET_FOOTER,
  async ( id ) => {
    const res = await FooterService.getById(id);
    return res.data.data;
  }
);

export const createFooter = createAsyncThunk(
  CREATE_FOOTER,
  async (data) => {
    const res = await FooterService.create(data);
    return res.data.data;
  }
);

export const updateFooter = createAsyncThunk(
  UPDATE_FOOTER,
  async (data) => {
    const res = await FooterService.update(data.id, data);
    return res.data.data;
  }
);

export const deleteFooter = createAsyncThunk(
  DELETE_FOOTER,
  async ({ id }) => {
    await FooterService.delete(id);
    return { id };
  }
);

export const deleteAllFooters = createAsyncThunk(
  DELETE_ALL_FOOTER,
  async () => {
    const res = await FooterService.deleteAll();
    return res.data.data;
  }
);

// Cấu hình slice
export const footerSlice = createSlice({
  name: "admin.footers",  // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
  initialState,
  // Reducers chứa các hàm xử lý cập nhật state
  extraReducers: {
    [retrieveFooters.pending]: (state, action) => {
      state.isloading = true;
      return state
    },
    [retrieveFooters.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, ..._.mapKeys(action.payload, 'id')}
      return state
    },
    [retrieveFooters.rejected]: (state, action) => {
      state.isloading = true;
      return state
    },

    [retrieveFooter.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, [action.payload.id]: action.payload}
      return state
    },
    [createFooter.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, [action.payload.id]: action.payload}
      return state
    },
    [updateFooter.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, [action.payload.id]: action.payload}
      return state
    },
    [deleteFooter.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = _.omit(state.data, action.payload.id)
      return state
    },
  }
});


const { reducer } = footerSlice;
export default reducer;