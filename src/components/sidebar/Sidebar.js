import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./sidebar.css";

function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="dashboard-sidebar">
        <button onClick={() => navigate("events")}>Events</button>
        <button onClick={() => navigate("tasks")}>Tasks</button>
    </div>
  )
}

export default Sidebar