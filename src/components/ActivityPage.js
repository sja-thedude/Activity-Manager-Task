import React, { useEffect, useState } from "react";
import axios from "axios";
import ActivityForm from "../components/ActivityForm";
import ActivityList from "../components/ActivityList";
import ActivityDetail from "../components/ActivityDetail";
import { Route, Routes } from "react-router-dom";

const ActivitiesPage = () => {
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  const fetchActivities = async () => {
    try {
      const res = await axios.get("http://62.171.179.12/api/activities", {
        headers: {
          "x-api-key": "your_super_secret_api_key",
        },
      });

      const apiActivities = res.data;

      // 👇 Load locally submitted activities
      const localActivities = JSON.parse(localStorage.getItem("formActivities")) || [];

      setActivities([...apiActivities, ...localActivities]);
    } catch (err) {
      console.error("Failed to fetch activities:", err);

      // Even if API fails, try to load local ones
      const localActivities = JSON.parse(localStorage.getItem("formActivities")) || [];
      setActivities(localActivities);
    }
  };

  fetchActivities();
}, []);

  const handleAddActivity = (activity) => {
    const withImages = {
      ...activity,
      image: "sample.jpg",
      images: ["sample1.jpg", "sample2.jpg", "sample3.jpg"],
    };
    setActivities((prev) => [...prev, withImages]);
  };

const handleSubmit = (e) => {
    e.preventDefault();
    onAddActivity(formData);
    alert("Activity added successfully!");
    setFormData({}); // reset fields
    navigate("/activities"); // 👈 go to the list after submission
  };

  return (
    <Routes>
      
      <Route
        path="/activities"
        element={
          <>
            <ActivityForm onAddActivity={handleAddActivity} />
            <ActivityList activities={activities} />
          </>
        }
      />

      {/* Activity detail page */}
      <Route
        path="/activities/:id"
        element={<ActivityDetail activities={activities} />}
      />
    </Routes>
  );
};

};

export default ActivitiesPage;