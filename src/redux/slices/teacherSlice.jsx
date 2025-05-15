import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import teacherApi from "../../api/teacherApi";

//Api:Teachers
export const getTeachers=createAsyncThunk(
    "teachers",
    async(_,{rejectWithValue})=>{
        try {
            const response=await teacherApi.getTeachers();
            return response.data.data;
        } catch (error) {
            console.log("Get Teachers error:", error.response?.data);
            return rejectWithValue(error.response?.data?.message || "Failed to fetch teachers");
        }
    }
)

export const getStudentsByTeacherId=createAsyncThunk(
  "teachers/getStudentsByTeacherId",
  async(teacherId, {rejectWithValue})=>{
    try{
      const response=await teacherApi.getStudentsByTeacherId(teacherId);
      return response.data.data;
    }catch(error){
      const status = error.response?.status;
      const message =
        status === 403
          ? "Bạn không đủ quyền hạn"
          : error.response?.data?.message || "Failed to fetch students";
      return rejectWithValue(message);
    }
  }
)

export const getMyStudents = createAsyncThunk(
  "teachers/getMyStudents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await teacherApi.getMyStudent();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Lỗi khi lấy học sinh");
    }
  }
);

export const updateStudentScore = createAsyncThunk(
  "teachers/updateStudentScore",
  async ({ studentId,score }, { rejectWithValue }) => {
    try {
      const response = await teacherApi.updateStudentScore(studentId, score);
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Cập nhật điểm thất bại");
    }
  }
);


const teacherSlice=createSlice({
    name:"teachers",
    initialState: {
      teachers: [],
      loadingTeachers: false,
      errorTeachers: null,

      studentsByTeacher: [],
      loadingStudents: false,
      errorStudents: null,

      myStudents: [],
      loadingMyStudents: false,
      errorMyStudents: null,

      updatingScore: false,
      updateScoreSuccess: false,
      errorUpdateScore: null,
    },

    reducers: {
        clearError: (state) => {
          state.error = null; // Xóa lỗi chung
        },
    },
    extraReducers:(builder)=>{
        builder
            // Get Teachers
                  .addCase(getTeachers.pending, (state) => {
                    state.loadingTeachers = true; // Đang lấy danh sách giáo viên
                    state.errorTeachers = null; // Reset lỗi khi lấy giáo viên
                  })
                  .addCase(getTeachers.fulfilled, (state, action) => {
                    state.loadingTeachers = false; // Hoàn thành việc lấy danh sách giáo viên
                    state.teachers = action.payload; // Lưu danh sách giáo viên vào state
                    state.errorTeachers = null; // Xóa lỗi nếu có
                  })
                  .addCase(getTeachers.rejected, (state, action) => {
                    state.loadingTeachers = false; // Hoàn thành quá trình lấy danh sách giáo viên
                    state.errorTeachers = action.payload; // Lưu lỗi nếu có
                    state.teachers = []; // Reset danh sách giáo viên
                  })


                  // Get students by teacherId
                  .addCase(getStudentsByTeacherId.pending, (state) => {
                    state.loadingStudents = true;
                    state.errorStudents = null;
                    state.studentsByTeacher = [];
                  })
                  .addCase(getStudentsByTeacherId.fulfilled, (state, action) => {
                    state.loadingStudents = false;
                    state.studentsByTeacher = action.payload;
                    state.errorStudents = null;
                  })
                  .addCase(getStudentsByTeacherId.rejected, (state, action) => {
                    state.loadingStudents = false;
                    state.errorStudents = action.payload;
                    state.studentsByTeacher = [];
                  })
                  // Get my students
                  .addCase(getMyStudents.pending, (state) => {
                    state.loadingMyStudents = true;
                    state.errorMyStudents = null;
                    state.myStudents = [];
                  })
                  .addCase(getMyStudents.fulfilled, (state, action) => {
                    state.loadingMyStudents = false;
                    state.myStudents = action.payload;
                  })
                  .addCase(getMyStudents.rejected, (state, action) => {
                    state.loadingMyStudents = false;
                    state.errorMyStudents = action.payload;
                  })

                  // Update student score
                  .addCase(updateStudentScore.pending, (state) => {
                    state.updatingScore = true;
                    state.updateScoreSuccess = false;
                    state.errorUpdateScore = null;
                  })
                  .addCase(updateStudentScore.fulfilled, (state, action) => {
                    state.updatingScore = false;
                    state.updateScoreSuccess = true;
                  })
                  .addCase(updateStudentScore.rejected, (state, action) => {
                    state.updatingScore = false;
                    state.errorUpdateScore = action.payload;
                  });
                  
    }
})
export const {clearError}=teacherSlice.actions;
export default teacherSlice.reducer;