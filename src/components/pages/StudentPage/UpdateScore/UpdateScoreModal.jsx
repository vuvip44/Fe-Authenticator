import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateStudentScore,getMyStudents } from "../../../../redux/slices/teacherSlice";

import Styles from "./styles.module.scss"
const UpdateScoreModal = ({ student, onClose }) => {
  const {container, btn}=Styles;
  const dispatch = useDispatch();
  const [diemCC, setDiemCC] = useState(student.diemCC?.toString() || "");
  const [diemGiuaKy, setDiemGiuaKy] = useState(student.diemGiuaKy?.toString() || "");
  const [diemCuoiKy, setDiemCuoiKy] = useState(student.diemCuoiKy?.toString() || "");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    setError("");
    const cc = parseFloat(diemCC);
    const giuaKy = parseFloat(diemGiuaKy);
    const cuoiKy = parseFloat(diemCuoiKy);

    const isValidScore = (score) => !isNaN(score) && score >= 0 && score <= 10;

    if (!isValidScore(cc) || !isValidScore(giuaKy) || !isValidScore(cuoiKy)) {
      setError("Điểm phải nằm trong khoảng từ 0 đến 10");
      return;
    }

    dispatch(
      updateStudentScore({
        studentId: student.id,
        score: { diemCC: cc, diemGiuaKy: giuaKy, diemCuoiKy: cuoiKy },
      })
    ).then(() => {
      dispatch(getMyStudents());
      onClose();
    });
  };

  return (
    <div className={container}>
      <div className={btn}>
        <h3>Nhập điểm cho {student.fullName}</h3>
        <div>
          <label>Chuyên cần:</label>
          <input type="number" value={diemCC} onChange={(e) => setDiemCC(e.target.value)} />
        </div>
        <div>
          <label>Giữa kỳ:</label>
          <input type="number" value={diemGiuaKy} onChange={(e) => setDiemGiuaKy(e.target.value)} />
        </div>
        <div>
          <label>Cuối kỳ:</label>
          <input type="number" value={diemCuoiKy} onChange={(e) => setDiemCuoiKy(e.target.value)} />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button onClick={handleSubmit}>Lưu</button>
        <button onClick={onClose}>Hủy</button>
      </div>
    </div>
  );
};


export default UpdateScoreModal;
