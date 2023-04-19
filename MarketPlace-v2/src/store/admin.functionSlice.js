// store/functionSlice.js
import _ from 'lodash';

import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";

import FunctionService from "../services/admin.function.service";

const GET_FUNCTIONS = 'admin/function/getAll';
const GET_FUNCTION = 'admin/function/getById';
const CREATE_FUNCTION = 'admin/function/create';
const UPDATE_FUNCTION = 'admin/function/update';
const DELETE_FUNCTION = 'admin/function/delete';
const DELETE_ALL_FUNCTION = 'admin/function/delete/all';

// Khởi tạo state cho slice, có thể kèm giá trị mặc định ban đầu
const initialState = { data: [], isloading: false };

export const retrieveFunctions = createAsyncThunk(
  GET_FUNCTIONS,
  async () => {
    const res = await FunctionService.getAll();
    return res.data.data;
  }
);

export const retrieveFunction = createAsyncThunk(
  GET_FUNCTION,
  async ( id ) => {
    const res = await FunctionService.getById(id);
    return res.data.data;
  }
);

export const createFunction = createAsyncThunk(
  CREATE_FUNCTION,
  async (data) => {
    try {
      const res = await FunctionService.create(data);
      return res.data.data;

    } catch (error) {
        if(!error.response) {
          throw error;
        }

        return { ...data, error: error.response.data.message }
    }
  }
);

export const updateFunction = createAsyncThunk(
  UPDATE_FUNCTION,
  async (data) => {
    try {
        const res = await FunctionService.update(data.id, data);
        return res.data.data;
    } catch (error) {
        if(!error.response) {
          throw error;
        }

        return { ...data, error: error.response.data.message }
    }

  }
);

export const deleteFunction = createAsyncThunk(
  DELETE_FUNCTION,
  async (id) => {
    try {
      await FunctionService.delete(id);
      return { id };

    } catch (error) {
        if(!error.response) {
          throw error;
        }

        return { id, error: error.response.data.message }
    }  
  }
);

export const deleteAllFunctions = createAsyncThunk(
  DELETE_ALL_FUNCTION,
  async () => {
    const res = await FunctionService.deleteAll();
    return res.data.data;
  }
);

// Cấu hình slice
export const functionSlice = createSlice({
  name: "admin.functions",  // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
  initialState,
  // Reducers chứa các hàm xử lý cập nhật state
  extraReducers: {
    [retrieveFunctions.pending]: (state, action) => {
      state.isloading = true;
      return state
    },
    [retrieveFunctions.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, ..._.mapKeys(action.payload, 'id')}
      return state
    },
    [retrieveFunctions.rejected]: (state, action) => {
      state.isloading = true;
      return state
    },
    [retrieveFunction.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, [action.payload.id]: action.payload}
      return state
    },
    [createFunction.fulfilled]: (state, action) => {
      state.isloading = false;
      if(!action.payload.error) {
        state.data = {...state.data, [action.payload.id]: action.payload}
      }
      return state
    },
    [updateFunction.fulfilled]: (state, action) => {
      state.isloading = false;
      if(!action.payload.error) {
        state.data = {...state.data, [action.payload.id]: action.payload}
      }
      return state
    },
    [deleteFunction.fulfilled]: (state, action) => {
      state.isloading = false;
      if(!action.payload.error) {
        state.data = _.omit(state.data, action.payload.id)
      }
      return state
    },
  }
});


const { reducer } = functionSlice;
export default reducer;