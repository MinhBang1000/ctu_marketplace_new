// store/admin.roleOfGroup.js
import _ from 'lodash';

import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import RoleOfGroupService from "../services/admin.roleOfGroup.service";

const GET_ROLE_OF_GROUPS = 'admin/role-of-group/getAll';
const GET_ROLE_OF_GROUP = 'admin/role-of-group/getById';
const CREATE_ROLE_OF_GROUP = 'admin/role-of-group/create';
const UPDATE_ROLE_OF_GROUP = 'admin/role-of-group/update';
const DELETE_ROLE_OF_GROUP = 'admin/role-of-group/delete';
const DELETE_ALL_ROLE_OF_GROUPS = 'admin/role-of-group/delete/all';

// Khởi tạo state cho slice, có thể kèm giá trị mặc định ban đầu
const initialState = { data: [], isloading: false };

export const retrieveRoleOfGroups = createAsyncThunk(
  GET_ROLE_OF_GROUPS,
  async () => {
    const res = await RoleOfGroupService.getAll();
    return res.data.data;
  }
);

export const retrieveRoleOfGroupById = createAsyncThunk(
  GET_ROLE_OF_GROUP,
  async ( id ) => {
    const res = await RoleOfGroupService.getById(id);
    return res.data;
  }
);

export const createRoleOfGroup = createAsyncThunk(
  CREATE_ROLE_OF_GROUP,
  async ({ title, description }) => {
    const res = await RoleOfGroupService.create({ title, description });
    return res.data;
  }
);

export const updateRoleOfGroup = createAsyncThunk(
  UPDATE_ROLE_OF_GROUP,
  async ({ id, data }) => {
    const res = await RoleOfGroupService.update(id, data);
    return res.data;
  }
);

export const deleteRoleOfGroup = createAsyncThunk(
  DELETE_ROLE_OF_GROUP,
  async ({ id }) => {
    await RoleOfGroupService.delete(id);
    return { id };
  }
);

export const deleteAllRoleOfGroups = createAsyncThunk(
  DELETE_ALL_ROLE_OF_GROUPS,
  async () => {
    const res = await RoleOfGroupService.deleteAll();
    return res.data;
  }
);

// Cấu hình slice
export const roleOfGroupSlice = createSlice({
  name: "admin.roleOfGroup",  // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
  initialState,
  // Reducers chứa các hàm xử lý cập nhật state
  extraReducers: {
    [retrieveRoleOfGroups.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = _.mapKeys(action.payload, 'id');
      return state
    },
    [retrieveRoleOfGroupById.fulfilled]: (state, action) => {
      return { ...state, [action.payload.id]: action.payload };
    },
  }
});


const { reducer } = roleOfGroupSlice;
export default reducer;