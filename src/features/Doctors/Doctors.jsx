import React, { useState, useEffect, useRef } from 'react';
import DoctorCard from '../../components/DoctorCard/DoctorCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Doctors.css';

// Import doctor images
import doctor1 from '../../assets/doctors/doctor1.png';
import doctor2 from '../../assets/doctors/doctor2.png';
import doctor3 from '../../assets/doctors/doctor3.png';
import doctor4 from '../../assets/doctors/doctor4.png';

const Doctors = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [slideDirection, setSlideDirection] = useState('');
  const sectionRef = useRef(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth > 1200);
    };

    // Initial check
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);

    // Setup Intersection Observer only if we're in the home page
    if (window.location.pathname === '/') {
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

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      return () => {
        window.removeEventListener('resize', checkScreenSize);
        observer.disconnect();
      };
    }

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const doctors = [
    {
      image: doctor1,
      name: "Dr. Jeanette Hoff",
      specialty: "Orthodontic Treatment"
    },
    {
      image: doctor2,
      name: "Dr. David Ambrose",
      specialty: "Orthodontic Treatment"
    },
    {
      image: doctor3,
      name: "Dr. Jenelia Breton",
      specialty: "Orthodontic Treatment"
    },
    {
      image: doctor4,
      name: "Dr. Jagajeet Aurora",
      specialty: "Orthodontic Treatment"
    }
  ];

  const handlePrevClick = () => {
    setSlideDirection('slide-right');
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? doctors.length - 4 : prevIndex - 1
    );
    
    setTimeout(() => {
      setSlideDirection('');
    }, 500);
  };

  const handleNextClick = () => {
    setSlideDirection('slide-left');
    setCurrentIndex((prevIndex) => 
      prevIndex === doctors.length - 4 ? 0 : prevIndex + 1
    );
    
    setTimeout(() => {
      setSlideDirection('');
    }, 500);
  };

  const handleAppointmentClick = (doctorName) => {
    console.log(`Appointment requested with ${doctorName}`);
  };

  const displayedDoctors = isLargeScreen ? doctors.slice(currentIndex, currentIndex + 4) : doctors;

  return (
    <div ref={sectionRef} className="doctors-section">
      <div className="container">
        <h2 className="section-title">Our Doctors</h2>
        <div className="doctors-slider-container">
          {isLargeScreen && (
            <button 
              className="slider-button prev"
              onClick={handlePrevClick}
              aria-label="Previous doctors"
            >
              <FaChevronLeft />
            </button>
          )}
          
          <div className={`doctors-grid ${slideDirection}`}>
            {displayedDoctors.map((doctor, index) => (
              <DoctorCard
                key={index}
                image={doctor.image}
                name={doctor.name}
                specialty={doctor.specialty}
                onAppointmentClick={() => handleAppointmentClick(doctor.name)}
              />
            ))}
          </div>

          {isLargeScreen && (
            <button 
              className="slider-button next"
              onClick={handleNextClick}
              aria-label="Next doctors"
            >
              <FaChevronRight />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors; 