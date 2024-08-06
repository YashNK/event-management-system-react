import React from "react";
import "./dashboard.css"
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";

function Dashboard() {
  const navigate = useNavigate()
  return (
    <div className="dashboard-container">
      <Sidebar/>
      <Outlet />
    </div>
  );
}

export default Dashboard;