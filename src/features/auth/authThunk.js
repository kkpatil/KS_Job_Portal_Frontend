import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// Login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      return await authService.login(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

// Register
export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      return await authService.register(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Register failed"
      );
    }
  }
);

// Get Me
export const getMe = createAsyncThunk(
  "auth/me",
  async (_, thunkAPI) => {
    try {
      return await authService.getMe();
    } catch (error) {
      return thunkAPI.rejectWithValue("Unauthorized");
    }
  }
);
