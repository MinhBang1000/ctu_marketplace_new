// store/transmisstionMethodSlice.js
import _ from 'lodash';

import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";

import TransmisstionMethodService from "../services/admin.transmisstionMethod.service";

const GET_TRANSMISSTION_METHODS = 'admin/transmisstionMethod/getAll';
const GET_TRANSMISSTION_METHOD = 'admin/transmisstionMethod/getById';
const CREATE_TRANSMISSTION_METHOD = 'admin/transmisstionMethod/create';
const UPDATE_TRANSMISSTION_METHOD = 'admin/transmisstionMethod/update';
const DELETE_TRANSMISSTION_METHOD = 'admin/transmisstionMethod/delete';
const DELETE_ALL_TRANSMISSTION_METHOD = 'admin/transmisstionMethod/delete/all';

// Khởi tạo state cho slice, có thể kèm giá trị mặc định ban đầu
const initialState = { data: [], isloading: false };

export const retrieveTransmisstionMethods = createAsyncThunk(
  GET_TRANSMISSTION_METHODS,
  async () => {
    const res = await TransmisstionMethodService.getAll();
    return res.data.data;
  }
);

export const retrieveTransmisstionMethod = createAsyncThunk(
  GET_TRANSMISSTION_METHOD,
  async (id) => {
    const res = await TransmisstionMethodService.getById(id);
    return res.data.data;
  }
);

export const createTransmisstionMethod = createAsyncThunk(
  CREATE_TRANSMISSTION_METHOD,
  async (data) => {
    try {
      const res = await TransmisstionMethodService.create(data);
      return res.data.data;

    } catch (error) {
        if(!error.response) {
          throw error;
        }

        return { ...data, error: error.response.data.message }
    }
  }
);

export const updateTransmisstionMethod = createAsyncThunk(
  UPDATE_TRANSMISSTION_METHOD,
  async (data) => {
    try {
      const res = await TransmisstionMethodService.update(data.id, data);
      return res.data.data;
    } catch (error) {
        if(!error.response) {
          throw error;
        }

        return { ...data, error: error.response.data.message }
    }
  }
);

export const deleteTransmisstionMethod = createAsyncThunk(
  DELETE_TRANSMISSTION_METHOD,
  async (id) => {
    try {
      await TransmisstionMethodService.delete(id);
      return { id };

    } catch (error) {
        if(!error.response) {
          throw error;
        }

        return { id, error: error.response.data.message }
    }  
  }
);

export const deleteAllTransmisstionMethods = createAsyncThunk(
  DELETE_ALL_TRANSMISSTION_METHOD,
  async () => {
    const res = await TransmisstionMethodService.deleteAll();
    return res.data.data;
  }
);

// Cấu hình slice
export const transmisstionMethodSlice = createSlice({
  name: "admin.transmisstionMethods",  // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
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
    [retrieveTransmisstionMethod.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, [action.payload.id]: action.payload}
      return state
    },
    [createTransmisstionMethod.fulfilled]: (state, action) => {
      state.isloading = false;
      if(!action.payload.error) {
        state.data = {...state.data, [action.payload.id]: action.payload}
      }
      return state
    },
    [updateTransmisstionMethod.fulfilled]: (state, action) => {
      state.isloading = false;
      if(!action.payload.error) {
        state.data = {...state.data, [action.payload.id]: action.payload}
      }
      return state
    },
    [deleteTransmisstionMethod.fulfilled]: (state, action) => {
      state.isloading = false;
      if(!action.payload.error) {
        state.data = {...state.data, [action.payload.id]: action.payload}
      }
      state.data = _.omit(state.data, action.payload.id)
      return state
    },
  }
});


const { reducer } = transmisstionMethodSlice;
export default reducer;