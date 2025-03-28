import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EnrollCourse.css";
import RippleButton from "../../utils/Buttons/RippleButton";
import plans from "../../utils/plans";

const url = "http://localhost:1234";

const EnrollCourse = () => {
  const [showModal, setShowModal] = useState(false);
  const [plan,setPlan] = useState()
  const [modalMessage, setModalMessage] = useState("");
  const { planId } = useParams();
  console.log(planId,"PlanID")
  const navigate = useNavigate();


  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    try {
      const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

      if (!res) {
        alert("Failed to load Razorpay SDK. Please try again.");
        return;
      }

      const orderResponse = await fetch(`${url}/payment/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 200 * 100, // Convert to paise
          currency: "INR",
        }),
      });

      const orderData = await orderResponse.json();

      const options = {
        key: "rzp_test_akyGsz2f5xPFbl",
        amount: orderData.amount,
        currency: "INR",
        name: "TensorGo",
        description: "Course Enrollment Payment",
        image: "/tensorgo-logo.png",
        order_id: orderData.id,
        handler: async function (response) {
          await handleEnroll(response.razorpay_payment_id);
        },
        prefill: {
          name: "TensorGO",
          email: "tensorgo@gmail.com",
        },
        theme: {
          color: "#F4C430",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Error in payment:", error);
      setModalMessage("Payment failed. Please try again.");
      setShowModal(true);
    }
  };

  useEffect(()=>{
    setPlan(plans.find((item) => item.id === planId))
    console.log(plan,"Plan")
  })

  const handleEnroll = async (paymentId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${url}/payment/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ planId, paymentId }),
        credentials: "include",
      });

      const result = await response.json();

      if (response.ok) {
        setModalMessage("Enrollment Successful! You have successfully enrolled.");
      } else {
        setModalMessage(result.message || "An error occurred.");
      }

      setShowModal(true);

      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } catch (error) {
      console.error("Error enrolling in course:", error);
      setModalMessage("An unexpected error occurred. Please try again.");
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="enroll-page">
      <h1>Enroll in the Course</h1>
        <div className="enroll-container">
          <h2 className="enroll-plan-name">{plan?.name}</h2>
          <p>
            Price:
            <span className="discounted-price">
              &#8377;
              {plan?.price}
            </span>
           
          </p>
          <div className="enrollcourse-features">
            <p>{plan?.features?.map((item)=> {return(
              <div>
                <br/>
                <span>{item}</span>
                <br/>
              </div>
            )
            })}</p>
          </div>
        <div className="enrollcourse-details">{plan?.details}</div>
          <RippleButton
            type="button"
            className="enroll-btn"
            onClick={handlePayment}
          >
            
            Complete Enrollment
          </RippleButton>
        </div>
     
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h4>
              {modalMessage.includes("Successful")
                ? "Enrollment Successful!"
                : "OOPs!"}
            </h4>
            <p>{modalMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnrollCourse;
