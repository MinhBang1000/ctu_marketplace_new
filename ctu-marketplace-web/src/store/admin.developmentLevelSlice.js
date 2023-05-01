// store/developmentLevelSlice.js
import _ from 'lodash';

import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";

import DevelopmentLevelService from "../services/admin.developmentLevel.service";

const GET_DEVELOPMENT_LEVELS = 'admin/developmentLevel/getAll';
const GET_DEVELOPMENT_LEVEL = 'admin/developmentLevel/getById';
const CREATE_DEVELOPMENT_LEVEL = 'admin/developmentLevel/create';
const UPDATE_DEVELOPMENT_LEVEL = 'admin/developmentLevel/update';
const DELETE_DEVELOPMENT_LEVEL = 'admin/developmentLevel/delete';
const DELETE_ALL_DEVELOPMENT_LEVEL = 'admin/developmentLevel/delete/all';

// Khởi tạo state cho slice, có thể kèm giá trị mặc định ban đầu
const initialState = { data: [], isloading: false };

export const retrieveDevelopmentLevels = createAsyncThunk(
  GET_DEVELOPMENT_LEVELS,
  async () => {
    const res = await DevelopmentLevelService.getAll();
    return res.data.data;
  }
);

export const retrieveDevelopmentLevel = createAsyncThunk(
  GET_DEVELOPMENT_LEVEL,
  async (id) => {
    const res = await DevelopmentLevelService.getById(id);
    return res.data.data;
  }
);

export const createDevelopmentLevel = createAsyncThunk(
  CREATE_DEVELOPMENT_LEVEL,
  async (data) => {
    try {
      const res = await DevelopmentLevelService.create(data);
      return res.data.data;

    } catch (error) {
        if(!error.response) {
          throw error;
        }

        return { ...data, error: error.response.data.message }
    }
  }
);

export const updateDevelopmentLevel = createAsyncThunk(
  UPDATE_DEVELOPMENT_LEVEL,
  async (data) => {
    try {
        const res = await DevelopmentLevelService.update(data.id, data);
        return res.data.data;
    } catch (error) {
        if(!error.response) {
          throw error;
        }

        return { ...data, error: error.response.data.message }
    }

  }
);

export const deleteDevelopmentLevel = createAsyncThunk(
  DELETE_DEVELOPMENT_LEVEL,
  async (id) => {
    try {
      await DevelopmentLevelService.delete(id);
      return { id };

    } catch (error) {
        if(!error.response) {
          throw error;
        }

        return { id, error: error.response.data.message }
    }  
  }
);

export const deleteAllDevelopmentLevels = createAsyncThunk(
  DELETE_ALL_DEVELOPMENT_LEVEL,
  async () => {
    const res = await DevelopmentLevelService.deleteAll();
    return res.data.data;
  }
);

// Cấu hình slice
export const developmentLevelSlice = createSlice({
  name: "admin.developmentLevelsAdmin",  // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
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
    [retrieveDevelopmentLevel.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, [action.payload.id]: action.payload}
      return state
    },
    [createDevelopmentLevel.fulfilled]: (state, action) => {
      state.isloading = false;
      if(!action.payload.error) {
        state.data = {...state.data, [action.payload.id]: action.payload}
      }
      return state
    },
    [updateDevelopmentLevel.fulfilled]: (state, action) => {
      state.isloading = false;
      if(!action.payload.error) {
        state.data = {...state.data, [action.payload.id]: action.payload}
      }
      return state
    },
    [deleteDevelopmentLevel.fulfilled]: (state, action) => {
      state.isloading = false;
      if(!action.payload.error) {
        state.data = {...state.data, [action.payload.id]: action.payload}
      }
      state.data = _.omit(state.data, action.payload.id)
      return state
    },
  }
});


const { reducer } = developmentLevelSlice;
export default reducer;