import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../../api/authApi";

// API: Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await authApi.login(formData); // Gọi API đăng nhập
      const { accessToken } = response.data.data;
      
      return response.data.data; // Trả về thông tin người dùng và token
    } catch (error) {
      console.log("Login error:", error.response?.data);
      return rejectWithValue(error.response?.data?.Message || "Login failed"); // Trả về lỗi nếu có
    }
  }
);

// API: Refresh Token
export const refreshUserToken = createAsyncThunk(
  "auth/refreshUserToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authApi.refreshToken();  // Gửi yêu cầu làm mới token tới backend
      return response.data.data; // Trả về thông tin token mới
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
      const response = await authApi.getProfile(); // Gọi API để lấy thông tin người dùng
      console.log("Current user data:", response.data);
      return response.data.data; // Trả về thông tin người dùng hiện tại
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
      await authApi.logout(); // Gọi API để đăng xuất người dùng
      return true; // Đăng xuất thành công
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
      const response = await authApi.register(formData); // Gọi API đăng ký người dùng mới
      return response.data.data; // Trả về dữ liệu người dùng mới
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);



// Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null, // Thông tin người dùng
    accessToken: null, // Token truy cập
    refreshToken: null, // Token làm mới
    loading: false, // Trạng thái loading chung
    error: null, // Lỗi chung
   // Lỗi khi lấy danh sách giáo viên
  },
  reducers: {
    clearError: (state) => {
      state.error = null; // Xóa lỗi chung
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true; // Đang thực hiện login
        state.error = null; // Reset lỗi khi login
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false; // Đã hoàn thành login
        state.user = action.payload.user; // Lưu thông tin người dùng
        state.accessToken = action.payload.accessToken; // Lưu access token
        state.error = null; // Xóa lỗi khi login thành công
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false; // Đã hoàn thành quá trình login
        state.error = action.payload; // Lưu thông báo lỗi khi login thất bại
        state.user = null; // Reset thông tin người dùng
        state.accessToken = null; // Reset access token
      })

      // Get Current User
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true; // Đang lấy thông tin người dùng
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false; // Hoàn thành lấy thông tin người dùng
        state.user = action.payload; // Lưu thông tin người dùng
        state.error = null; // Xóa lỗi nếu có
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false; // Hoàn thành quá trình lấy thông tin người dùng
        state.error = action.payload; // Lưu lỗi nếu có
        state.user = null; // Reset thông tin người dùng
      })

      

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null; // Đăng xuất thành công, reset thông tin người dùng
        state.accessToken = null; // Reset access token
        state.error = null; // Xóa lỗi nếu có
        localStorage.removeItem('accessToken'); // Xóa token khỏi localStorage
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload; // Lưu lỗi nếu logout thất bại
      })

      // Refresh Token
      .addCase(refreshUserToken.pending, (state) => {
        state.loading = true; // Đang làm mới token
      })
      .addCase(refreshUserToken.fulfilled, (state, action) => {
        state.loading = false; // Hoàn thành việc làm mới token
        state.accessToken = action.payload.accessToken; // Lưu token mới
        state.refreshToken = action.payload.refreshToken; // Lưu refresh token mới
        state.user = action.payload.user; // Lưu thông tin người dùng
        state.error = null; // Xóa lỗi khi làm mới token thành công
      })
      .addCase(refreshUserToken.rejected, (state, action) => {
        state.loading = false; // Hoàn thành quá trình làm mới token
        state.error = action.payload; // Lưu lỗi nếu có
        state.accessToken = null; // Reset access token
        state.refreshToken = null; // Reset refresh token
        state.user = null; // Reset thông tin người dùng
      });
  }
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
