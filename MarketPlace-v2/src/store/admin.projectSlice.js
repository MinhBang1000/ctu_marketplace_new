// store/project.js
import _ from 'lodash';

import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import ProjectService from "../services/admin.project.service";

const APPROVE_PROJECT = 'admin/project/approve';
const GET_PROJECTS = 'admin/project/getAll';
const GET_PROJECTS_BY_DOMAIN_ID = 'admin/project/getAllByDomainId';
const GET_PROJECTS_BY_USERID_PROJECTTYPR_STATUSID = 'admin/project/getAllByUseridProjecttypeStatusid';
const GET_PROJECTS_BY_STATUS = 'admin/project/getAllByStatus';
const GET_PROJECT = 'admin/project/getById';
const CREATE_PROJECT = 'admin/project/create';
const UPDATE_PROJECT = 'admin/project/update';
const DELETE_PROJECT = 'admin/project/delete';
const DELETE_ALL_PROJECT = 'admin/project/delete/all';

// Khởi tạo state cho slice, có thể kèm giá trị mặc định ban đầu
const initialState = { data: [], isloading: false };

// export const retrieveProjects = createAsyncThunk(
//   GET_PROJECTS,
//   async () => {
//     const res = await ProjectService.getAll();
//     return res.data.data;
//   }
// );

export const approveProject = createAsyncThunk(
  APPROVE_PROJECT,
  async (data) => {
    try {
      const res = await ProjectService.approveProject(data);
      return {...res.data.data, statusCode: res.data.statusCode};
    } catch (error) {
        if(!error.response) {
          throw error;
        }

        return { ...data, error: error.response.data.message, statusCode: error.response.data.statusCode };
    }
  }
);

export const retrieveProjectsByCtuOrOtherDomain = createAsyncThunk(
  GET_PROJECTS,
  async () => {
    const res = await ProjectService.getAllByCtuOrOtherDomain();
    return res.data.data;
  }
);

export const retrieveProjectsByDomainId = createAsyncThunk(
  GET_PROJECTS_BY_DOMAIN_ID,
  async (domainId) => {
    const res = await ProjectService.getAllByDomainId(domainId);
    return res.data.data;
  }
);

export const retrieveProjectsByUserId = createAsyncThunk(
  GET_PROJECTS_BY_DOMAIN_ID,
  async (userId) => {
    const res = await ProjectService.getAllByUserId(userId);
    return res.data.data;
  }
);

export const retrieveProjectsByUseridProjecttypeStatusid = createAsyncThunk(
  GET_PROJECTS_BY_USERID_PROJECTTYPR_STATUSID,
  async (data) => {
    const { userId, projectType, statusId } = data;
    const res = await ProjectService.getAllByUseridProjecttypeStatusid(userId, projectType, statusId);
    return res.data.data;
  }
);

export const retrieveProjectsByStatus = createAsyncThunk(
  GET_PROJECTS_BY_STATUS,
  async (statusId) => {
    const res = await ProjectService.getAllByStatus(statusId);
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
    await ProjectService.deleteProjectById(id);
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
  name: "admin.projects",  // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
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
    
    // Fetch all project of CTU or other domain 
    [retrieveProjectsByCtuOrOtherDomain.pending]: (state, action) => {
      state.isloading = true;
      return state
    },
    [retrieveProjectsByCtuOrOtherDomain.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, ..._.mapKeys(action.payload, 'id')}
      return state
    },
    [retrieveProjectsByCtuOrOtherDomain.rejected]: (state, action) => {
      state.isloading = true;
      return state
    },
    
    // Fetch all project of domain by domainId
    [retrieveProjectsByDomainId.pending]: (state, action) => {
      state.isloading = true;
      return state
    },
    [retrieveProjectsByDomainId.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, ..._.mapKeys(action.payload, 'id')}
      return state
    },
    [retrieveProjectsByDomainId.rejected]: (state, action) => {
      state.isloading = true;
      return state
    },
    // End fetch all project of CTU or other domain 
    
    // Fetch all project of domain by userId
    [retrieveProjectsByUserId.pending]: (state, action) => {
      state.isloading = true;
      return state
    },
    [retrieveProjectsByUserId.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, ..._.mapKeys(action.payload, 'id')}
      return state
    },
    [retrieveProjectsByUserId.rejected]: (state, action) => {
      state.isloading = true;
      return state
    },
    // End fetch all project of domain by userId
    
    // Fetch all project query by userId, projectType, statusId
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
    // End fetch all project query by userId, projectType, statusId

    [retrieveProjectById.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, [action.payload.id]: action.payload}
      return state
    },
    [retrieveCommercialById.fulfilled]: (state, action) => {
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
      state.data = _.omit(state.data, action.payload.id)
      return state
    },
    
    [approveProject.fulfilled]: (state, action) => {
      state.isloading = false;
      if(!action.payload.error) {
        state.data = {...state.data, [action.payload.id]: action.payload}
      }
      return state
    },
  }
});


const { reducer } = projectSlice;
export default reducer;