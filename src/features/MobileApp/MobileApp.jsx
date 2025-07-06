import React, { useEffect, useRef } from 'react';
import { Carousel, Button, Container, Row, Col } from 'react-bootstrap';
import './MobileApp.css';

import FirstImage from '../../assets/MobileApp/first.svg';
import SecondImage from '../../assets/MobileApp/second.svg';
import ThirdImage from '../../assets/MobileApp/third.svg';

const slides = [
  {
    image: FirstImage,
    text: "I've tried many health apps before, but none made managing my medications this simple. With this app, I can easily track all my prescriptions and receive timely reminders—no more missed doses. It feels reassuring to know my health is organized and under control, right from my phone."
  },
  {
    image: SecondImage,
    text: "I've tried several healthcare apps before, but none offered this level of organization. With this app, I can easily schedule and manage my appointments, and access my full medical history anytime. It's truly comforting to have my entire healthcare journey right at my fingertips."
  },
  {
    image: ThirdImage,
    text: "What I love most about this app is the detailed medical record it keeps for me. I can view my full health history, treatments, and medications anytime — even if I visit a different clinic. It's like carrying my medical file in my pocket."
  }
];

const MobileApp = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
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

  return (
    <div className="mobile-carousel-wrapper section-hidden" ref={sectionRef}>
      <Carousel 
        interval={5000} 
        indicators={true} 
        controls={true}
        touch={true}
        className="swipeable-carousel"
      >
        {slides.map((slide, idx) => (
          <Carousel.Item key={idx}>
            <Container fluid className="mobile-carousel-slide">
              <Row className="align-items-center">
                <Col xs={12} lg={7} className="mobile-image-container">
                  <img
                    src={slide.image}
                    alt={`App Screenshot ${idx + 1}`}
                    className="mobile-img floating"
                  />
                </Col>
                <Col xs={12} lg={5} className="text-content fade-in-right">
                  <div className="quote-mark">"</div>
                  <p className="testimonial">{slide.text}</p>
                  {idx === 2 && (
                    <Button variant="light" className="download-btn">
                      Download it now
                    </Button>
                  )}
                </Col>
              </Row>
            </Container>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default MobileApp;
