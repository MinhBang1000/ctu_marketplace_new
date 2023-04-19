// store/admin.faqSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import HomeVideoAdminService from "../services/admin.homeVideo.service";

const GET_HOME_VIDEO = "admin/homeVideo.Admin/getById";
const UPDATE_HOME_VIDEO = "admin/homeVideo.Admin/update";

const initialState = { data: [], isloading: false };

export const retrieveHomeVideoById = createAsyncThunk(GET_HOME_VIDEO, async (id) => {
  const res = await HomeVideoAdminService.getById(id);
  return res.data;
});

export const updateHomeVideoById = createAsyncThunk(UPDATE_HOME_VIDEO, async (data) => {
  console.log("updateHomeVideoById data", data);
  try {
    const res = await HomeVideoAdminService.update(data.id, data);
    return res.data.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }

    return { ...data, error: error.response.data.message };
  }
});

export const homeVideoAdminSlice = createSlice({
  name: "admin.home.video",
  initialState,
  extraReducers: {
    [retrieveHomeVideoById.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = { ...state.data, [action.payload.id]: action.payload };
      return state;
    },
    [updateHomeVideoById.fulfilled]: (state, action) => {
      state.isloading = false;
      if (!action.payload.error) {
        state.data = { ...state.data, [action.payload.id]: action.payload };
      }
      return state;
    },
  },
});

const { reducer } = homeVideoAdminSlice;
export default reducer;
