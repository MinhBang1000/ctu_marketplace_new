// store/contactSlice.js
import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";

import UserService from "../services/user.service";

const CREATE_NORMAL_USER = 'user/create/normal-user';
const CREATE_RESEARCHER_USER = 'user/create/researcher-user';

// Khởi tạo state cho slice, có thể kèm giá trị mặc định ban đầu
const initialState = { data: [], isloading: false };

export const createNormalUser = createAsyncThunk(
  CREATE_NORMAL_USER,
  async (data) => {
    try {
      const res = await UserService.createPublicNormal(data);
      return res.data.data;
    } catch (error) {
      alert(`Tạo người dùng không thành công !!!`)
    }
  }
);

export const createResearcher = createAsyncThunk(
  CREATE_RESEARCHER_USER,
  async (data) => {
    try {
      const res = await UserService.createPublicResearcher(data);
      return res.data.data;
    } catch (error) {
      alert(`Tạo người dùng không thành công !!!`)
    }
  }
);

// Cấu hình slice
export const contactSlice = createSlice({
  name: "user.public",  // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
  initialState,
  // Reducers chứa các hàm xử lý cập nhật state
  extraReducers: {
    [createNormalUser.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, [action.payload.id]: action.payload}
      return state
    },

    [createResearcher.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, [action.payload.id]: action.payload}
      return state
    },
  }
});


const { reducer } = contactSlice;
export default reducer;