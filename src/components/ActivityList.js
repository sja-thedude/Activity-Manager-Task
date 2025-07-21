import React from "react";
import { Link } from "react-router-dom";
import "../styles/ActivityList.css";

const ActivityList = ({ activities, loading }) => {
  if (loading) return <p>Loading activities...</p>;

  return (
    <div className="activity-list">
      <h2>Activity List</h2>
      <div className="activity-grid">
        {activities.map((act, idx) => (
          <Link to={`/activities/${act.id}`} key={act.id} className="activity-card-link">
            <div className="activity-card">
              <h3>{act.activity_name || "Unnamed"}</h3>
              <p><strong>Category:</strong> {Array.isArray(act.activity_category) ? act.activity_category.join(", ") : act.activity_category}</p>
              <p><strong>Location:</strong> {act.activity_location || "N/A"}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ActivityList;