import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTeachers, getStudentsByTeacherId } from "../../../redux/slices/teacherSlice";
import TeacherTable from "./TeacherTable/TeacherTable";
import StudentModal from "./StudentModal/StudentModal";

const TeacherPage = () => {
  const dispatch = useDispatch();
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const {
    teachers,
    loadingTeachers,
    errorTeachers,
    studentsByTeacher,
    loadingStudents,
    errorStudents,
  } = useSelector((state) => state.teacher);

  useEffect(() => {
    dispatch(getTeachers());
  }, [dispatch]);

  const handleShowStudents = (teacher) => {
    setSelectedTeacher(teacher);
    dispatch(getStudentsByTeacherId(teacher.id));
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedTeacher(null);
    setShowModal(false);
  };

  return (
    <div>
      <h2>Danh sách giáo viên</h2>

      <TeacherTable
        teachers={teachers}
        loading={loadingTeachers}
        error={errorTeachers}
        onShowStudents={handleShowStudents}
      />

      <StudentModal
        show={showModal}
        onClose={handleCloseModal}
        teacher={selectedTeacher}
        students={studentsByTeacher}
        loading={loadingStudents}
        error={errorStudents}
      />
    </div>
  );
};

export default TeacherPage;
