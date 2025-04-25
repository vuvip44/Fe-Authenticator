import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import UserMenu from "../UserMenu/UserMenu"; 
import Styles from "./styles.module.scss"; 
import { useSelector } from "react-redux";
import {getCurrentUser} from "../../redux/slices/authSlice";

const Header = () => {
  const {header, logo, userIcon, usernameText} = Styles;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentUser=useSelector((state)=>state.auth.user);
  console.log(currentUser);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  // useEffect(() => {
  //   if (!currentUser) {
  //     dispatch(getCurrentUser());  
  //   }
  // }, [dispatch, currentUser]);
  
  return (
    <header className={header}>
      <div className={logo}>
        <Link to="/">MyApp</Link>
      </div>

      <div className={userIcon} onClick={toggleMenu}>
        <FaUser size={24} />
        {currentUser && <span className={usernameText} >{currentUser.username}</span>}
        {isMenuOpen && <UserMenu onClose={closeMenu} />}
      </div>
    </header>
  );
};

export default Header;
