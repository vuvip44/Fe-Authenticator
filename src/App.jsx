import { Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage/HomePage";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import User from "./components/User/User";
import Admin from "./components/Admin/Admin";
import TeacherPage from "./components/pages/TeacherPage/TeacherPage";
import MyStudentPage from "./components/pages/StudentPage/MyStudentPage";
import StudentPage from "./components/pages/StudentPage/AllStudentsPage";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/role-user" element={<User />} />
      <Route path="/role-admin" element={<Admin />} />
      <Route path="/all-teachers" element={<TeacherPage />} />
      <Route path="/my-students" element={<MyStudentPage/>}/>
      <Route path="/all-students" element={<StudentPage/>} />
      {/* Add more routes as needed */}
    </Routes>
  );
};

export default App;
