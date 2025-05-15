import React from "react";

const StudentTable = ({ students, loading, showAction = false, onActionClick }) => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Danh sách học sinh</h2>
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>#</th>
              <th>Họ tên</th>
              <th>Username</th>
              <th>Điểm chuyên cần</th>
              <th>Điểm giữa kỳ</th>
              <th>Điểm cuối kỳ</th>
              <th>Điểm tổng kết</th>
              <th>Xếp loại</th>
              {showAction && <th>Hành động</th>}
            </tr>
          </thead>
          <tbody>
            {Array.isArray(students) && students.map((student, idx) => (
              <tr key={student.id}>
                <td>{idx + 1}</td>
                <td>{student.fullName}</td>
                <td>{student.username}</td>
                <td>{student.diemCC}</td>
                <td>{student.diemGiuaKy}</td>
                <td>{student.diemCuoiKy}</td>
                <td>{student.diemTongKet}</td>
                <td>{student.xepLoai}</td>
                {showAction && (
                  <td>
                    <button onClick={() => onActionClick(student)}>Nhập điểm</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentTable;
