// store/authSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

import { ROUTE_PREFIX_NNC } from "../components/Router/constants";
import { navItems } from '../components/Router/router.admin.data';
import {
  ROLE_ADMIN, ROLE_NNC, ROLE_SUPER_ADMIN, ROLE_USER
} from "../environments/constraints";

const AUTH_LOGIN = 'auth/login';
const AUTH_LOGOUT = 'auth/logout';
const AUTH_SEND_RESET_PASSWORD = 'auth/send-reset-password-code';
const AUTH_VERIFY_RESET_PASSWORD = 'auth/verify-reset-password-code';
const AUTH_UPDATE_PASSWORD = 'auth/update-password';
const AUTH_FETCH_USER_PROFILE = "auth/fetchUserProfile";

const userDataLocalStorage = localStorage.getItem("userData");
const user = JSON.parse(userDataLocalStorage);

// Khởi tạo state cho slice, có thể kèm giá trị mặc định ban đầu
const initialState = {
  data: {
    isSignedIn: user ? true : false,
    userId: user ? user.id : null,
    fullName: user ? user.fullName : null,
    userProfile: user ? user : null,
  },
  isloading: false,
};

const renderRedirectAfterLogin = (roleCode, topEnabledFunctionCode) => {
  if (!roleCode) {
    window.location = "/";
  }

  if (roleCode === ROLE_NNC) {
    // window.location = ROUTE_PREFIX_NNC;
    window.location = "/";
  }
  if (roleCode === ROLE_USER) {
    window.location = "/";
  }
  if (roleCode === ROLE_ADMIN || roleCode === ROLE_SUPER_ADMIN) {
    if(roleCode === ROLE_SUPER_ADMIN){
      window.location = '/admin/informations';
    }
    else {
      const topFunctionCanRoute = topEnabledFunctionCode ? navItems[topEnabledFunctionCode]?.path : null;
      window.location = topFunctionCanRoute ? `/admin${topFunctionCanRoute}` : '/admin';
    }
  }
};

export const login = createAsyncThunk(
  AUTH_LOGIN,
  async ({ username, password }, propsHistory) => {
    const response = await AuthService.login({ username, password });
    localStorage.setItem("token", JSON.stringify(response.data.data.token));
    
    try {
      if (response.status === 200) {
        // await users.get(`${USER_ID_URL}/${response.data.id}`)
        const user = await UserService.getByUsername(username);
        localStorage.setItem("userData", JSON.stringify(user.data));

        return user.data.data;
      }
    } catch (error) {
      // propsHistory.push(LOGIN_URL);
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  AUTH_FETCH_USER_PROFILE,
  async ({ username, token }) => {
    console.log(token)
    try {
      localStorage.setItem("token", JSON.stringify(token));

      const user = await UserService.getByUsername(username);
      localStorage.setItem("userData", JSON.stringify(user.data));

      return user.data.data;
    } catch (error) {
      console.log("error: ", error);
    }
  }
);

export const sendResetPasswordCode = createAsyncThunk(
  AUTH_SEND_RESET_PASSWORD,
  async (username) => {
    await AuthService.sendResetPasswordCode(username);
    
    return username;
  }
);

export const verifyResetPasswordCode = createAsyncThunk(
  AUTH_VERIFY_RESET_PASSWORD,
  async ({ username, code }) => {
    const res = await AuthService.verifyResetPasswordCode(username, code);

    return res.data;
  }
);

export const updatePassword = createAsyncThunk(
  AUTH_UPDATE_PASSWORD,
  async (data) => {
    const res = await AuthService.updatePassword(data);

    return res.data;
  }
);

export const logout = createAsyncThunk(AUTH_LOGOUT, async (propsHistory) => {
  await propsHistory.push("/");
});

// Cấu hình slice
export const authSlice = createSlice({
  name: "auth", // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
  initialState,
  // Reducers chứa các hàm xử lý cập nhật state
  extraReducers: {
    [login.pending]: (state, action) => {
      state.isloading = true;
      return state;
    },
    [login.fulfilled]: (state, action) => {
      state.isloading = false;

      let topEnabledFunctionCode = null;
      if(ROLE_ADMIN === action.payload.role.code){
        let filteredData = action.payload?.userFunctionList?.filter(userFunction => userFunction.isEnabled);
        topEnabledFunctionCode = filteredData?.length > 0 ? filteredData[0]?.function?.code : null;
      }
      
      renderRedirectAfterLogin(action.payload.role.code, topEnabledFunctionCode);

      state.data = {
        isSignedIn: true,
        userId: action.payload.id,
        fullName: action.payload.fullName,
        userProfile: action.payload,
      };

      return state;
    },
    
    [login.rejected]: (state, action) => {
      state.isloading = true;
      return state;
    },

    [fetchUserProfile.fulfilled]: (state, action) => {
      state.isloading = false;

      renderRedirectAfterLogin(action.payload?.role?.code);

      state.data = {
        isSignedIn: true,
        userId: action.payload?.id,
        fullName: action.payload?.fullName,
        userProfile: action.payload,
      };
    },

    [logout.fulfilled]: (state, action) => {
      localStorage.clear();
      state.data = {};
      return state;
    },

    [sendResetPasswordCode.fulfilled]: (state, action) => {
      state.isloading = false;
      
      state.data = { 
          username: action.payload
      };

      return state
    },
  }
});

const { reducer } = authSlice;
export default reducer;
