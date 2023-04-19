// store/researchGroupSlice.js
import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import _ from "lodash";
import ResearchGroupService from "../services/researchGroup.service";

const GET_RESEARCH_GROUPS = 'researchGroup/getAll';
const GET_RESEARCH_GROUP = 'researchGroup/getById';
const CREATE_RESEARCH_GROUP = 'researchGroup/create';
const UPDATE_RESEARCH_GROUP = 'researchGroup/update';
const DELETE_RESEARCH_GROUP = 'researchGroup/delete';
const DELETE_ALL_RESEARCH_GROUP = 'researchGroup/delete/all';

// Khởi tạo state cho slice, có thể kèm giá trị mặc định ban đầu
const initialState = { data: [], isloading: false };

export const retrieveResearchGroups = createAsyncThunk(
  GET_RESEARCH_GROUPS,
  async () => {
    const res = await ResearchGroupService.getAll()
      return res.data.data
  }
);

export const retrieveResearchGroup = createAsyncThunk(
  GET_RESEARCH_GROUP,
  async (id) => {
    const res = await ResearchGroupService.getById(id);
    return res.data.data;
  }
);

export const createResearchGroup = createAsyncThunk(
  CREATE_RESEARCH_GROUP,
  async (data) => {
    const res = await ResearchGroupService.create(data);
    return res.data.data;
  }
);

export const updateResearchGroup = createAsyncThunk(
  UPDATE_RESEARCH_GROUP,
  async (data) => {
    const res = await ResearchGroupService.update(data.id, data);
    return res.data.data;
  }
);

export const deleteResearchGroup = createAsyncThunk(
  DELETE_RESEARCH_GROUP,
  async (id) => {
    await ResearchGroupService.delete(id);
    return { id };
  }
);

export const deleteAllResearchGroups = createAsyncThunk(
  DELETE_ALL_RESEARCH_GROUP,
  async () => {
    const res = await ResearchGroupService.deleteAll();
    return res.data.data;
  }
);

// Cấu hình slice
export const researchGroupSlice = createSlice({
  name: "researchGroups",  // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
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

    [retrieveResearchGroup.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, [action.payload.id]: action.payload}
      return state
    },
    [createResearchGroup.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, [action.payload.id]: action.payload}
      return state
    },
    [updateResearchGroup.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = {...state.data, [action.payload.id]: action.payload}
      return state
    },
    [deleteResearchGroup.fulfilled]: (state, action) => {
      state.isloading = false;
      state.data = _.omit(state.data, action.payload.id)
      return state
    },
  }
});

const { reducer } = researchGroupSlice;
export default reducer;