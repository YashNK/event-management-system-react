import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./sidebar.css";

function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="dashboard-sidebar">
        <button className="sidebar-btn" onClick={() => navigate("")}>Events</button>
        <button className="sidebar-btn" onClick={() => navigate("tasks")}>Tasks</button>
    </div>
  )
}

export default Sidebar