import React, { useEffect, useRef, useState } from "react";
import Logo from "../../assets/logo-black.png";
import "./header.css";
import { useLocation, useNavigate } from "react-router-dom";

function HeaderComp() {
  const location = useLocation();
  const navigate = useNavigate();
  const [headerLabel, setHeaderLabel] = useState();
  const confirmationPopUpRef = useRef(null);
  let events = localStorage.getItem('event');
  let tasks = localStorage.getItem('task');

  useEffect(() => {
    if (location.pathname === "/") {
      setHeaderLabel("About US");
    } else {
      setHeaderLabel("Import CSV");
    }
  }, [location.pathname]);

  const handleNavigationToImportScreen = () => {
    if (location.pathname !== "/") {
      if (events && tasks) {
        localStorage.removeItem('event');
        localStorage.removeItem('task');
      }
      navigate("/");
      confirmationPopUpRef.current.style.opacity = '0';
      confirmationPopUpRef.current.style.zIndex = -1
    }
  };

  const handleConfirmationPopUP = () => {
    if (confirmationPopUpRef.current) {
      confirmationPopUpRef.current.style.opacity = '1';
      confirmationPopUpRef.current.style.zIndex = 2
    }
  };

  const closeConfirmPopUp = () => {
    if (confirmationPopUpRef.current) {
      confirmationPopUpRef.current.style.opacity = '0';
      confirmationPopUpRef.current.style.zIndex = -1
    }
  };

  return (
    <>
      <div className="header-container">
        <img className="logo" src={Logo} alt="Company Logo" />
        <h3 className="header-title">Event Management System</h3>
        <div className="header-import-container">
          <h1 onClick={handleConfirmationPopUP} className="header-import-btn">
            {headerLabel}
          </h1>
        </div>
      </div>
      <div className="confirmation-pop-up-container" ref={confirmationPopUpRef}>
        <div className="confirmation-pop-up-content">
          <h1>Are you sure you wanna go back to IMPORT SCREEN?</h1>
          <h4>All Current Data Will Be Lost Forever.</h4>
          <button className="pop-up-confirm-btn" onClick={handleNavigationToImportScreen}>
            Yes
          </button>
          <button className="pop-up-deny-btn" onClick={closeConfirmPopUp}>
            No
          </button>
        </div>
      </div>
    </>
  );
}

export default HeaderComp;
