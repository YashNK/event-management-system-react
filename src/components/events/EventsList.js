import React, { useEffect, useState } from "react";
import "./event.css";
import { Outlet, useNavigate } from "react-router-dom";

function EventsList() {
  const [csvData, setCsvData] = useState([]);
  const navigate = useNavigate();

  // Function to parse date from dd-mm-yyyy format
  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day); // months are 0-based in JavaScript Date
  };

  useEffect(() => {
    const updateEventStatuses = (events) => {
      const currentDate = new Date();

      return events.map(event => {
        const startDate = parseDate(event.startDate);
        const endDate = parseDate(event.endDate);

        if (event.status === 'Event Completed' || event.status === 'Event Failed') {
          return event;
        }

        if (currentDate >= startDate && currentDate <= endDate) {
          return { ...event, status: 'In Progress' };
        } else if (currentDate > endDate) {
          return { ...event, status: 'Event Failed' };
        } else {
          return { ...event, status: 'Pending' };
        }
      });
    };

    const data = localStorage.getItem('event');
    if (data) {
      const events = JSON.parse(data);
      const updatedEvents = updateEventStatuses(events);
      setCsvData(updatedEvents);
      localStorage.setItem('event', JSON.stringify(updatedEvents)); // Save updated data back to localStorage
    }
  }, []);

  const viewTasks = (eventId) => {
    navigate(`selected-event/${eventId}`);
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
                    onClick={() => viewTasks(event.eventId)}
                  >
                    View Tasks
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Outlet />
    </div>
  );
}

export default EventsList;
