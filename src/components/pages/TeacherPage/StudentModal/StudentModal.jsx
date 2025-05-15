import React from "react";
import Style from "./styles.module.scss"
const StudentModal = ({ show, onClose, teacher, students, loading, error }) => {
  if (!show) return null;
  const {container} =Style;
  return (
    <div className={container} >
      <h3>Danh sách học sinh của: {teacher?.fullName}</h3>

      {loading ? (
        <p>Đang tải học sinh...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : students.length === 0 ? (
        <p>Không có học sinh nào.</p>
      ) : (
        <table border="1" cellPadding={5}>
          <thead>
            <tr>
              <th>STT</th>
              <th>Họ tên</th>
              
            </tr>
          </thead>
          <tbody>
            {students.map((student, idx) => (
              <tr key={student.id}>
                <td>{idx + 1}</td>
                <td>{student.fullName}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <br />
      <button onClick={onClose}>Đóng</button>
    </div>
  );
};

export default StudentModal;
