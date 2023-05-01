import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const SET_FILTER_PROJECT_FIELD = 'filterProjectField';

const initialState = {};

export const setFilterProjectField = createAsyncThunk(
  SET_FILTER_PROJECT_FIELD,
  async (projectField) => {
    return projectField;
  }
);


// Cấu hình slice
export const filterProjectFieldSlice = createSlice({
  name: "load",  
  initialState,
  extraReducers: {
    [setFilterProjectField.fulfilled]: (state, action) => {
      return action.payload;
    },
  }
});


const { reducer } = filterProjectFieldSlice;
export default reducer;