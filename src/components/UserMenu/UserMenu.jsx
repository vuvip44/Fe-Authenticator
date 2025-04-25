import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/slices/authSlice";
import Styles from "./styles.module.scss";

const UserMenu = ({ onClose }) => {
  const { userMenu, logoutBtn } = Styles;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    localStorage.removeItem("accessToken"); 
    onClose();
  };

  return (
    <div className={userMenu}>
      {user ? (
        <button className={logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <>
          <Link to="/login" onClick={onClose}>
            Login
          </Link>
          <Link to="/register" onClick={onClose}>
            Register
          </Link>
        </>
      )}
    </div>
  );
};

export default UserMenu;
