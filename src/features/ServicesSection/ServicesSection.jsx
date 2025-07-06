import React, { useEffect, useRef } from 'react';
import './ServicesSection.css';
import ServicesSectionCard from '../../components/ServicesSectionCard/ServicesSectionCard';
import { FaPhone, FaCalendar, FaUserMd } from 'react-icons/fa';

const ServicesSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('services-visible');
          }
        });
      },
      {
        threshold: 0.2
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

  const services = [
    {
      icon: <FaPhone />,
      title: "Call for appointment",
      description: "Contact us to schedule your appointment"
    },
    {
      icon: <FaCalendar />,
      title: "Get a Date & Serial",
      description: "Receive your appointment date and serial number"
    },
    {
      icon: <FaUserMd />,
      title: "Consult Your Doctor",
      description: "Meet with your doctor at the scheduled time"
    }
  ];

  return (
    <section className="services-section" ref={sectionRef}>
      <div className="services-container">
        <div className="services-content">
          <div className="services-text">
            <h2 className="services-title">How to get our service?</h2>
            <p className="services-subtitle">Just follow these simple steps</p>
          </div>
          <div className="services-grid">
            {services.map((service, index) => (
              <ServicesSectionCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
