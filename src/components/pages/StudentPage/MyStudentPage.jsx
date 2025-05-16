import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyStudents, getStudentStatistics  } from "../../../redux/slices/teacherSlice";
import UpdateScoreModal from "./UpdateScore/UpdateScoreModal";
import StudentTable from "./StudentTable/StudentTable";

const MyStudentsPage = () => {
  const dispatch = useDispatch();
  const {
        myStudents,
        loadingMyStudents,
        studentStatistics,
        loadingStatistics,
        errorStatistics,
      } = useSelector((state) => state.teacher);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getMyStudents());
    dispatch(getStudentStatistics());
  }, [dispatch]);

  const handleOpenModal = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  return (
    <>
      
      <StudentTable
        students={myStudents}
        loading={loadingMyStudents}
        showAction={true}
        onActionClick={handleOpenModal}
      />
      {showModal && (
        <UpdateScoreModal
          student={selectedStudent}
          onClose={() => setShowModal(false)}
        />
      )}

      {loadingStatistics ? (
      <p>Đang tải thống kê...</p>
    ) : errorStatistics ? (
      <p className="text-danger">{errorStatistics}</p>
    ) : (
      <div className="mt-4">
  <h5>Thống kê xếp loại học sinh</h5>

  {loadingStatistics && <p>Đang tải thống kê...</p>}
  {errorStatistics && <p className="text-danger">{errorStatistics}</p>}

  {!loadingStatistics && !errorStatistics && (
    <table border="1" cellPadding="10">
      <thead>
        <tr>
          <th>Xếp loại</th>
          <th>Số lượng</th>
        </tr>
      </thead>
      <tbody>
        {studentStatistics.length === 0 ? (
          <tr>
            <td colSpan="2" className="text-center">
              Không có dữ liệu thống kê.
            </td>
          </tr>
        ) : (
          studentStatistics.map((item, index) => (
            <tr key={index}>
              <td>{item.xepLoai}</td>
              <td>{item.soLuong}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  )}
</div>

)}

    
    </>
  );
};

export default MyStudentsPage;
