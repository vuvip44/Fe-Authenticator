// src/components/Register/Register.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearError } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import Styles from "./styles.module.scss"; 
import {getTeachers} from "../../redux/slices/teacherSlice"


function Register() {
  const { container, errorp } = Styles;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, teachers } = useSelector((state) => state.teacher);

  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "", // "student" or "teacher"
    teacherId: "",
  });

  // Fetch teachers when role is 'student'
  useEffect(() => {
    if (formData.role === "student") {
      dispatch(getTeachers());
    }
    return () => {
      dispatch(clearError());
    };
  }, [dispatch, formData.role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (error) {
      dispatch(clearError());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    console.log('Form Data:', formData); 
  
    try {
      const result = await dispatch(registerUser(formData));
      if (registerUser.fulfilled.match(result)) {
        alert("Đăng ký thành công!");
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };
  

  return (
    <div className={container}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullname"
          placeholder="Full Name"
          value={formData.fullname}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        {/* Lựa chọn role (Student/Teacher) */}
        <div>
          <label>
            <input
              type="radio"
              name="role"
              value="student"
              checked={formData.role === "student"}
              onChange={handleChange}
            />
            Student
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="teacher"
              checked={formData.role === "teacher"}
              onChange={handleChange}
            />
            Teacher
          </label>
        </div>

        {/* Nếu chọn Student, hiển thị thêm ô chọn giáo viên */}
        {formData.role === "student" && (
          <div>
            <label>Select Teacher</label>
            <select
              name="teacherId"
              value={formData.teacherId}
              onChange={handleChange}
              required
            >
              <option value="">Select a teacher</option>
              {teachers && teachers.length > 0 ? (
                teachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.fullName}
                  </option>
                ))
              ) : (
                <option value="">No teachers available</option>
              )}
            </select>
          </div>
        )}

        {error && <p className={errorp}>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default Register;
