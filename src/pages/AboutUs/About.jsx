import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./About.css";
import WhoAreImage from "../../assets/WhoAre.svg";

const About = () => {
  useEffect(() => {
    const cards = document.querySelectorAll(".vision-card");
    cards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.2}s`;
      card.classList.add("fade-in-up");
    });
  }, []);

  return (
    <div className="about-section">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="about-content">
            <div className="section-title fade-in-left">
              <h2>Clinic Hub</h2>
            </div>
            <div className="about-text fade-in-left">
              <p>
                Clinic Hub It's a smart digital platform that aims to transform
                the healthcare experience through technology. By combining ease
                of use with efficiency, we strive to provide an integrated
                digital solution that facilitates patients' access to medical
                services and supports doctors and medical staff in organizing
                tasks and providing more effective healthcare.
              </p>
              <div className="mt-3">
             
  <a
      href="/files/Clinic-Hub-Project-Presentation.pdf"
    download
    className="btn btn-primary"
  >
    📄 Download Bochure
  </a>
</div>

              
              </div>
           
          </Col>
          <Col lg={6} className="about-content">
            <div className="about-imag fade-in-right">
              <img src={WhoAreImage} alt="Clinic Hub" />
            </div>
          </Col>
        </Row>
        <Row className="vision-cards">
          <Col md={4}>
            <div className="vision-card">
              <div className="card-icon">
                <i className="fas fa-heart"></i>
              </div>
              <h3>Why Us?</h3>
              <p>
                With cultural and civilizational progress, the demand for home
                healthcare services has increased. We realize that quality care,
                psychological comfort, and physical relief are fundamental for
                the patient. From this standpoint, we are committed to providing
                home healthcare services. We hope to be your support in
                maintaining your health and comfort.
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="vision-card">
              <div className="card-icon">
                <i className="fas fa-star"></i>
              </div>
              <h3>Mission & Goals</h3>
              <p>
                Clinic Hub seeks to provide outstanding service based on smart
                technologies and qualified expertise, committed to humanitarian
                values and comprehensive scientific and medical foundations
                across various specialties. We adhere to the highest quality
                standards that serve the patient's mental and physical health
                while at home, and aim to raise health awareness in society.
              </p>
            </div>
          </Col>

          <Col md={4}>
            <div className="vision-card">
              <div className="card-icon">
                <i className="fas fa-lightbulb"></i>
              </div>
              <h3>Vision & Values</h3>
              <p>
                We strive to elevate the concept of home healthcare, and for
                Clinic Hub to become a pioneer in home healthcare across Saudi
                Arabia in a unique and distinct period. We aspire to be pioneers
                in providing smart, innovative, and distinguished high-quality
                services that meet patients' needs in their homes.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
