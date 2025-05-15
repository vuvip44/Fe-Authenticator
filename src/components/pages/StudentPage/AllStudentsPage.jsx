import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStudents } from "../../../redux/slices/studentSlice"; // đúng đường dẫn slice của bạn
import StudentTable from "./StudentTable/StudentTable"; // Component bảng đã tái sử dụng
import UpdateStudentModal from "./UpdateStudent/UpdateStudentModal";
const AllStudentsPage = () => {
  const dispatch = useDispatch();
  const { studentList, loadingList } = useSelector((state) => state.student);
  const [showModal,setShowModal]=useState(false);
  useEffect(() => {
    dispatch(getAllStudents());
    
  }, [dispatch]);

  return (
    <div style={{ padding: 20 }}>
      <h1>Danh sách học sinh</h1>
      {/* <button
        onClick={() => setShowModal(true)}
        style={{ float: "right", marginBottom: 10 }}
      >
        Cập nhật thông tin của tôi
      </button> */}
      <StudentTable students={studentList} loading={loadingList} showAction={false} />
      {/* <UpdateStudentModal show={showModal} onClose={() => setShowModal(false)} /> */}
    </div>
  );
};

export default AllStudentsPage;
