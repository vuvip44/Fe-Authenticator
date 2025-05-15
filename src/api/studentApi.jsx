import axiosInstance from "./axiosInstance";
const studentApi={
    getAllStudents:()=>axiosInstance.get("/students"),
    getStudentByUsername:(username)=>axiosInstance.get(`/students/${username}`),
    updateStudent:(studentUpdateDto)=>axiosInstance.put("/students",studentUpdateDto),
}
export default studentApi;