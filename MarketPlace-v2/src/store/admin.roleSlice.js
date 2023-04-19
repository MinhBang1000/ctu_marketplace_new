// store/role.js
import _ from 'lodash';

import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import RoleService from "../services/admin.role.service";

const GET_ROLES = 'admin/role/getAll';
const GET_ROLE = 'admin/role/getById';
const CREATE_ROLE = 'admin/role/create';
const UPDATE_ROLE = 'admin/role/update';
const DELETE_ROLE = 'admin/role/delete';
const DELETE_ALL_ROLE = 'admin/role/delete/all';

// Khởi tạo state cho slice, có thể kèm giá trị mặc định ban đầu
const initialState = { data: [], isloading: false };

export const retrieveRoles = createAsyncThunk(
  GET_ROLES,
  async () => {
    const res = await RoleService.getAll();
    return res.data.data;
  }
);

export const retrieveRoleById = createAsyncThunk(
  GET_ROLE,
  async ( id ) => {
    const res = await RoleService.getById(id);
    return res.data.data;
  }
);

export const createRole = createAsyncThunk(
  CREATE_ROLE,
  async (data) => {
    try {
      const res = await RoleService.create(data);
      return res.data.data;

    } catch (error) {
        if(!error.response) {
          throw error;
        }

        return { ...data, error: error.response.data.message }
    }
  }
);

export const updateRole = createAsyncThunk(
  UPDATE_ROLE,
  async (data) => {
    try {
      const res = await RoleService.update(data.id, data);
      return res.data.data;
    } catch (error) {
        if(!error.response) {
          throw error;
        }

        return { ...data, error: error.response.data.message }
    }
  }
);

export const deleteRole = createAsyncThunk(
  DELETE_ROLE,
  async (id) => {
    try {
      await RoleService.delete(id);
      return { id };

    } catch (error) {
        if(!error.response) {
          throw error;
        }

        return { id, error: error.response.data.message }
    }   
  }
);

export const deleteAllRoles = createAsyncThunk(
  DELETE_ALL_ROLE,
  async () => {
    const res = await RoleService.deleteAll();
    return res.data.data;
  }
);

// Cấu hình slice
export const roleSlice = createSlice({
  name: "admin.roles",  // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
  initialState,
  // Reducers chứa các hàm xử lý cập nhật state
  extraReducers: {
    [retrieveRoles.pending]: (state, action) => {
      state.isloading = true;
      return state
    },
    [retrieveRoles.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, ..._.mapKeys(action.payload, 'id')}
      return state
    },
    [retrieveRoles.rejected]: (state, action) => {
      state.isloading = true;
      return state
    },
    [createRole.fulfilled]: (state, action) => {
      state.isloading = false;
      if(!action.payload.error) {
        state.data = {...state.data, [action.payload.id]: action.payload}
      }
      return state
    },
    [updateRole.fulfilled]: (state, action) => {
      state.isloading = false;
      if(!action.payload.error) {
        state.data = {...state.data, [action.payload.id]: action.payload}
      }
      return state
    },
    [deleteRole.fulfilled]: (state, action) => {
      state.isloading = false;
      if(!action.payload.error) {
        state.data = {...state.data, [action.payload.id]: action.payload}
      }
      state.data = _.omit(state.data, action.payload.id)
      return state
    },
  }
});


const { reducer } = roleSlice;
export default reducer;