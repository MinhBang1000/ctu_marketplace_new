// store/admin.fieldSlice.js
import _ from 'lodash';

import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import FieldService from "../services/admin.field.service";

const GET_FIELDS = 'admin/field/getAll';
const GET_FIELD = 'admin/field/getById';
const CREATE_FIELD = 'admin/field/create';
const UPDATE_FIELD = 'admin/field/update';
const DELETE_FIELD = 'admin/field/delete';
const DELETE_ALL_FIELD = 'field/delete/all';

// Khởi tạo state cho slice, có thể kèm giá trị mặc định ban đầu
const initialState = { data: [], isloading: false };

export const retrieveFields = createAsyncThunk(
  GET_FIELDS,
  async () => {
    const res = await FieldService.getAll();
    return res.data.data;
  }
);

export const retrieveFieldById = createAsyncThunk(
  GET_FIELD,
  async ( id ) => {
    const res = await FieldService.getById(id);
    return res.data;
  }
);

export const createField = createAsyncThunk(
  CREATE_FIELD,
  async (data) => {
    const res = await FieldService.create(data);
    return res.data;
  }
);

export const updateField = createAsyncThunk(
  UPDATE_FIELD,
  async (data) => {
    const res = await FieldService.update(data.id, data);
    return res.data;
  }
);

export const deleteField = createAsyncThunk(
  DELETE_FIELD,
  async (id) => {
    await FieldService.delete(id);
    return { id };
  }
);

export const deleteAllFields = createAsyncThunk(
  DELETE_ALL_FIELD,
  async () => {
    const res = await FieldService.deleteAll();
    return res.data;
  }
);

// Cấu hình slice
export const fieldSlice = createSlice({
  name: "admin.fields",  // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
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
    [createField.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, [action.payload.id]: action.payload}
      return state
    },
    [updateField.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, [action.payload.id]: action.payload}
      return state
    },
    [deleteField.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = _.omit(state.data, action.payload.id)
      return state
    },
  }
});


const { reducer } = fieldSlice;
export default reducer;