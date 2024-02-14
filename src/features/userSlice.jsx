import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import RefreshToken from "../auth/RefreshToken";

export const setLoginUser = createAsyncThunk(
  "user/setLoginUser",
  async (data) => {
    try {
      const response = await axios.post("/api/auth/login", data);

      return response.data;
    } catch (error) {
      const errorMessage = JSON.parse(error.request.response);
      throw new Error(
        errorMessage.errors[0] ? errorMessage.errors[0] : error.message
      );
    }
  }
);
export const setRegisterUser = createAsyncThunk(
  "user/setRegisterUser",
  async (data) => {
    try {
      const response = await axios.post("/api/auth/register", data);

      return response.data;
    } catch (error) {
      const errorMessage = JSON.parse(error.request.response);
      throw new Error(
        errorMessage.errors[0] ? errorMessage.errors[0] : error.message
      );
    }
  }
);

export const setForgotPassword = createAsyncThunk(
  "user/setForgotPassword",
  async (data) => {
    try {
      const response = await axios.post("/api/users/forgot-password", data);

      return response.data;
    } catch (error) {
      const errorMessage = JSON.parse(error.request.response);
      throw new Error(
        errorMessage.errors[0] ? errorMessage.errors[0] : error.message
      );
    }
  }
);

export const setUpdateProfile = createAsyncThunk(
  "user/setUpdateProfile",
  async (data) => {
    try {
      await RefreshToken()
      const newData = {};

      newData.fullName = data.fullName;
      newData.email = data.email;
      if (data.password !== "") {
        newData.password = data.password;
        newData.confirmPassword = data.confirmPassword;
      }

      const response = await axios.patch("/api/users/" + data.userId, newData, {
        headers: {
          Authorization: "Bearer " + secureLocalStorage.getItem("accessToken"),
        },
      });

      return response.data;
    } catch (error) {
      const errorMessage = JSON.parse(error.request.response);
      throw new Error(
        errorMessage.errors[0] ? errorMessage.errors[0] : error.message
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(setLoginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setLoginUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(setLoginUser.rejected, (state, action) => {
        state.data = null;
        state.loading = false;
        state.error = action.error.message;
      })

      //Register
      .addCase(setRegisterUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setRegisterUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(setRegisterUser.rejected, (state, action) => {
        state.data = null;
        state.loading = false;
        state.error = action.error.message;
      })

      //ForgotPassword
      .addCase(setForgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setForgotPassword.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(setForgotPassword.rejected, (state, action) => {
        state.data = null;
        state.loading = false;
        state.error = action.error.message;
      })

      //Update Profile
      .addCase(setUpdateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setUpdateProfile.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(setUpdateProfile.rejected, (state, action) => {
        state.data = null;
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
