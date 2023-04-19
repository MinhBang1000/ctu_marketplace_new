// store/researcher.projectSlice.js
import _ from 'lodash';

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProjectService from "../services/researcher.project.service";

const GET_PROJECTS_BY_USERID_PROJECTTYPR_STATUSID = 'researcher/project/getAllByUseridProjecttypeStatusid';
const GET_PROJECTS_BY_RESEARCHER_ID = 'researcher/project/getAll';
const GET_PROJECT = 'researcher/project/getById';
const CREATE_PROJECT = 'researcher/project/create';
const UPDATE_PROJECT = 'researcher/project/update';
const DELETE_PROJECT = 'researcher/project/delete';
const DELETE_ALL_PROJECT = 'researcher/project/delete/all';

// Khởi tạo state cho slice, có thể kèm giá trị mặc định ban đầu
const initialState = { data: [], isloading: false };

export const retrieveProjectsByUseridProjecttypeStatusid = createAsyncThunk(
  GET_PROJECTS_BY_USERID_PROJECTTYPR_STATUSID,
  async (data) => {
    const { userId, projectType, statusId } = data;
    const res = await ProjectService.getAllByUseridProjecttypeStatusid(userId, projectType, statusId);
    return res.data.data;
  }
);

export const retrieveProjectsByResearcherId = createAsyncThunk(
  GET_PROJECTS_BY_RESEARCHER_ID,
  async (researcherId) => {
    const res = await ProjectService.getAllByResearcherId(researcherId);
    return res.data.data;
  }
);

export const retrieveCommercialProjects = createAsyncThunk(
  GET_PROJECTS_BY_RESEARCHER_ID,
  async (researcherId) => {
    const res = await ProjectService.getAllCommercial(researcherId);
    return res.data.data;
  }
);

export const retrieveProjectById = createAsyncThunk(
  GET_PROJECT,
  async ( id ) => {
    const res = await ProjectService.getCommercialById(id);
    return res.data.data;
  }
);

export const retrieveCommercialsByResearcherId = createAsyncThunk(
  GET_PROJECT,
  async ( id ) => {
    const res = await ProjectService.getAllCommercial(id);
    return res.data.data;
  }
);

export const retrieveCommercialById = createAsyncThunk(
  GET_PROJECT,
  async ( id ) => {
    const res = await ProjectService.getCommercialById(id);
    return res.data.data;
  }
);

export const retrieveResearchingById = createAsyncThunk(
  GET_PROJECT,
  async ( id ) => {
    const res = await ProjectService.getResearchingById(id);
    return res.data.data;
  }
);

export const retrieveIdeaById = createAsyncThunk(
  GET_PROJECT,
  async ( id ) => {
    const res = await ProjectService.getIdeaById(id);
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

export const deleteProjectById = createAsyncThunk(
  DELETE_PROJECT,
  async (id) => {
    
    try {
      await ProjectService.deleteProjectById(id);
      return { id };

    } catch (error) {
        if(!error.response) {
          throw error;
        }

        return { id, error: error.response.data }
    }  
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
  name: "researcher.projects",  // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
  initialState,
  // Reducers chứa các hàm xử lý cập nhật state
  extraReducers: {
    // [retrieveProjects.pending]: (state, action) => {
    //   state.isloading = true;
    //   return state
    // },
    // [retrieveProjects.fulfilled]: (state, action) => {
    //   state.isloading = false;
    //   state.data = {...state.data, ..._.mapKeys(action.payload, 'id')}
    //   return state
    // },
    // [retrieveProjects.rejected]: (state, action) => {
    //   state.isloading = true;
    //   return state
    // },
    
    [retrieveProjectsByUseridProjecttypeStatusid.pending]: (state, action) => {
      state.isloading = true;
      return state
    },
    [retrieveProjectsByUseridProjecttypeStatusid.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, ..._.mapKeys(action.payload, 'id')}
      return state
    },
    [retrieveProjectsByUseridProjecttypeStatusid.rejected]: (state, action) => {
      state.isloading = true;
      return state
    },
    // -------------------------------------
    
    [retrieveProjectsByResearcherId.pending]: (state, action) => {
      state.isloading = true;
      return state
    },
    [retrieveProjectsByResearcherId.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, ..._.mapKeys(action.payload, 'id')}
      return state
    },
    [retrieveProjectsByResearcherId.rejected]: (state, action) => {
      state.isloading = true;
      return state
    },
    // --------------------------------

    [retrieveCommercialsByResearcherId.pending]: (state, action) => {
      state.isloading = true;
      return state
    },
    [retrieveCommercialsByResearcherId.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, ..._.mapKeys(action.payload, 'id')}
      return state
    },
    [retrieveCommercialsByResearcherId.rejected]: (state, action) => {
      state.isloading = true;
      return state
    },

    // Fetch all project of CTU or other domain 
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

    [retrieveCommercialProjects.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, ..._.mapKeys(action.payload, 'id')}
      return state
    },
    // End fetch all project of CTU or other domain 

    [retrieveProjectById.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, [action.payload.id]: action.payload}
      return state
    },
    [retrieveCommercialsByResearcherId.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, [action.payload.id]: action.payload}
      return state
    },
    
    [retrieveResearchingById.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, [action.payload.id]: action.payload}
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
    [deleteProjectById.fulfilled]: (state, action) => {
      state.isloading = false;
      if(action.payload.error) {
        state.data = {...state.data, [action.payload.id]: action.payload}
      }
      else state.data = _.omit(state.data, action.payload.id)
      
      return state
    },
   
  }
});


const { reducer } = projectSlice;
export default reducer;