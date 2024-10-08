import React, { useState, useEffect } from "react";
import "./RippleButton.css"; // Assuming your CSS file for ripple styles

const RippleButton = ({ children, className = "", ...props }) => {
  const [rippleArray, setRippleArray] = useState([]);

  const createRipple = (event) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();

    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const newRipple = { x, y, size };
    setRippleArray((prevState) => [...prevState, newRipple]);
  };

  useEffect(() => {
    if (rippleArray.length > 0) {
      const timeout = setTimeout(() => setRippleArray([]), 600);
      return () => clearTimeout(timeout);
    }
  }, [rippleArray]);

  return (
    <button
      className={`ripple-button ${className}`} // Class names for styling
      onMouseDown={createRipple} // Start ripple on mouse down
      {...props} // Spread remaining props such as type, disabled, etc.
    >
      {rippleArray.map((ripple, index) => (
        <span
          key={index}
          className="ripple"
          style={{
            width: ripple.size,
            height: ripple.size,
            top: ripple.y,
            left: ripple.x,
          }}
        />
      ))}
      <span className="button-content">{children}</span>
    </button>
  );
};

export default RippleButton;
