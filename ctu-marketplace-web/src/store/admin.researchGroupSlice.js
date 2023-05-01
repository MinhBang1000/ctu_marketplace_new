// store/admin.researchGroup.js
import _ from 'lodash';

import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import ResearchGroupService from "../services/admin.research-group.service";

const GET_RESEARCH_GROUPS = 'admin/research-group/getAll';
const GET_RESEARCH_GROUP = 'admin/research-group/getById';
const CREATE_RESEARCH_GROUP = 'admin/research-group/create';
const ADD_USER_TO_GROUP = 'admin/research-group/member/add/user';
const ADD_OTHER_USER_TO_GROUP = 'admin/research-group/member/add/other-user';
const UPDATE_OTHER_USER_TO_GROUP = 'admin/research-group/member/update/other-user';
const UPDATE_RESEARCH_GROUP = 'admin/research-group/update';
const DELETE_RESEARCH_GROUP = 'admin/research-group/delete';
const DELETE_ALL_RESEARCH_GROUPS = 'admin/research-group/delete/all';
const DELETE_MEMBER_FROM_RESEARCH_GROUP = 'admin/research-group/member/delete';

// Khởi tạo state cho slice, có thể kèm giá trị mặc định ban đầu
const initialState = { data: [], isloading: false };

export const retrieveResearchGroups = createAsyncThunk(
  GET_RESEARCH_GROUPS,
  async () => {
    const res = await ResearchGroupService.getAll();
    return res.data.data;
  }
);

export const retrieveResearchGroupsByUserId = createAsyncThunk(
  GET_RESEARCH_GROUPS,
  async (id) => {
    const res = await ResearchGroupService.getAllByUserId(id);
    return res.data.data;
  }
);

export const retrieveResearchGroupById = createAsyncThunk(
  GET_RESEARCH_GROUP,
  async ( id ) => {
    const res = await ResearchGroupService.getById(id);
    return res.data.data;
  }
);

export const createResearchGroup = createAsyncThunk(
  CREATE_RESEARCH_GROUP,
  async (data) => {
    try {
      const res = await ResearchGroupService.create(data);
      return res.data.data;

    } catch (error) {
        if(!error.response) {
          throw error;
        }

        return { ...data, error: error.response.data.message }
    }
  }
);

export const updateResearchGroup = createAsyncThunk(
  UPDATE_RESEARCH_GROUP,
  async (data) => {
    try {
      const res = await ResearchGroupService.update(data.id, data);
      return res.data.data;
    } catch (error) {
        if(!error.response) {
          throw error;
        }

        return { ...data, error: error.response.data.message }
    }
  }
);

export const deleteResearchGroup = createAsyncThunk(
  DELETE_RESEARCH_GROUP,
  async (id) => {
    try {
      await ResearchGroupService.delete(id);
      return { id };

    } catch (error) {
        if(!error.response) {
          throw error;
        }

        return { id, error: error.response.data.message }
    }   
  }
);

export const deleteAllResearchGroups = createAsyncThunk(
  DELETE_ALL_RESEARCH_GROUPS,
  async () => {
    const res = await ResearchGroupService.deleteAll();
    return res.data.data;
  }
);

export const addMemberToGroup = createAsyncThunk(
  ADD_USER_TO_GROUP,
  async (data) => {
    const res = await ResearchGroupService.addMemberToGroup(data);
    return res.data.data;
  }
);

export const addOtherMemberToGroup = createAsyncThunk(
  ADD_OTHER_USER_TO_GROUP,
  async (data) => {
    const res = await ResearchGroupService.addOtherMemberToGroup(data);
    return res.data.data;
  }
);

export const updateOtherMemberOfGroup = createAsyncThunk(
  UPDATE_OTHER_USER_TO_GROUP,
  async (data) => {
    const res = await ResearchGroupService.updateOtherMemberOfGroup(data.id, data);
    return res.data.data;
  }
);

export const deleteMemberFromGroup = createAsyncThunk(
  DELETE_MEMBER_FROM_RESEARCH_GROUP,
  async (id) => {
    await ResearchGroupService.deleteMember(id);
    return { id };
  }
);

// Cấu hình slice
export const researchGroupSlice = createSlice({
  name: "admin.researchGroup",  // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
  initialState,
  // Reducers chứa các hàm xử lý cập nhật state
  extraReducers: {
    [retrieveResearchGroups.pending]: (state, action) => {
      state.isloading = true;
      return state
    },
    [retrieveResearchGroups.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, ..._.mapKeys(action.payload, 'id')}
      return state
    },
    [retrieveResearchGroups.rejected]: (state, action) => {
      state.isloading = true;
      return state
    },
    [createResearchGroup.fulfilled]: (state, action) => {
      state.isloading = false;
      if(!action.payload.error) {
        state.data = {...state.data, [action.payload.id]: action.payload}
      }
      return state
    },
    [updateResearchGroup.fulfilled]: (state, action) => {
      state.isloading = false;
      if(!action.payload.error) {
        state.data = {...state.data, [action.payload.id]: action.payload}
      }
      return state
    },
    [deleteResearchGroup.fulfilled]: (state, action) => {
      state.isloading = false;
      if(!action.payload.error) {
        state.data = {...state.data, [action.payload.id]: action.payload}
      }
      state.data = _.omit(state.data, action.payload.id)
      return state
    },
  }
});


const { reducer } = researchGroupSlice;
export default reducer;