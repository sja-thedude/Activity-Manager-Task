import React, { useEffect, useState } from "react";
import axios from "axios";

const ActivityList = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios
      .get("http://62.171.179.12/api/activities", {
        headers: {
          "x-api-key": "your_super_secret_api_key",
        },
      })
      .then((res) => setActivities(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Available Activities</h2>
      <div className="activity-container">
        {activities.map((activity) => (
          <div key={activity.id} className="activity-card">
            <h3>{activity.activity_name}</h3>
            <p><strong>Location:</strong> {activity.activity_location}</p>
            <p><strong>Category:</strong> {activity.activity_category?.join(", ")}</p>
            <p><strong>Price:</strong> {activity.price} SAR</p>
            <p dangerouslySetInnerHTML={{ __html: activity.description }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityList;
