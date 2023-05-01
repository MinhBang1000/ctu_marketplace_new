// store/domain.js
import _ from 'lodash';

import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import DomainService from "../services/admin.domain.service";

const GET_DOMAINS = 'admin/domain/getAll';
const GET_DOMAIN = 'admin/domain/getById';
const CREATE_DOMAIN = 'admin/domain/create';
const UPDATE_DOMAIN = 'admin/domain/update';
const DELETE_DOMAIN = 'admin/domain/delete';
const DELETE_ALL_DOMAIN = 'admin/domain/delete/all';

// Khởi tạo state cho slice, có thể kèm giá trị mặc định ban đầu
const initialState = { data: [], isloading: false };

export const retrieveDomains = createAsyncThunk(
  GET_DOMAINS,
  async () => {
    const res = await DomainService.getAll();
    return res.data.data;
  }
);

export const retrieveDomainById = createAsyncThunk(
  GET_DOMAIN,
  async ( id ) => {
    const res = await DomainService.getById(id);
    return res.data;
  }
);

export const createDomain = createAsyncThunk(
  CREATE_DOMAIN,
  async (data) => {
    try {
      const res = await DomainService.create(data);
      return res.data.data;

    } catch (error) {
        if(!error.response) {
          throw error;
        }

        return { ...data, error: error.response.data.message }
    }
  }
);

export const updateDomain = createAsyncThunk(
  UPDATE_DOMAIN,
  async (data) => {
    try {
        const res = await DomainService.update(data.id, data);
        return res.data.data;
    } catch (error) {
        if(!error.response) {
          throw error;
        }

        return { ...data, error: error.response.data.message }
    }

  }
);

export const deleteDomain = createAsyncThunk(
  DELETE_DOMAIN,
  async (id) => {
    try {
      await DomainService.delete(id);
      return { id };

    } catch (error) {
        if(!error.response) {
          throw error;
        }

        return { id, error: error.response.data.message }
    }  
  }
);

export const deleteAllDomains = createAsyncThunk(
  DELETE_ALL_DOMAIN,
  async () => {
    const res = await DomainService.deleteAll();
    return res.data;
  }
);

// Cấu hình slice
export const domainSlice = createSlice({
  name: "admin.domains",  // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
  initialState,
  // Reducers chứa các hàm xử lý cập nhật state
  extraReducers: {
    [retrieveDomains.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = _.mapKeys(action.payload, 'id');
      return state
    },
    [retrieveDomainById.fulfilled]: (state, action) => {
      return { ...state, [action.payload.id]: action.payload };
    },
    [createDomain.fulfilled]: (state, action) => {
      state.isloading = false;
      if(!action.payload.error) {
        state.data = {...state.data, [action.payload.id]: action.payload}
      }
      return state
    },
    [updateDomain.fulfilled]: (state, action) => {
      state.isloading = false;
      if(!action.payload.error) {
        state.data = {...state.data, [action.payload.id]: action.payload}
      }
      return state
    },
    [deleteDomain.fulfilled]: (state, action) => {
      state.isloading = false;
      if(!action.payload.error) {
        state.data = {...state.data, [action.payload.id]: action.payload}
      }
      state.data = _.omit(state.data, action.payload.id)
      return state
    },
  }
});


const { reducer } = domainSlice;
export default reducer;