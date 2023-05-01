// store/project.js
import _ from 'lodash';

import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import ProjectService from "../services/project.service";

const GET_PROJECTS = 'project/getAll';
const GET_PROJECTS_BY_STATUS = 'project/getAllByStatus';
const GET_PROJECT = 'project/getById';
const CREATE_PROJECT = 'project/create';
const UPDATE_PROJECT = 'project/update';
const DELETE_PROJECT = 'project/delete';
const DELETE_ALL_PROJECT = 'project/delete/all';

// Khởi tạo state cho slice, có thể kèm giá trị mặc định ban đầu
const initialState = { data: [], isloading: false };

export const retrieveProjects = createAsyncThunk(
  GET_PROJECTS,
  async () => {
    const res = await ProjectService.getAll();
    return res.data.data;
  }
);

export const retrieveCommercialProjects = createAsyncThunk(
  GET_PROJECTS,
  async () => {
    const res = await ProjectService.getAllCommercialProject();
    return res.data.data;
  }
);

export const retrieveResearchingProjects = createAsyncThunk(
  GET_PROJECTS,
  async () => {
    const res = await ProjectService.getAllResearchingProject();
    return res.data.data;
  }
);

export const retrieveIdeaProjects = createAsyncThunk(
  GET_PROJECTS,
  async () => {
    const res = await ProjectService.getAllIdeaProject();
    return res.data.data;
  }
);

export const retrieveProjectsByStatus = createAsyncThunk(
  GET_PROJECTS_BY_STATUS,
  async (statusId) => {
    const res = await ProjectService.getAllIdeaProject(statusId);
    return res.data.data;
  }
);

export const retrieveProjectById = createAsyncThunk(
  GET_PROJECT,
  async ( id ) => {
    const res = await ProjectService.getById(id);
    return res.data.data;
  }
);

export const createProject = createAsyncThunk(
  CREATE_PROJECT,
  async (data) => {
    const res = await ProjectService.create(data);
    return res.data.data;
  }
);

export const updateProject = createAsyncThunk(
  UPDATE_PROJECT,
  async (data) => {
    const res = await ProjectService.update(data.id, data);
    return res.data.data;
  }
);

export const deleteProject = createAsyncThunk(
  DELETE_PROJECT,
  async (id) => {
    await ProjectService.delete(id);
    return { id };
  }
);

export const deleteAllProjects = createAsyncThunk(
  DELETE_ALL_PROJECT,
  async () => {
    const res = await ProjectService.deleteAll();
    return res.data.data;
  }
);

// Cấu hình slice
export const projectSlice = createSlice({
  name: "projects",  // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
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
    
    [retrieveCommercialProjects.pending]: (state, action) => {
      state.isloading = true;
      return state
    },
    [retrieveCommercialProjects.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, ..._.mapKeys(action.payload, 'id')}
      return state
    },
    [retrieveCommercialProjects.rejected]: (state, action) => {
      state.isloading = true;
      return state
    },
    
    [retrieveResearchingProjects.pending]: (state, action) => {
      state.isloading = true;
      return state
    },
    [retrieveResearchingProjects.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, ..._.mapKeys(action.payload, 'id')}
      return state
    },
    [retrieveResearchingProjects.rejected]: (state, action) => {
      state.isloading = true;
      return state
    },
    
    [retrieveIdeaProjects.pending]: (state, action) => {
      state.isloading = true;
      return state
    },
    [retrieveIdeaProjects.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, ..._.mapKeys(action.payload, 'id')}
      return state
    },
    [retrieveIdeaProjects.rejected]: (state, action) => {
      state.isloading = true;
      return state
    },
    
    [createProject.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, [action.payload.id]: action.payload}
      return state
    },
    [updateProject.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, [action.payload.id]: action.payload}
      return state
    },
    [deleteProject.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = _.omit(state.data, action.payload.id)
      return state
    },
  }
});


const { reducer } = projectSlice;
export default reducer;