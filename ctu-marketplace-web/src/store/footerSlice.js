// store/footerSlice.js
import _ from 'lodash';

import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";

import FooterService from "../services/footer.service";

const GET_FOOTERS = 'footer/getAll';
const GET_FOOTER_BY_ID = 'footer/getById';

// Khởi tạo state cho slice, có thể kèm giá trị mặc định ban đầu
const initialState = { data: [], isloading: false };

export const retrieveFooters = createAsyncThunk(
  GET_FOOTERS,
  async () => {
    const res = await FooterService.getAll();
    return res.data.data;
  }
);

export const retrieveFooterById = createAsyncThunk(
  GET_FOOTER_BY_ID,
  async (id) => {
    const res = await FooterService.getById(id);
    return res.data.data;
  }
);


// Cấu hình slice
export const footerSlice = createSlice({
  name: "footers",  // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
  initialState,
  // Reducers chứa các hàm xử lý cập nhật state
  extraReducers: {
    [retrieveFooters.pending]: (state, action) => {
      state.isloading = true;
      return state
    },
    [retrieveFooters.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, ..._.mapKeys(action.payload, 'id')}
      return state
    },
    [retrieveFooters.rejected]: (state, action) => {
      state.isloading = true;
      return state
    },

    [retrieveFooterById.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, [action.payload.id]: action.payload}
      return state
    },
  }
});


const { reducer } = footerSlice;
export default reducer;