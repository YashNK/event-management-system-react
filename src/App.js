import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./components/index/Index";
import Dashboard from "./components/dashboard/Dashboard";
import EventsList from "./components/events/EventsList";
import TasksList from "./components/tasks/TasksList";
import HeaderComp from "./components/header/HeaderComp";
import './App.css'
import SelectedEventTask from "./components/selected-event/SelectedEventTask";

function App() {  
  return (
    <div>
      <BrowserRouter>
      <HeaderComp/>
        <Routes>
          <Route path="/" element={<Index/>}/>
          <Route path="/dashboard" element={<Dashboard/>}>
            <Route index element={<EventsList/>}/>
            <Route path="selected-event/:eventId" element={<SelectedEventTask/>}/>
            <Route path="tasks" element={<TasksList/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
