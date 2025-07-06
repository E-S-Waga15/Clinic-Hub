import React, { useEffect, useRef, useState } from "react";
import {
  FaTooth,
  FaHeartbeat,
  FaPills,
  FaStethoscope,
  FaBrain,
  FaUserMd,
  FaDna,
  FaAmbulance,
} from "react-icons/fa";
import DoctorsModal from "../../pages/Home/LoggedIn/DoctorsModal/DoctorsModal";
import "./SpecialtySection.css";
import Login from "../Login/Login";

const Specialty = () => {
  const sectionRef = useRef(null);
  const [isDoctorsModalOpen, setIsDoctorsModalOpen] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add visible class to the section first
            entry.target.classList.add("visible");

            // Then add visible class to each card with a delay
            const cards = entry.target.querySelectorAll(".specialty-card");
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add("visible");
              }, index * 100); // 100ms delay between each card
            });
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleCardClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseDoctorsModal = () => {
    setIsLoginModalOpen(false);
  };

  const specialties = [
    { icon: <FaTooth />, title: "Dentistry" },
    { icon: <FaStethoscope />, title: "General Diagnosis" },
    { icon: <FaBrain />, title: "Neuro Surgery" },
    { icon: <FaHeartbeat />, title: "Cardiology" },
    { icon: <FaPills />, title: "Pharmacy" },
    { icon: <FaUserMd />, title: "Trained Staff" },
    { icon: <FaDna />, title: "DNA Mapping" },
    { icon: <FaAmbulance />, title: "Medical Aid" },
  ];

  return (
    <>
      <section className="specialty-section" ref={sectionRef}>
        <div className="specialty-header">
          <h2>Our Medical Services</h2>
          <h2 className="key-feature">
            KEY <span>FEATURE</span>
          </h2>
        </div>
        <div className="specialty-grid">
          {specialties.map((specialty, index) => (
            <div
              key={index}
              className="specialty-card"
              onClick={() => handleCardClick(specialty.title)}
            >
              <div className="icon">{specialty.icon}</div>
              <h3>{specialty.title}</h3>
              <p> Get consultation form our {specialty.title} team</p>
            </div>
          ))}
        </div>
      </section>

      <Login
        isLoginOpen={isLoginModalOpen}
        setIsLoginOpen={setIsLoginModalOpen}
      />
    </>
  );
};

export default Specialty;
