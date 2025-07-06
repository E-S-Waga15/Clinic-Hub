import React, { useState, useEffect, useRef } from "react";
import "./HowtoUse.css";
import sinup from "../../assets/HowtoUse/sinup.svg";
import FillYourData from "../../assets/HowtoUse/FillYourData.svg";
import Appointment from "../../assets/HowtoUse/Appointment.svg";
import Notifications from "../../assets/HowtoUse/Notifications.svg";
import ViewRecords from "../../assets/HowtoUse/ViewRecords.svg";
import HowtoUseMin from "./HowtoUseMin";

const steps = [
  {
    img: sinup,
    title: "Sign Up and Create an Account",
    desc: "Create a secure account using your personal and medical information.",
  },
  {
    img: FillYourData,
    title: "Fill in Your Health Data",
    desc: "Enter your essential health details to serve as a reference for any medical service, such as medications or medical history.",
  },
  {
    img: Appointment,
    title: "Book an Appointment",
    desc: "Browse available doctors and choose the time that suits you easily through a simple and fast interface.",
  },
  {
    img: Notifications,
    title: "Receive In-App Notifications",
    desc: "Get real-time reminders for upcoming visits and medication times directly through the app.",
  },
  {
    img: ViewRecords,
    title: "View Records and Reports",
    desc: "After your visit, you can access your medical files, results, and reports anytime.",
  },
];

const HowtoUse = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1100);
  const stepsRef = useRef([]);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1100);
    };
    window.addEventListener("resize", handleResize);

    // Setup Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px'
      }
    );

    // Observe each step
    stepsRef.current.forEach((step) => {
      if (step) observer.observe(step);
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, []);

  if (!isLargeScreen) {
    return <HowtoUseMin />;
  }

  return (
    <div className="howto-zigzag-outer-wrapper">
      <h2 className="howto-zigzag-title-main">How to Use?</h2>
      <div className="howto-zigzag-container">
        <div className="howto-progress-bar-wrapper">
          <div className="howto-progress-bar" />
        </div>
        {steps.map((step, idx) => (
          <div 
            ref={el => stepsRef.current[idx] = el}
            className={`howto-zigzag-step ${idx % 2 === 0 ? "top" : "bottom"}`} 
            key={idx}
          >
            {idx % 2 === 0 ? (
              <>
                <div className="howto-zigzag-circle">
                  <img src={step.img} alt={step.title} className="howto-zigzag-img" />
                </div>
                <div className="howto-zigzag-text">
                  <span className="howto-zigzag-number">{idx + 1}</span>
                  <span className="howto-zigzag-title">{step.title}</span>
                  <div className="howto-zigzag-desc">{step.desc}</div>
                </div>
              </>
            ) : (
              <>
                <div className="howto-zigzag-text">
                  <span className="howto-zigzag-number">{idx + 1}</span>
                  <span className="howto-zigzag-title">{step.title}</span>
                  <div className="howto-zigzag-desc">{step.desc}</div>
                </div>
                <div className="howto-zigzag-circle">
                  <img src={step.img} alt={step.title} className="howto-zigzag-img" />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowtoUse;
