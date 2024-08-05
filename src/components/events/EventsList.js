import React, { useEffect, useState } from "react";
import "./event.css";
import { Outlet, useNavigate } from "react-router-dom";

function EventsList() {
  const [csvData, setCsvData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem('event');
    if (data) {
      setCsvData(JSON.parse(data));
    }
  }, []);

  const viewTasks = (index) => {
    navigate("/dashboard/selected-event")
  };

  return (
    <div className="events-container">
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th className="table-header">Event ID</th>
              <th className="table-header">Event Name</th>
              <th className="table-header">Start Date</th>
              <th className="table-header">End Date</th>
              <th className="table-header">Status</th>
              <th className="action-header">Action</th>
            </tr>
          </thead>
          <tbody>
            {csvData.map((event, index) => (
              <tr key={index}>
                <td className="row-container">{event.eventId}</td>
                <td className="row-container">{event.eventName}</td>
                <td className="row-container">{event.startDate}</td>
                <td className="row-container">{event.endDate}</td>
                <td className="row-container">{event.status}</td>
                <td className="button-container">
                  <button
                    className="action-btn"
                    onClick={() => viewTasks(index)}
                  >
                    View Tasks
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Outlet/>
    </div>
  );
}

export default EventsList;
