import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/ActivityList.css";

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://62.171.179.12/api/activities", {
        headers: {
          "x-api-key": "your_super_secret_api_key", // Replace this!
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

  if (loading) return <p>Loading activities...</p>;

  return (
    <div className="activity-list">
      <h2>Activity List</h2>
      <div className="activity-grid">
        {activities.map((act, idx) => (
          <Link to={`/activities/${idx}`} key={idx} className="activity-card-link">
            <div className="activity-card">
              <h3>{act.activity_name || "Unnamed"}</h3>
              <p><strong>Category:</strong> {act.activity_category?.join(", ")}</p>
              <p><strong>Location:</strong> {act.activity_location || "N/A"}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ActivityList;
