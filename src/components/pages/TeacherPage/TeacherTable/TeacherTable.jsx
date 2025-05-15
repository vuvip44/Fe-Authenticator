import React from "react";

const TeacherTable = ({ teachers, loading, error, onShowStudents }) => {
  if (loading) return <p>Đang tải...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <table border="1" cellPadding={5}>
      <thead>
        <tr>
          <th>STT</th>
          <th>Họ tên</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {teachers.map((teacher, index) => (
          <tr key={teacher.id}>
            <td>{index + 1}</td>
            <td>{teacher.fullName}</td>
            <td>
              <button onClick={() => onShowStudents(teacher)}>Xem học sinh</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TeacherTable;
