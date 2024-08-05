import React, { useEffect } from "react";
import "./dashboard.css"
import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";

function Dashboard({importLabel}) {
  useEffect(()=>{
    importLabel('Import Csv')
  }, [])

  return (
    <div className="dashboard-container">
      <Sidebar/>
      <Outlet />
    </div>
  );
}

export default Dashboard;