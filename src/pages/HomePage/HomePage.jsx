import React from "react";
import Header from "../../components/Header/Header";
import Styles from "./styles.module.scss"; 
import { useNavigate } from "react-router-dom";
import { checkAccessAndNavigate } from "../../utils/CheckAccessAndNavigate";
const HomePage = () => {
    const {homepage,content} = Styles;
    const navigate = useNavigate();
  return (
    <div className={homepage}>
      <Header />
      <div className={content}>
        <h1>Welcome to MyApp!</h1>
        <p>This is your homepage.</p>
      </div>
      <button
          onClick={() =>
            checkAccessAndNavigate({
              endpoint: "/result/user", // API check quyền
              navigate,
              successPath: "/role-user", // Chuyển trang khi có quyền
            })
          }
        >
          Truy cập user
        </button>

        <button
          onClick={() =>
            checkAccessAndNavigate({
              endpoint: "/result/admin", // API check quyền
              navigate,
              successPath: "/role-admin",
              fallbackMessage: "Chỉ admin mới được truy cập trang này!",
            })
          }
        >
          Truy cập admin
        </button>
    </div>
  );
};

export default HomePage;
