// src/pages/StudentPage/UpdateStudentModal.jsx

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStudent, resetUpdateStatus } from "../../../../redux/slices/studentSlice";
import Styles from "./styles.module.scss"


const UpdateStudentModal = ({ show, onClose }) => {
  const { overlay, modal } = Styles;
  const dispatch = useDispatch();
  const { updatingStudent, updateSuccess, updateError } = useSelector((state) => state.student);

  // Khai báo state cho từng trường
  const [fullName, setFullName] = useState("");
  
  const [password, setPassword] = useState("");

  // Reset trạng thái updateSuccess khi modal mở lại (nếu cần)
  useEffect(() => {
    if (show) {
      dispatch(resetUpdateStatus());
      
      
    }
  }, [show, dispatch]);

  useEffect(() => {
    if (updateSuccess) {
      alert("Cập nhật thành công");
      dispatch(resetUpdateStatus());
      onClose();
    }
  }, [updateSuccess, dispatch, onClose]);

  const handleSubmit = () => {
    // Có thể thêm validate nếu muốn
    if (!fullName || !username || !password) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    dispatch(updateStudent({ fullName, username, password }));
  };

  if (!show) return null;

  return (
    <div className={overlay}>
      <div className={modal}>
        <h2>Cập nhật thông tin học sinh</h2>

        <div>
          <input
            name="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Họ tên"
            required
          />
        </div>

        <div>
          <input
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Tên đăng nhập"
            required
          />
        </div>

        <div>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mật khẩu mới"
            required
          />
        </div>

        {updateError && <p style={{ color: "red" }}>{updateError}</p>}

        <button onClick={handleSubmit} disabled={updatingStudent}>
          {updatingStudent ? "Đang cập nhật..." : "Cập nhật"}
        </button>

        <button onClick={onClose} style={{ marginLeft: 10 }}>
          Hủy
        </button>
      </div>
    </div>
  );
};

export default UpdateStudentModal;
