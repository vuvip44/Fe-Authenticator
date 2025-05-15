import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import studentApi from "../../api/studentApi";

// Lấy tất cả học sinh
export const getAllStudents = createAsyncThunk(
  "students/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await studentApi.getAllStudents();
      console.log(res.data);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Lỗi khi lấy danh sách học sinh");
    }
  }
);

// Lấy học sinh theo username
export const getStudentByUsername = createAsyncThunk(
  "students/getByUsername",
  async (username, { rejectWithValue }) => {
    try {
      const res = await studentApi.getStudentByUsername(username);
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Không tìm thấy học sinh");
    }
  }
);

// Cập nhật thông tin học sinh
export const updateStudent = createAsyncThunk(
  "students/update",
  async (studentUpdateDto, { rejectWithValue }) => {
    try {
      const res = await studentApi.updateStudent(studentUpdateDto);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Không cập nhật được học sinh");
    }
  }
);

const studentSlice = createSlice({
  name: "students",
  initialState: {
    studentList: [],
    loadingList: false,
    errorList: null,

    selectedStudent: null,
    loadingStudent: false,
    errorStudent: null,

    updatingStudent: false,
    updateSuccess: false,
    updateError: null,
  },
  reducers: {
    clearStudentErrors: (state) => {
      state.errorList = null;
      state.errorStudent = null;
      state.updateError = null;
    },
    clearSelectedStudent: (state) => {
      state.selectedStudent = null;
    },
    resetUpdateStatus: (state) => {
      state.updateSuccess = false;
      state.updateError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Get all students
      .addCase(getAllStudents.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
        state.studentList = [];
      })
      .addCase(getAllStudents.fulfilled, (state, action) => {
        state.loadingList = false;
        state.studentList = action.payload;
      })
      .addCase(getAllStudents.rejected, (state, action) => {
        state.loadingList = false;
        state.errorList = action.payload;
      })

      // Get student by username
      .addCase(getStudentByUsername.pending, (state) => {
        state.loadingStudent = true;
        state.errorStudent = null;
        state.selectedStudent = null;
      })
      .addCase(getStudentByUsername.fulfilled, (state, action) => {
        state.loadingStudent = false;
        state.selectedStudent = action.payload;
      })
      .addCase(getStudentByUsername.rejected, (state, action) => {
        state.loadingStudent = false;
        state.errorStudent = action.payload;
      })

      // Update student
      .addCase(updateStudent.pending, (state) => {
        state.updatingStudent = true;
        state.updateError = null;
        state.updateSuccess = false;
      })
      .addCase(updateStudent.fulfilled, (state) => {
        state.updatingStudent = false;
        state.updateSuccess = true;
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.updatingStudent = false;
        state.updateError = action.payload;
      });
  },
});

export const {
  clearStudentErrors,
  clearSelectedStudent,
  resetUpdateStatus
} = studentSlice.actions;

export default studentSlice.reducer;
