import React, { useRef, useEffect } from "react";
import "./HowtoUseMin.css";
import sinup from "../../assets/HowtoUse/sinup.svg";
import healthData from "../../assets/HowtoUse/FillYourData.svg";
import bookAppointment from "../../assets/HowtoUse/Appointment.svg";
import notification from "../../assets/HowtoUse/Notifications.svg";
import ViewRecords from "../../assets/HowtoUse/ViewRecords.svg";

const HowtoUseMin = () => {
  const scrollRef = useRef(null);
  const cardCount = 5;
  const currentIndex = useRef(0);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!scrollRef.current) return;
      const container = scrollRef.current;
      const cardWidth = container.querySelector('.howto-min-card').offsetWidth;
      const gap = 18; // Gap between cards
      const scrollAmount = cardWidth + gap;
      
      currentIndex.current = (currentIndex.current + 1) % cardCount;
      const scrollTo = currentIndex.current * scrollAmount;
      
      container.scrollTo({ left: scrollTo, behavior: "smooth" });
    }, 3000); // Increased interval time to ensure visibility
    return () => clearInterval(interval);
  }, [cardCount]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            setTimeout(() => {
              observer.unobserve(entry.target);
            }, 2000);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    return () => {
      if (wrapperRef.current) {
        observer.unobserve(wrapperRef.current);
      }
    };
  }, []);

  const steps = [
    {
      img: sinup,
      title: "Create an Account",
      desc: "Sign up and create your personal account to get started with our services."
    },
    {
      img: healthData,
      title: "Fill Health Data",
      desc: "Enter your health information and medical history for better care."
    },
    {
      img: bookAppointment,
      title: "Book Appointment",
      desc: "Schedule your medical appointments with our healthcare providers."
    },
    {
      img: notification,
      title: "Receive Notifications",
      desc: "Get timely reminders and updates about your appointments and care."
    },
    {
      img: ViewRecords,
      title: "View Records",
      desc: "Access your medical records and health information anytime."
    }
  ];

  return (
    <div className="howto-min-steps-wrapper" ref={wrapperRef}>
      <h2 className="howto-min-title">How to Use</h2>
      <div className="howto-min-cards-scroll" ref={scrollRef}>
        {steps.map((step, idx) => (
          <div className="howto-min-card" key={idx}>
            <div className="howto-min-img-wrapper">
              <img 
                src={step.img} 
                alt={step.title} 
                className="howto-min-img"
                loading="eager"
              />
            </div>
            <div className="howto-min-step-number">{idx + 1}</div>
            <h3 className="howto-min-card-title">{step.title}</h3>
            <p className="howto-min-card-desc">{step.desc}</p>
          </div>
        ))}
        <div className="howto-min-card-spacer" />
      </div>
    </div>
  );
};

export default HowtoUseMin;
