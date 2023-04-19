import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import _ from "lodash";
import ProjectService from "../services/project.service";

const GET_PROJECTS = 'related-projects/getAll';

// Khởi tạo state cho slice, có thể kèm giá trị mặc định ban đầu
const initialState = { data: [], isloading: false };

export const retrieveRelatedProjectsByProjectId = createAsyncThunk(
  GET_PROJECTS,
  async (projectId) => {
    const res = await ProjectService.getRelatedProjectsByProjectId(projectId);
    return res.data.data;
  }
);

// Cấu hình slice
export const relatedProjectsSlice = createSlice({
  name: "relatedProjects",  // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
  initialState,
  // Reducers chứa các hàm xử lý cập nhật state
  extraReducers: {
    [retrieveRelatedProjectsByProjectId.pending]: (state, action) => {
      state.isloading = true;
      return state
    },
    [retrieveRelatedProjectsByProjectId.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, ..._.mapKeys(action.payload, 'id')}
      return state
    },
    [retrieveRelatedProjectsByProjectId.rejected]: (state, action) => {
      state.isloading = true;
      return state
    },
  }
});


const { reducer } = relatedProjectsSlice;
export default reducer;