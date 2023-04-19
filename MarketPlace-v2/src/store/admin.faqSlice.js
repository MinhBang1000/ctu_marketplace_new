// store/admin.faqSlice.js
import _ from 'lodash';

import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";

import FaqService from "../services/admin.faq.service";

const GET_FAQS = 'admin/faq/getAll';
const GET_FAQ = 'admin/faq/getById';
const CREATE_FAQ = 'admin/faq/create';
const UPDATE_FAQ = 'admin/faq/update';
const DELETE_FAQ = 'admin/faq/delete';
const DELETE_ALL_FAQ = 'admin/faq/delete/all';

// Khởi tạo state cho slice, có thể kèm giá trị mặc định ban đầu
const initialState = { data: [], isloading: false };

export const retrieveFaqs = createAsyncThunk(
  GET_FAQS,
  async () => {
    const res = await FaqService.getAll();
    return res.data.data;
  }
);

export const retrieveFaq = createAsyncThunk(
  GET_FAQ,
  async ({ id }) => {
    const res = await FaqService.getById(id);
    return res.data;
  }
);

export const createFaq = createAsyncThunk(
  CREATE_FAQ,
  async (data) => {
    try {
      const res = await FaqService.create(data);
      return res.data.data;

    } catch (error) {
        if(!error.response) {
          throw error;
        }

        return { ...data, error: error.response.data.message }
    }
  }
);

export const updateFaq = createAsyncThunk(
  UPDATE_FAQ,
  async (data) => {
    try {
        const res = await FaqService.update(data.id, data);
        return res.data.data;
    } catch (error) {
        if(!error.response) {
          throw error;
        }

        return { ...data, error: error.response.data.message }
    }

  }
);

export const deleteFaq = createAsyncThunk(
  DELETE_FAQ,
  async (id) => {
    try {
      await FaqService.delete(id);
      return { id };

    } catch (error) {
        if(!error.response) {
          throw error;
        }

        return { id, error: error.response.data.message }
    }  
  }
);


export const deleteAllFaqs = createAsyncThunk(
  DELETE_ALL_FAQ,
  async () => {
    const res = await FaqService.deleteAll();
    return res.data;
  }
);

// Cấu hình slice
export const faqSlice = createSlice({
  name: "admin.faqs",  // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
  initialState,
  // Reducers chứa các hàm xử lý cập nhật state
  extraReducers: {
    [retrieveFaqs.pending]: (state, action) => {
      state.isloading = true;
      return state
    },
    [retrieveFaqs.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, ..._.mapKeys(action.payload, 'id')}
      return state
    },
    [retrieveFaqs.rejected]: (state, action) => {
      state.isloading = true;
      return state
    },
    [retrieveFaq.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, [action.payload.id]: action.payload}
      return state
    },
    [createFaq.fulfilled]: (state, action) => {
      state.isloading = false;
      if(!action.payload.error) {
        state.data = {...state.data, [action.payload.id]: action.payload}
      }
      return state
    },
    [updateFaq.fulfilled]: (state, action) => {
      state.isloading = false;
      if(!action.payload.error) {
        state.data = {...state.data, [action.payload.id]: action.payload}
      }
      return state
    },
    [deleteFaq.fulfilled]: (state, action) => {
      state.isloading = false;
      if(!action.payload.error) {
        state.data = {...state.data, [action.payload.id]: action.payload}
      }
      state.data = _.omit(state.data, action.payload.id)
      return state
    },
  }
});


const { reducer } = faqSlice;
export default reducer;