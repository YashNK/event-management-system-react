import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./selected-event-task.css";

function SelectedEventTask() {
  const [csvData, setCsvData] = useState([]);
  const { eventId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem('task');
    if (data) {
      setCsvData(JSON.parse(data));
    }
  }, []);

  const handleTaskStatusOption = (event, eventId, taskName) => {
    const newStatus = event.target.value;
    const updatedTasks = csvData.map((task) => 
      task.eventId === eventId && task.taskName === taskName 
        ? { ...task, status: newStatus } 
        : task
    );
    setCsvData(updatedTasks);
  };
  

  const handleSave = () => {
    const filteredTasks = csvData.filter(task => task.eventId === eventId);
    handleCompletedEvent(eventId, filteredTasks);
    localStorage.setItem('task', JSON.stringify(csvData));
    navigate("../")
  };

  const handleCompletedEvent = (eventId, filteredTasks) => {
    const events = JSON.parse(localStorage.getItem('event')) || [];
    const allTasksCompleted = filteredTasks.every(task => task.status === "Task Completed");
    const anyTasksFailed = filteredTasks.some(task => task.status === "Task Failed");
    const someTasksInProgress = filteredTasks.some(task => task.status === "In Progress");
    const someTasksPending = filteredTasks.some(task => task.status === "Pending");
    const updatedEvents = events.map(event => {
      if (event.eventId === eventId) {
        if (anyTasksFailed && event.status !== "Pending") {
          return { ...event, status: "Event Failed" };
        }
        if (allTasksCompleted && event.status !== "Pending") {
          return { ...event, status: "Event Completed" };
        }
        if ((someTasksInProgress || someTasksPending) && (event.status !== "Pending" && event.status !== "Event Failed")) {
          return { ...event, status: "In Progress" };
        }
      }
      return event;
    });
  
    localStorage.setItem('event', JSON.stringify(updatedEvents));
  };
  

  const filteredTasks = csvData.filter(task => task.eventId === eventId);

  return (
    <div className="tasks-container">
      <div className="tasks-header">
        <h1>Please note: Upcoming events won't update their status based on task changes until their start date, and past events can only be marked as "Event Failed" or "Event Completed."</h1>
        <button className="form-save-btn" onClick={handleSave}>Save</button>
      </div>
      <div className="selected-event-table-container">
        <table>
          <thead>
            <tr>
              <th className="table-header">Event ID</th>
              <th className="table-header">Task Name</th>
              <th className="table-header">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task, index) => (
              <tr key={index}>
                <td className="row-container">{task.eventId}</td>
                <td className="row-container">{task.taskName}</td>
                <td className="row-container">
                  <select
                    value={task.status}
                    onChange={(event) => handleTaskStatusOption(event, task.eventId, task.taskName)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Task Completed">Task Completed</option>
                    <option value="Task Failed">Task Failed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SelectedEventTask;
