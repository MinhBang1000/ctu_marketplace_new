// store/project.js
import _ from 'lodash';

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserService from "../services/user.service";

const GET_USERS = 'user/getAll';
const GET_USER_BY_ID = 'user/getById';

const CREATE_USER_RESEARCHER = 'user/researcher/create';
const UPDATE_USER_RESEARCHER = 'user/researcher/update';

const CREATE_USER_ADMIN = 'user/admin/create';
const UPDATE_USER_ADMIN = 'user/admin/update';

const DELETE_USER_BY_ID = 'user/deleteById';

const ENABLE_USER_ADMIN = 'user/admin/enable-user';

// Khởi tạo state cho slice, có thể kèm giá trị mặc định ban đầu
const initialState = { data: [], isloading: false };

export const retrieveUsers = createAsyncThunk(
  GET_USERS,
  async () => {
    const res = await UserService.getAll();
    return res.data.data;
  }
);

export const retrieveUsersByUserId = createAsyncThunk(
  GET_USERS,
  async (id) => {
    const res = await UserService.getAllByUserId(id);
    return res.data.data;
  }
);

export const retrieveResearcherUsers = createAsyncThunk(
  GET_USERS,
  async () => {
    const res = await UserService.getAllResearchers();
    return res.data.data;
  }
);

export const retrieveUserById = createAsyncThunk(
  GET_USER_BY_ID,
  async ( id ) => {
    const res = await UserService.getById(id);
    return res.data.data;
  }
);

export const retrieveUserByUsername = createAsyncThunk(
  GET_USER_BY_ID,
  async ( username ) => {
    const res = await UserService.getByUsername(username);
    return res.data.data;
  }
);

// Researcher
export const createResearcher = createAsyncThunk(
  CREATE_USER_RESEARCHER,
  async ( data ) => {
    try {
      const res = await UserService.createResearcher(data)
      return res.data.data;
    }
    catch (error) {
      alert(`Tên đăng nhập đã tồn tại !!!`)
    }
    
  }
);
export const updateResearcher = createAsyncThunk(
  UPDATE_USER_RESEARCHER,
  async (data) => {
    try {
      const res = await UserService.updateResearcher(data.id, data);
      return res.data.data;
    } catch (error) {
      alert(`Cập nhật nhà nghiên cứu thất bại !!!`) 
    }
  }
);

// Admin
export const createAdmin = createAsyncThunk(
  CREATE_USER_ADMIN,
  async ( data ) => {
    try {
      const res = await UserService.createAdmin(data);
      return res.data.data;
    } catch (error) {
      alert(`Tên đăng nhập đã tồn tại !!!`)
    }
      
  }
);
export const updateAdmin = createAsyncThunk(
  UPDATE_USER_ADMIN,
  async (data) => {
    try {
      const res = await UserService.updateAdmin(data.id, data);
      return res.data.data;
    } catch (error) {
      alert(`Cập nhật quản trị viên thất bại !!!`) 
    }
  }
);

export const deleteUserByUsername = createAsyncThunk(
  DELETE_USER_BY_ID,
  async (username) => {
    try {
      await UserService.deleteByUsername(username);
      return { isSuccess: true };

    } catch (error) {
        if(!error.response) {
          throw error;
        }

        return { username, error: error.response.data.message }
    }   
  }
);

// Phan quyen
export const updateAdminFunctionStatus = createAsyncThunk(
  UPDATE_USER_ADMIN,
  async (data) => {
    const res = await UserService.updateAdminFunctionStatus(data);
    return res.data.data;
  }
);

// Enable user
export const enableUser = createAsyncThunk(
  ENABLE_USER_ADMIN,
  async (data) => {
    const { userId, isEnabled } = data;
    const res = await UserService.enableUser(userId, isEnabled);
    return res.data.data;
  }
);

// Cấu hình slice
export const projectSlice = createSlice({
  name: "admin.users",  // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
  initialState,
  // Reducers chứa các hàm xử lý cập nhật state
  extraReducers: {
    [retrieveUsers.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = _.mapKeys(action.payload, 'id');
      return state
    },
    
    [retrieveUsersByUserId.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = _.mapKeys(action.payload, 'id');
      return state
    },
    
    [retrieveUserById.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, [action.payload.id]: action.payload}
      return state
    },
   
    [enableUser.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, [action.payload.id]: action.payload}
      return state
    },
   
    [retrieveUserByUsername.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, [action.payload.id]: action.payload}
      return state
    },
    
    // Researcher
    [createResearcher.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, [action.payload.id]: action.payload}
      return state
    },
    [updateResearcher.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, [action.payload.id]: action.payload}
      return state
    },
    
    // Admin
    [createAdmin.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, [action.payload.id]: action.payload}
      return state
    },
    [updateAdmin.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, [action.payload.id]: action.payload}
      return state
    },
  }
});


const { reducer } = projectSlice;
export default reducer;