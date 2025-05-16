import axiosInstance from "./axiosInstance";
const teacherApi={
    getTeachers: () => axiosInstance.get("/teachers"),
    getStudentsByTeacherId: (teacherId) =>
        axiosInstance.get(`/teachers/${teacherId}/students`),
    getMyStudent:()=>axiosInstance.get("/teachers/my-students"),
    updateStudentScore:(studentId,score)=>axiosInstance.put(`/teachers/students/${studentId}/score`,score),
    getStudentStatistics: () => axiosInstance.get("/teachers/statistics"),
}
export default teacherApi;