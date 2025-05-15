import React from "react";
import Header from "../../Header/Header";
import Styles from "./styles.module.scss"; 
import { useNavigate } from "react-router-dom";
import { checkAccessAndNavigate } from "../../../utils/CheckAccessAndNavigate";
const HomePage = () => {
    const {homepage,content} = Styles;
    const navigate = useNavigate();
  return (
    <div className={homepage}>
      <Header />
      <div className={content}>
        <h1>Hello World</h1>
        
      </div>
      <button
          onClick={() =>
            checkAccessAndNavigate({
              endpoint: "/students", 
              navigate,
              successPath: "/all-students", 
            })
          }
        >
          Xem danh sách học sinh
        </button>

        <button
          onClick={() =>
            checkAccessAndNavigate({
              endpoint: "/teachers",
              navigate,
              successPath: "/all-teachers",
              
            })
          }
        >
          Xem danh sách giáo viên
        </button>
        <button
          onClick={() =>
            checkAccessAndNavigate({
              endpoint: "/teachers/my-students",
              navigate,
              successPath: "/my-students", // dẫn đến trang hiển thị danh sách học sinh
            })
          }
        >
          Xem danh sách lớp
        </button>

    </div>
  );
};

export default HomePage;
