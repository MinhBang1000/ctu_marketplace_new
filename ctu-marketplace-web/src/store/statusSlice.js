// store/statusSlice.js
import _ from 'lodash';

import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";

import StatusService from "../services/status.service";

const GET_STATUSES = 'status/getAll';
const GET_STATUS = 'status/getById';
const CREATE_STATUS = 'status/create';
const UPDATE_STATUS = 'status/update';
const DELETE_STATUS = 'status/delete';
const DELETE_ALL_STATUS = 'status/delete/all';

// Khởi tạo state cho slice, có thể kèm giá trị mặc định ban đầu
const initialState = { data: [], isloading: false };

export const retrieveStatuses = createAsyncThunk(
  GET_STATUSES,
  async () => {
    const res = await StatusService.getAll();
    return res.data.data;
  }
);

export const retrieveStatusById = createAsyncThunk(
  GET_STATUS,
  async ({ id }) => {
    const res = await StatusService.getById(id);
    return res.data.data;
  }
);

export const createStatus = createAsyncThunk(
  CREATE_STATUS,
  async (data) => {
    try {
      const res = await StatusService.create(data);
      return res.data.data;

    } catch (error) {
        if(!error.response) {
          throw error;
        }

        return { ...data, error: error.response.data.message }
    }
  }
);

export const updateStatus = createAsyncThunk(
  UPDATE_STATUS,
  async (data) => {
    try {
      const res = await StatusService.update(data.id, data);
      return res.data.data;
    } catch (error) {
        if(!error.response) {
          throw error;
        }

        return { ...data, error: error.response.data.message }
    }
  }
);

export const deleteStatus = createAsyncThunk(
  DELETE_STATUS,
  async (id) => {
    try {
      await StatusService.delete(id);
      return { id };

    } catch (error) {
        if(!error.response) {
          throw error;
        }

        return { id, error: error.response.data.message }
    }   
  }
);

export const deleteAllStatus = createAsyncThunk(
  DELETE_ALL_STATUS,
  async () => {
    const res = await StatusService.deleteAll();
    return res.data.data;
  }
);

// Cấu hình slice
export const statusSlice = createSlice({
  name: "status",  // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
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
    [createStatus.fulfilled]: (state, action) => {
      state.isloading = false;
      if(!action.payload.error) {
        state.data = {...state.data, [action.payload.id]: action.payload}
      }
      return state
    },
    [updateStatus.fulfilled]: (state, action) => {
      state.isloading = false;
      if(!action.payload.error) {
        state.data = {...state.data, [action.payload.id]: action.payload}
      }
      return state
    },
    [deleteStatus.fulfilled]: (state, action) => {
      state.isloading = false;
      if(!action.payload.error) {
        state.data = {...state.data, [action.payload.id]: action.payload}
      }
      state.data = _.omit(state.data, action.payload.id)
      return state
    },
  }
});


const { reducer } = statusSlice;
export default reducer;