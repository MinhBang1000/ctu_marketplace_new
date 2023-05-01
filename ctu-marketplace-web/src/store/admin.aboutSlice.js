// store/admin.aboutSlice.js
import _ from 'lodash';

import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";

import AboutService from "../services/admin.about.service";

const GET_ABOUTS = 'admin/about/getAll';
const GET_ABOUT = 'admin/about/getById';
const CREATE_ABOUT = 'admin/about/create';
const UPDATE_ABOUT = 'admin/about/update';
const DELETE_ABOUT = 'admin/about/delete';
const DELETE_ALL_ABOUT = 'admin/about/delete/all';

// Khởi tạo state cho slice, có thể kèm giá trị mặc định ban đầu
const initialState = { data: [], isloading: false };

export const retrieveAbouts = createAsyncThunk(
  GET_ABOUTS,
  async () => {
    const res = await AboutService.getAll();
    return res.data.data;
  }
);

export const retrieveAbout = createAsyncThunk(
  GET_ABOUT,
  async ( id ) => {
    const res = await AboutService.getById(id);
    return res.data.data;
  }
);

export const createAbout = createAsyncThunk(
  CREATE_ABOUT,
  async (data) => {
    const res = await AboutService.create(data);
    return res.data.data;
  }
);

export const updateAbout = createAsyncThunk(
  UPDATE_ABOUT,
  async (data) => {
    const res = await AboutService.update(data.id, data);
    return res.data.data;
  }
);

export const deleteAbout = createAsyncThunk(
  DELETE_ABOUT,
  async ({ id }) => {
    await AboutService.delete(id);
    return { id };
  }
);

export const deleteAllAbouts = createAsyncThunk(
  DELETE_ALL_ABOUT,
  async () => {
    const res = await AboutService.deleteAll();
    return res.data.data;
  }
);

// Cấu hình slice
export const aboutSlice = createSlice({
  name: "admin.abouts",  // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
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
    [retrieveAbout.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, [action.payload.id]: action.payload}
      return state
    },
    [createAbout.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, [action.payload.id]: action.payload}
      return state
    },
    [updateAbout.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, [action.payload.id]: action.payload}
      return state
    },
    [deleteAbout.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = _.omit(state.data, action.payload.id)
      return state
    },
  }
});


const { reducer } = aboutSlice;
export default reducer;