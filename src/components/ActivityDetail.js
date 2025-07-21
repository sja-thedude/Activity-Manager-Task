import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ActivityDetail = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    axios
      .get("http://62.171.179.12/api/activities", {
        headers: {
          "x-api-key": "your_super_secret_api_key",
        },
      })
      .then((res) => {
        setActivity(res.data[id]);
      })
      .catch((err) => console.error("Error fetching activity:", err));
  }, [id]);

  if (!activity) return <p>Loading...</p>;

  return (
    <div className="activity-detail">
      <Link to="/activities">← Back to List</Link>
      <h2>{activity.activity_name}</h2>
      {activity.images && activity.images.length > 0 ? (
  <img
    src={activity.images[0]} // Only the first image from the array
    alt={`${activity.activity_name} Image`}
    style={{ width: "200px", borderRadius: "10px" }}
    />
    ) : (
    <img
        src={activity.image || "https://via.placeholder.com/200"}
        alt={activity.activity_name}
        style={{ width: "200px", borderRadius: "10px" }}
    />
    )}

      <p><strong>Category:</strong> {activity.activity_category?.join(", ")}</p>
      <p><strong>Location:</strong> {activity.activity_location}</p>
      <p><strong>Description:</strong> {activity.description}</p>
      <p><strong>Price:</strong> {activity.discounted_price || activity.price} SAR</p>
      <p><strong>Age Range:</strong> {activity.age_range}</p>
      <p><strong>Gender:</strong> {activity.gender}</p>
      <p><strong>Available Days:</strong> {activity.available_days?.join(", ")}</p>
      <p><strong>Rating:</strong> {activity.rating}</p>
    </div>
  );
};

export default ActivityDetail;
