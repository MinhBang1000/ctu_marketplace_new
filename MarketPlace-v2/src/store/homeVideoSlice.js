// store/faqSlice.js
import _ from "lodash";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import HomeVideoService from "../services/homeVideo.service";

const GET_HOME_VIDEO = "homeVideo/getAll";
const initialState = { data: [], isloading: false };

export const retrieveHomeVideoById = createAsyncThunk(GET_HOME_VIDEO, async (id) => {
  const res = await HomeVideoService.getById(id);
  return res.data.data;
});

export const homeVideoSlice = createSlice({
  name: "homeVideo",
  initialState,
  extraReducers: {
    [retrieveHomeVideoById.pending]: (state, action) => {
      state.isloading = true;
      return state;
    },
    [retrieveHomeVideoById.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = { ...state.data, ..._.mapKeys(action.payload, "id") };
      return state;
    },
    [retrieveHomeVideoById.rejected]: (state, action) => {
      state.isloading = true;
      return state;
    },
  },
});

const { reducer } = homeVideoSlice;
export default reducer;
