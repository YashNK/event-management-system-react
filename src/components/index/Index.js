import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./index.css";
import UploadImg from "../../assets/upload.png";

function Index() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  let fileImportLabel = useRef('');
  const [csvData, setCsvData] = useState([]);
  const [csvType, setCsvType] = useState('event');
  const [csvHeaders, setCsvHeaders] = useState([]);
  let events = localStorage.getItem('event');
  let tasks = localStorage.getItem('task');
  const [viewEventsBtnDisabled, setViewEventsBtnDisabled] = useState(true)
  const expectedHeaders = {
    event: ["eventName", "eventId", "startDate", "endDate"],
    task: ["eventId", "taskName"]
  };

  useEffect(() => {
    if (events && tasks) {
      navigate("/dashboard")
    }
  }, []);

  const handleFileInput = (event) => {
    const csvFile = event.target.files[0];
    if (csvFile) {
      fileImportLabel.current.textContent = csvFile.name;
      const csvFileReader = new FileReader();
      csvFileReader.onload = (e) => {
        const csvText = e.target.result;
        const csvRows = csvText.trim().split("\n").map(row => row.trim().split(","));
        const csvFileHeaders = csvRows[0];
        setCsvHeaders(csvFileHeaders);
        
        const csvDataObjects = csvRows.slice(1).map(row => {
          return csvFileHeaders.reduce((obj, header, index) => {
            obj[header] = row[index].trim();
            return obj;
          }, {});
        });
  
        if (csvType === 'event') {
          csvDataObjects.forEach(event => {
            event.status = getEventStatus(event.startDate, event.endDate);
          });
          setCsvData(csvDataObjects);
        } else if (csvType === 'task') {
          const eventsData = JSON.parse(localStorage.getItem('event')) || [];
          csvDataObjects.forEach(task => {
            const event = eventsData.find(e => e.eventId === task.eventId);
            if (event) {
              if (event.status === "Event Failed") task.status = "Task Failed"
               else if (event.status === "Pending") task.status = "Pending"
               else if (event.status === "In Progress") task.status = "Pending"
               else task.status = "Unknown"
            } else task.status = "Unknown";
          });
          setCsvData(csvDataObjects);
        }
      };
      csvFileReader.readAsText(csvFile);
    } else {
      fileImportLabel.current.textContent = "Import CSV";
    }
  };

  const handleImport = () => {
    if(!events && csvType !== 'event'){
      toast.warn("Please upload Event CSV file first.");
      resetFileInput();
      return;
    }
    if (fileInputRef.current.value === "") {
      toast.warn("Please upload a CSV file first.");
      return;
    }
    if (!validateHeaders(csvHeaders)) {
      resetFileInput();
      return;
    }
    if (csvType === 'event' && handleOverlaps(csvData)) {
      toast.error("Date overlaps detected in the event CSV.");
      resetFileInput();
      return;
    }
    if (csvType === 'event') {
      localStorage.setItem('event', JSON.stringify(csvData));
    } else if (csvType === 'task') {
      localStorage.setItem('task', JSON.stringify(csvData));
    }
    toast.success("CSV data imported successfully!");
    checkBothUploaded();
    resetFileInput();
  };

  const validateHeaders = (headers) => {
    const requiredHeaders = expectedHeaders[csvType];
    const missingHeaders = requiredHeaders.filter(header => !headers.includes(header));
    if (missingHeaders.length > 2) {
      toast.error(`Wrong File Type or Invalid Headers`);
      return false;
    } else if(missingHeaders.length === 1) {
      toast.error(`Invalid Headers. Missing: ${missingHeaders}`);
      return false;
    } else if(missingHeaders.length === 2) {
      toast.error(`Invalid Headers. Missing: ${missingHeaders}`);
      return false;
    }
    return true;
  };

  const handleOverlaps = (data) => {
    if (csvType !== 'event') return false;
    const dateRanges = data.map(event => {
      const startDate = event.startDate || '';
      const endDate = event.endDate || '';
      return {
        start: new Date(startDate.split('-').reverse().join('-')),
        end: new Date(endDate.split('-').reverse().join('-'))
      };
    });
    for (let i = 0; i < dateRanges.length; i++) {
      for (let j = i + 1; j < dateRanges.length; j++) {
        if (dateRanges[i].start <= dateRanges[j].end && dateRanges[i].end >= dateRanges[j].start) {
          toast.error("Date overlaps detected in the event CSV.");
          return true;
        }
      }
    }
    return false;
  };

  const getEventStatus = (startDate, endDate) => {
    const currentdate = new Date();
    if (!startDate || !endDate) {
      toast.error("No Start Date or End Date Found")
      return;
    }
    const startParts = startDate.split('-').map(part => part.trim());
    const endParts = endDate.split('-').map(part => part.trim());
    if (startParts.length !== 3 || endParts.length !== 3) {
      toast.error("Invalid Date Format")
      return;
    }
    const start = new Date(startParts.reverse().join('-'));
    const end = new Date(endParts.reverse().join('-'));
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      toast.error("Invalid Date")
      return;
    }
    if (end < currentdate) return "Event Failed";
    if (start <= currentdate && end >= currentdate) return "In Progress";
    return "Pending";
  };

  const checkBothUploaded = () => {
  let events = localStorage.getItem('event');
  let tasks = localStorage.getItem('task');
    if (events && tasks) {
      setViewEventsBtnDisabled(false);
    }
  };

  const handleCsvTypeChange = (event) => {
    setCsvType(event.target.value);
    resetFileInput();
  };

  const resetFileInput = () => {
    if (fileInputRef.current) fileInputRef.current.value = "";
    fileImportLabel.current.textContent = "Import CSV";
  };

  return (
    <>
      <ToastContainer transition={Slide} position="top-center" theme="colored" limit={5} draggable={true}/>
      <div className="main-container">
        <div className="text-content">
          <h1>Event Manager Pro</h1>
          <h3>
            Welcome to EventManager Pro! Our platform is designed to make managing events and tasks effortless. With EventManager Pro, you can easily create, edit, and track events, set dates, and view upcoming activities at a glance. Organize tasks associated with each event by assigning, monitoring, and updating them to ensure nothing is overlooked. Our user-friendly interface and seamless integration streamline your workflow, whether you’re planning a small gathering or a large conference. Stay informed with real-time updates and notifications to keep you in the loop. Experience a new level of efficiency in event management with EventManager Pro—where your events and tasks are perfectly organized!
          </h3>
        </div>
        <div className="csv-form">
          <h2 className="selector-label">Please select the file you want to upload!</h2>
          <select className="csv-selector" value={csvType} onChange={handleCsvTypeChange}>
            <option value="event">Event CSV</option>
            <option value="task">Task CSV</option>
          </select>
          <div className="file-container">
            <input className="file-reader" ref={fileInputRef} onChange={handleFileInput} type="file" accept=".csv"/>
            <img src={UploadImg} className="import-img" alt="Upload" />
            <h2 className="import-btn-label" onClick={handleImport} ref={fileImportLabel}>Import CSV</h2>
          </div>
          <button className="import-btn" type="button" onClick={handleImport}>
            Import
          </button>
          <button className="event-list-btn" onClick={() => navigate("/dashboard")} disabled={viewEventsBtnDisabled}>
            View Events List
          </button>
        </div>
      </div>
    </>
  );
}

export default Index;