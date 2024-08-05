import React from "react";
import Logo from "../../assets/logo-black.png";
import "./header.css";

function HeaderComp({ importLabel }) {

  const handelNavigation = () => {
    if(importLabel == 'Import Csv')
    window.location.href = "/"
  }
  return (
    <div className="header-container">
      <img className="logo" src={Logo} alt="Company Logo"/>
      <h3 className="header-title">Event Management System</h3>
      <div className="header-import-container">
        <h1 onClick={handelNavigation} className="header-import-btn">{importLabel}</h1>
      </div>
    </div>
  );
}

export default HeaderComp;
