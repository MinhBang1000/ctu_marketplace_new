// store/contactSlice.js
import _ from 'lodash';

import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";

import ContactService from "../services/contact.contact.service";

const GET_CONTACTS = 'contact/getAll';
const GET_CONTACT = 'contact/getById';
const CREATE_CONTACT = 'contact/create';
const UPDATE_CONTACT = 'contact/update';
const DELETE_CONTACT = 'contact/delete';
const DELETE_ALL_CONTACT = 'contact/delete/all';

// Khởi tạo state cho slice, có thể kèm giá trị mặc định ban đầu
const initialState = { data: [], isloading: false };

export const retrieveContacts = createAsyncThunk(
  GET_CONTACTS,
  async () => {
    const res = await ContactService.getAll();
    return res.data.data;
  }
);

export const retrieveContact = createAsyncThunk(
  GET_CONTACT,
  async (id) => {
    const res = await ContactService.getById(id);
    return res.data;
  }
);

export const createContact = createAsyncThunk(
  CREATE_CONTACT,
  async (data) => {
    const res = await ContactService.create(data);
    return res.data.data;
  }
);

export const updateContact = createAsyncThunk(
  UPDATE_CONTACT,
  async (data) => {
    const res = await ContactService.update(data.id, data);
    return res.data.data;
  }
);

export const deleteContact = createAsyncThunk(
  DELETE_CONTACT,
  async (id) => {
    await ContactService.delete(id);
    return { id };
  }
);

export const deleteAllContacts = createAsyncThunk(
  DELETE_ALL_CONTACT,
  async () => {
    const res = await ContactService.deleteAll();
    return res.data;
  }
);

// Cấu hình slice
export const contactSlice = createSlice({
  name: "contacts",  // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
  initialState,
  // Reducers chứa các hàm xử lý cập nhật state
  extraReducers: {
    [retrieveContacts.pending]: (state, action) => {
      state.isloading = true;
      return state
    },
    [retrieveContacts.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, ..._.mapKeys(action.payload, 'id')}
      return state
    },
    [retrieveContacts.rejected]: (state, action) => {
      state.isloading = true;
      return state
    },
    [retrieveContact.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, [action.payload.id]: action.payload}
      return state
    },
    [createContact.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, [action.payload.id]: action.payload}
      return state
    },
    [updateContact.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, [action.payload.id]: action.payload}
      return state
    },
    [deleteContact.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = _.omit(state.data, action.payload.id)
      return state
    },
  }
});


const { reducer } = contactSlice;
export default reducer;