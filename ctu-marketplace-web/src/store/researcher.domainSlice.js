import _ from 'lodash';

import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import DomainService from "../services/researcher.domain.service";

const GET_DOMAINS = 'researcher/domain/getAll';
const GET_DOMAIN = 'researcher/domain/getById';
const CREATE_DOMAIN = 'researcher/domain/create';
const UPDATE_DOMAIN = 'researcher/domain/update';
const DELETE_DOMAIN = 'researcher/domain/delete';
const DELETE_ALL_DOMAIN = 'researcher/domain/delete/all';

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
  async ({ title, description }) => {
    const res = await DomainService.create({ title, description });
    return res.data;
  }
);

export const updateDomain = createAsyncThunk(
  UPDATE_DOMAIN,
  async ({ id, data }) => {
    const res = await DomainService.update(id, data);
    return res.data;
  }
);

export const deleteDomain = createAsyncThunk(
  DELETE_DOMAIN,
  async ({ id }) => {
    await DomainService.delete(id);
    return { id };
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
  name: "researcher.domains",  // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
  initialState,
  // Reducers chứa các hàm xử lý cập nhật state
  extraReducers: {
    [retrieveDomains.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, ..._.mapKeys(action.payload, 'id')}
      return state
    },
    [retrieveDomainById.fulfilled]: (state, action) => {
      return { ...state, [action.payload.id]: action.payload };
    },
  }
});


const { reducer } = domainSlice;
export default reducer;