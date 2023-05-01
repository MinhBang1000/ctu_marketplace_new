// store/projectCommercial.js
import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import _ from "lodash";
import ProjectService from "../services/projectCommerical.service";

const GET_PROJECTS = 'project/commercial/getAll';
const GET_PROJECT = 'project/commercial/getById';
const CREATE_PROJECT = 'project/commercial/create';
const UPDATE_PROJECT = 'project/commercial/update';
const DELETE_PROJECT = 'project/commercial/delete';
const DELETE_ALL_PROJECT = 'project/commercial/delete/all';

// Khởi tạo state cho slice, có thể kèm giá trị mặc định ban đầu
const initialState = { data: [], isloading: false };

export const retrieveProjects = createAsyncThunk(
  GET_PROJECTS,
  async () => {
    const res = await ProjectService.getAll();
    return res.data.data;
  }
);

export const retrieveCommercialProjectById = createAsyncThunk(
  GET_PROJECT,
  async ( id ) => {
    const res = await ProjectService.getCommercialById(id);
    return res.data.data;
  }
);

export const retrieveResearchingProjectById = createAsyncThunk(
  GET_PROJECT,
  async ( id ) => {
    const res = await ProjectService.getResearchingById(id);
    return res.data.data;
  }
);

export const retrieveIdeaProjectById = createAsyncThunk(
  GET_PROJECT,
  async ( id ) => {
    const res = await ProjectService.getIdeaById(id);
    return res.data.data;
  }
);

export const createResearchGroup = createAsyncThunk(
  CREATE_PROJECT,
  async (data) => {
    const res = await ProjectService.create(data);
    return res.data.data;
  }
);

export const updateResearchGroup = createAsyncThunk(
  UPDATE_PROJECT,
  async (data) => {
    const res = await ProjectService.update(data.id, data);
    return res.data.data;
  }
);

export const deleteTutorial = createAsyncThunk(
  DELETE_PROJECT,
  async (id) => {
    await ProjectService.delete(id);
    return { id };
  }
);

export const deleteAllTutorials = createAsyncThunk(
  DELETE_ALL_PROJECT,
  async () => {
    const res = await ProjectService.deleteAll();
    return res.data.data;
  }
);

// Cấu hình slice
export const projectCommercialSlice = createSlice({
  name: "projectsCommercial",  // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
  initialState,
  // Reducers chứa các hàm xử lý cập nhật state
  extraReducers: {
    [retrieveProjects.pending]: (state, action) => {
      state.isloading = true;
      return state
    },
    [retrieveProjects.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, ..._.mapKeys(action.payload, 'id')}
      return state
    },
    [retrieveProjects.rejected]: (state, action) => {
      state.isloading = true;
      return state
    },
    [retrieveCommercialProjectById.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, [action.payload.id]: action.payload}
      return state
    },
    [retrieveCommercialProjectById.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, [action.payload.id]: action.payload}
      return state
    },
    [retrieveResearchingProjectById.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, [action.payload.id]: action.payload}
      return state
    },
    [retrieveIdeaProjectById.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, [action.payload.id]: action.payload}
      return state
    },
  }
});


const { reducer } = projectCommercialSlice;
export default reducer;