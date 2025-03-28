import React, { useState } from "react";
import plans from "../../utils/plans";
import "./Addplan.css";  
import {useNavigate} from "react-router-dom"

const AddPlan = () => {
    const navigate = useNavigate()
  const [formData, setFormData] = useState({
    id:"",
    name: "",
    price: "",
    users: "",
    features: "",
    details: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPlan = {
      ...formData,
      features: formData.features.split(",").map((feature) => feature.trim()), // Convert features to array
    };
    newPlan.id = plans.length+1;

    plans.push(newPlan);
    alert("Plan Submitted Successfully!");

    setFormData({ id: "", name: "", price: "", users: "", features: "", details: "" });
    navigate("/courses")
  };

  return (
    <div className="add-plan-container">
      <h2>Create a New Plan</h2>
      <form onSubmit={handleSubmit}>
       

        <label>Plan Name:</label>
        <select name="name" value={formData.name} onChange={handleChange} required>
          <option value="">Select a Plan</option>
          {plans.map((plan, index) => (
            <option key={index} value={plan.name}>
              {plan.name}
            </option>
          ))}
        </select>

        <label>Price:</label>
        <input type="text" name="price" value={formData.price} onChange={handleChange} required />

        <label>Users:</label>
        <input type="text" name="users" value={formData.users} onChange={handleChange} required />

        <label>Features (Comma Separated):</label>
        <input type="text" name="features" value={formData.features} onChange={handleChange} required />

        <label>Details:</label>
        <textarea name="details" value={formData.details} onChange={handleChange} rows="4" required></textarea>

        <button type="submit">Submit Plan</button>
      </form>
    </div>
  );
};

export default AddPlan;
