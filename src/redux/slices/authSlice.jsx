// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../../api/authApi"; 

// API: Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await authApi.login(formData);
      const { accessToken } = response.data.data;

      
      

      return response.data.data;
    } catch (error) {
      console.log("Login error:", error.response?.data);
      return rejectWithValue(error.response?.data?.Message || "Login failed");
    }
  }
);

// API: Refresh Token
export const refreshUserToken = createAsyncThunk(
  "auth/refreshUserToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authApi.refreshToken();  // Gửi yêu cầu làm mới token tới backend
      return response.data.data;
    } catch (error) {
      console.log("Refresh token error:", error.response?.data);
      return rejectWithValue(error.response?.data?.message || "Failed to refresh token");
    }
  }
);

// API: Get Current User
export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authApi.getProfile(); 
      console.log(      "Current user data:", response.data);
      return response.data.data;
      
    } catch (error) {
      return rejectWithValue(error.response?.data?.Message || "Failed to fetch user");
    }
  }
);

// API: Logout
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await authApi.logout(); 
      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

// API: Register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await authApi.register(formData); 
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);



// Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    accessToken: null,
    refreshToken: null,
    loading: false,
    error: null,
  },
  reducers: {
      clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.error = null;
        
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.accessToken = null;
      })

      // Get Current User
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
        
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.error = null;
        localStorage.removeItem('accessToken');
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Refresh Token
      .addCase(refreshUserToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshUserToken.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(refreshUserToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.accessToken = null;
        state.refreshToken = null;
        state.user = null;
      });
      
  }
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
