import React, { useState } from "react";
import "../styles/form.css";

const ActivityForm = ({ onAddActivity }) => {
  const [formData, setFormData] = useState({
    activity_name: "",
    activity_category: "",
    activity_location: "",
    price: "",
    commission_amount: "",
    description: "",
    age_range: "",
    gender: "both",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newActivity = {
      id: Date.now().toString(), // Unique string ID
      ...formData,
    };

    onAddActivity(newActivity);

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem("formActivities")) || [];
    localStorage.setItem("formActivities", JSON.stringify([...existing, newActivity]));

    alert("Activity added successfully!");

    // Reset form
    setFormData({
      activity_name: "",
      activity_category: "",
      activity_location: "",
      price: "",
      commission_amount: "",
      description: "",
      age_range: "",
      gender: "both",
    });
  };

  return (
    <div className="form-wrapper">
      <h2>Add New Activity</h2>
      <form onSubmit={handleSubmit} className="activity-form">
        <label>
          Activity Name:
          <input type="text" name="activity_name" value={formData.activity_name} onChange={handleChange} />
        </label>

        <label>
          Category (comma separated):
          <input type="text" name="activity_category" value={formData.activity_category} onChange={handleChange} />
        </label>

        <label>
          Location:
          <input type="text" name="activity_location" value={formData.activity_location} onChange={handleChange} />
        </label>

        <label>
          Price:
          <input type="number" name="price" value={formData.price} onChange={handleChange} />
        </label>

        <label>
          Commission Amount:
          <input type="number" name="commission_amount" value={formData.commission_amount} onChange={handleChange} />
        </label>

        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
        </label>

        <label>
          Age Range:
          <input type="text" name="age_range" value={formData.age_range} onChange={handleChange} />
        </label>

        <label>
          Gender:
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="both">Other</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>

        <button type="submit">Submit Activity</button>
      </form>
    </div>
  );
};

export default ActivityForm;