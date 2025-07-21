import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ActivityForm from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";
import ActivityDetail from "./components/ActivityDetail";
import axios from "axios";
import "./App.css";

function App() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch once on load
  useEffect(() => {
    axios
      .get("/api/activities", {
        headers: {
          "x-api-key": "your_super_secret_api_key",
        },
      })
      .then((res) => {
        setActivities(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching activities:", err);
        setLoading(false);
      });
  }, []);

  // Add activity from form
  const handleAddActivity = (newActivity) => {
    const formatted = {
      ...newActivity,
      activity_category: newActivity.activity_category
        .split(",")
        .map((cat) => cat.trim()),
    };
    setActivities((prev) => [...prev, formatted]);
  };

  return (
    <Router>
      <div className="App">
        <nav className="nav-bar">
          <Link to="/">Form</Link>
          <Link to="/activities">Activity List</Link>
        </nav>

        <Routes>
          <Route path="/" element={<ActivityForm onAddActivity={handleAddActivity} />} />
          <Route path="/activities" element={<ActivityList activities={activities} loading={loading} />} />
          <Route path="/activities/:id" element={<ActivityDetail activities={activities} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;