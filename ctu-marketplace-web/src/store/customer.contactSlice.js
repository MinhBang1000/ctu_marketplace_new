// store/customer.contactSlice.js
import _ from 'lodash';

import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";

import CustomerContactService from "../services/customer.contact.service";

const GET_CUSTOMER_CONTACTS = 'customer/contact/getAll';
const GET_CUSTOMER_CONTACT = 'customer/contact/getById';
const CREATE_CUSTOMER_CONTACT = 'customer/contact/create';
const UPDATE_CUSTOMER_CONTACT = 'customer/contact/update';
const DELETE_CUSTOMER_CONTACT = 'customer/contact/delete';
const DELETE_ALL_CUSTOMER_CONTACT = 'customer/contact/delete/all';

// Khởi tạo state cho slice, có thể kèm giá trị mặc định ban đầu
const initialState = { data: [], isloading: false };

export const retrieveCustomerContacts = createAsyncThunk(
  GET_CUSTOMER_CONTACTS,
  async () => {
    const res = await CustomerContactService.getAll();
    return res.data.data;
  }
);

export const retrieveCustomerContact = createAsyncThunk(
  GET_CUSTOMER_CONTACT,
  async (id) => {
    const res = await CustomerContactService.getById(id);
    return res.data;
  }
);

export const createCustomerContact = createAsyncThunk(
  CREATE_CUSTOMER_CONTACT,
  async (data) => {
    const res = await CustomerContactService.create(data);
    return res.data.data;
  }
);

export const updateCustomerContact = createAsyncThunk(
  UPDATE_CUSTOMER_CONTACT,
  async (data) => {
    const res = await CustomerContactService.update(data.id, data);
    return res.data.data;
  }
);

export const deleteCustomerContact = createAsyncThunk(
  DELETE_CUSTOMER_CONTACT,
  async (id) => {
    await CustomerContactService.delete(id);
    return { id };
  }
);

export const deleteAllCustomerContacts = createAsyncThunk(
  DELETE_ALL_CUSTOMER_CONTACT,
  async () => {
    const res = await CustomerContactService.deleteAll();
    return res.data;
  }
);

// Cấu hình slice
export const customerContactSlice = createSlice({
  name: "customer.contact",  // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
  initialState,
  // Reducers chứa các hàm xử lý cập nhật state
  extraReducers: {
    [retrieveCustomerContacts.pending]: (state, action) => {
      state.isloading = true;
      return state
    },
    [retrieveCustomerContacts.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, ..._.mapKeys(action.payload, 'id')}
      return state
    },
    [retrieveCustomerContacts.rejected]: (state, action) => {
      state.isloading = true;
      return state
    },
    [retrieveCustomerContact.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, [action.payload.id]: action.payload}
      return state
    },
    [createCustomerContact.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, [action.payload.id]: action.payload}
      return state
    },
    [updateCustomerContact.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, [action.payload.id]: action.payload}
      return state
    },
    [deleteCustomerContact.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = _.omit(state.data, action.payload.id)
      return state
    },
  }
});


const { reducer } = customerContactSlice;
export default reducer;