import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import User from "./components/User/User";
import Admin from "./components/Admin/Admin";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/role-user" element={<User />} />
      <Route path="/role-admin" element={<Admin />} />
      {/* Add more routes as needed */}
    </Routes>
  );
};

export default App;
