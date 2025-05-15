import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyStudents } from "../../../redux/slices/teacherSlice";
import UpdateScoreModal from "./UpdateScore/UpdateScoreModal";
import StudentTable from "./StudentTable/StudentTable";

const MyStudentsPage = () => {
  const dispatch = useDispatch();
  const { myStudents, loadingMyStudents } = useSelector((state) => state.teacher);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getMyStudents());
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
    
    </>
  );
};

export default MyStudentsPage;
