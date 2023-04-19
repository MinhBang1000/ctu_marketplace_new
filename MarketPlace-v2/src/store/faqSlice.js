// store/faqSlice.js
import _ from 'lodash';

import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";

import FaqService from "../services/faq.service";

const GET_FAQS = 'faq/getAll';

// Khởi tạo state cho slice, có thể kèm giá trị mặc định ban đầu
const initialState = { data: [], isloading: false };

export const retrieveFaqs = createAsyncThunk(
  GET_FAQS,
  async () => {
    const res = await FaqService.getAll();
    return res.data.data;
  }
);

// Cấu hình slice
export const faqSlice = createSlice({
  name: "faqs",  // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
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
  }
});


const { reducer } = faqSlice;
export default reducer;