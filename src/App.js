import React from "react";
import ActivityList from "./components/ActivityList";
import ActivityForm from "./components/ActivityForm";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Activity Portal</h1>
      <ActivityForm />
      <hr />
      <ActivityList />
    </div>
  );
}

export default App;
