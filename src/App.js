import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./components/index/Index";
import Dashboard from "./components/dashboard/Dashboard";
import EventsList from "./components/events/EventsList";
import TasksList from "./components/tasks/TasksList";
import HeaderComp from "./components/header/HeaderComp";
import './App.css'
import { useState } from "react";
import Task from "./components/selected-event/Task";
function App() {
  const [importLabel, setImportLabel] = useState('')
  return (
    <div>
      <HeaderComp importLabel={importLabel}/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index importLabel={setImportLabel}/>}/>
          <Route path="/dashboard" element={<Dashboard importLabel={setImportLabel}/>}>
            <Route path="" element={<EventsList/>}/>
            <Route path="events" element={<EventsList/>}/>
            <Route path="selected-event" element={<Task/>}/>
            <Route path="tasks" element={<TasksList/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
