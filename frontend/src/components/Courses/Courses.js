import "./Courses.css"
import React from "react";
import { Link } from "react-router-dom";

import plans from "../../utils/plans";

const Courses = () => {
  
  return (
    <div className="plan-container">
      {plans.map((plan, index) => (
        <div key={index} className="plan-card">
          <h2 className="plan-title">{plan.name}</h2>
          <p className="plan-price">{plan.price}</p>
          <p className="plan-users">{plan.users}</p>
          <ul className="plan-features">
            {plan.features.map((feature, idx) => (
              <li key={idx} className="plan-feature">✅ {feature}</li>
            ))}
          </ul>
          <Link to={`/enroll/${plan.id}`}><button className="plan-button">Choose Plan</button></Link>
        </div>
      ))}
    </div>
  );
};

export default Courses;
