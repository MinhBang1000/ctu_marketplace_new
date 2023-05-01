// store/researcher.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ResearcherProfileService from "../services/researcher.profile.service";

const UPDATE_PROFILE = 'user/researcher/update';
const CHANGE_PASSWORD = 'user/researcher/change-password';

// Khởi tạo state cho slice, có thể kèm giá trị mặc định ban đầu
const initialState = { data: [], isloading: false };

export const updateProfile = createAsyncThunk(
  UPDATE_PROFILE,
  async (data) => {
    const res = await ResearcherProfileService.updateProfile(data.id, data);
    return res.data.data;
  }
);

export const changePassword = createAsyncThunk(
  CHANGE_PASSWORD,
  async (data) => {
    try {
      const res = await ResearcherProfileService.changePassword(data.id, data.data);
      return res.data.data;
    } catch (error) {
        if(!error.response) {
          throw error;
        }

        return { ...data, error: error.response.data.message }
    }
  }
);

// Cấu hình slice
export const researcherProfileSlice = createSlice({
  name: "researcher.profile",  // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
  initialState,
  // Reducers chứa các hàm xử lý cập nhật state
  extraReducers: {
    [updateProfile.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, [action.payload.id]: action.payload}
      return state
    },
    [changePassword.fulfilled]: (state, action) => {
      state.isloading = false;
      if(!action.payload.error) {
        state.data = {...state.data, [action.payload.id]: action.payload}
      }
      return state
    }
  }
});


const { reducer } = researcherProfileSlice;
export default reducer;