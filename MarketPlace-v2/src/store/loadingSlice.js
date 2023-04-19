// store/faqSlice.js
import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";

const LOADING = 'load/loading';
const LOADED = 'load/loaded';


// Khởi tạo state cho slice, có thể kèm giá trị mặc định ban đầu
const initialState = false;

export const loading = createAsyncThunk(
  LOADING,
  async () => {
    return true;
  }
);

export const loaded = createAsyncThunk(
  LOADED,
  async () => {
    return false;
  }
);


// Cấu hình slice
export const loadSlice = createSlice({
  name: "load",  // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
  initialState,
  // Reducers chứa các hàm xử lý cập nhật state
  extraReducers: {
    [loading.fulfilled]: (state, action) => {
      return true;
    },
    [loaded.fulfilled]: (state, action) => {
      return false;
    },
  }
});


const { reducer } = loadSlice;
export default reducer;