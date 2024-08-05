import React, { useEffect, useState } from "react";
import "./tasks.css";

function TasksList() {
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem('task');
    if (data) {
      setCsvData(JSON.parse(data));
    }
  }, []);

  return (
    <div className="tasks-container">
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th className="table-header">Event ID</th>
              <th className="table-header">Task Name</th>
              <th className="table-header">Status</th>
            </tr>
          </thead>
          <tbody>
            {csvData.map((task, index) => (
              <tr key={index}>
                <td className="row-container">{task.eventId}</td>
                <td className="row-container">{task.taskName}</td>
                <td className="row-container">{task.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TasksList