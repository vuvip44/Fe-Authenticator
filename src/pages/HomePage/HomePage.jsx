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
        <h1>Hello World</h1>
        
      </div>
      <button
          onClick={() =>
            checkAccessAndNavigate({
              endpoint: "/result/user", 
              navigate,
              successPath: "/role-user", 
            })
          }
        >
          Truy cập user
        </button>

        <button
          onClick={() =>
            checkAccessAndNavigate({
              endpoint: "/result/admin",
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
