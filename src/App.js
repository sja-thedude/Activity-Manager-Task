import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ActivityForm from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";
import ActivityDetail from "./components/ActivityDetail";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="nav-bar">
          <Link to="/">Form</Link>
          <Link to="/activities">Activity List</Link>
        </nav>

        <Routes>
          <Route path="/" element={<ActivityForm />} />
          <Route path="/activities" element={<ActivityList />} />
          <Route path="/activities/:id" element={<ActivityDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
