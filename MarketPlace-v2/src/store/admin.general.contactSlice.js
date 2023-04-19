// store/general.contactSlice.js
import _ from 'lodash';

import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";

import GeneralContactService from "../services/admin.general.contact.service";

const GET_GENERAL_CONTACTS = 'admin/general/contact/getAll';
const GET_GENERAL_CONTACT = 'admin/general/contact/getById';
const CREATE_GENERAL_CONTACT = 'admin/general/contact/create';
const UPDATE_GENERAL_CONTACT = 'admin/general/contact/update';
const DELETE_GENERAL_CONTACT = 'admin/general/contact/delete';
const DELETE_ALL_GENERAL_CONTACT = 'admin/general/contact/delete/all';

// Khởi tạo state cho slice, có thể kèm giá trị mặc định ban đầu
const initialState = { data: [], isloading: false };

export const retrieveGeneralContacts = createAsyncThunk(
  GET_GENERAL_CONTACTS,
  async () => {
    const res = await GeneralContactService.getAll();
    return res.data.data;
  }
);

export const retrieveGeneralContact = createAsyncThunk(
  GET_GENERAL_CONTACT,
  async (id) => {
    const res = await GeneralContactService.getById(id);
    return res.data.data;
  }
);

export const createGeneralContact = createAsyncThunk(
  CREATE_GENERAL_CONTACT,
  async (data) => {
    const res = await GeneralContactService.create(data);
    return res.data.data;
  }
);

export const updateGeneralContact = createAsyncThunk(
  UPDATE_GENERAL_CONTACT,
  async (data) => {
    const res = await GeneralContactService.update(data.id, data);
    return res.data.data;
  }
);

export const deleteGeneralContact = createAsyncThunk(
  DELETE_GENERAL_CONTACT,
  async (id) => {
    await GeneralContactService.delete(id);
    return { id };
  }
);

export const deleteAllGeneralContacts = createAsyncThunk(
  DELETE_ALL_GENERAL_CONTACT,
  async () => {
    const res = await GeneralContactService.deleteAll();
    return res.data;
  }
);

// Cấu hình slice
export const generalContactSlice = createSlice({
  name: "admin.general.contact",  // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
  initialState,
  // Reducers chứa các hàm xử lý cập nhật state
  extraReducers: {
    [retrieveGeneralContacts.pending]: (state, action) => {
      state.isloading = true;
      return state
    },
    [retrieveGeneralContacts.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, ..._.mapKeys(action.payload, 'content')}
      return state
    },
    [retrieveGeneralContacts.rejected]: (state, action) => {
      state.isloading = true;
      return state
    },
    [retrieveGeneralContact.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, [action.payload.id]: action.payload}
      return state
    },
    [createGeneralContact.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, [action.payload.id]: action.payload}
      return state
    },
    [updateGeneralContact.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, [action.payload.id]: action.payload}
      return state
    },
    [deleteGeneralContact.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = _.omit(state.data, action.payload.id)
      return state
    },
  }
});


const { reducer } = generalContactSlice;
export default reducer;