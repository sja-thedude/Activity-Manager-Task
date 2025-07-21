import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ActivityDetail = ({ activities }) => {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);

  useEffect(() => {
  axios
    .get("https://62.171.179.12/api/activities", {
      headers: {
        "x-api-key": "your_super_secret_api_key",
      },
    })
    .then((res) => {
      const apiActivity = res.data.find((act) => act.id.toString() === id);
      if (apiActivity) {
        setActivity(apiActivity);
      } else {
        const localActivities = JSON.parse(localStorage.getItem("formActivities")) || [];
        const localActivity = localActivities.find((act) => act.id.toString() === id);
        if (localActivity) {
          setActivity(localActivity);
        } else {
          setActivity(null);
        }
      }
    })
    .catch((err) => {
      console.error("Error fetching activity:", err);

      const localActivities = JSON.parse(localStorage.getItem("formActivities")) || [];
      const localActivity = localActivities.find((act) => act.id === id);
      if (localActivity) {
        setActivity(localActivity);
      } else {
        setActivity(null);
      }
    });
}, [id]);

  if (!activity) return <p>Loading...</p>;

  return (
    <div className="activity-detail">
      <Link to="/activities">← Back to List</Link>
      <h2>{activity.activity_name}</h2>
      {activity.images && activity.images.length > 0 ? (
  <img
    src={activity.images[0]} // Only the first image from the array
    alt={`${activity.activity_name}`}
    style={{ width: "200px", borderRadius: "10px" }}
    />
    ) : (
    <img
        src={activity.image || "https://via.placeholder.com/200"}
        alt={activity.activity_name}
        style={{ width: "200px", borderRadius: "10px" }}
    />
    )}

      <p><strong>Category:</strong> {Array.isArray(activity.activity_category) ? activity.activity_category.join(", ") : activity.activity_category}</p>
      <p><strong>Location:</strong> {activity.activity_location}</p>
      <p><strong>Description:</strong> {activity.description}</p>
      <p><strong>Price:</strong> {activity.discounted_price || activity.price} SAR</p>
      <p><strong>Age Range:</strong> {activity.age_range}</p>
      <p><strong>Gender:</strong> {activity.gender}</p>
      <p><strong>Available Days:</strong> {Array.isArray(activity.available_days) ? activity.available_days.join(", ") : activity.available_days}</p>
      <p><strong>Rating:</strong> {activity.rating}</p>
    </div>
  );
};

export default ActivityDetail;
