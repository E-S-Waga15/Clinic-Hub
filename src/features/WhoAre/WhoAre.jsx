import React, { useEffect } from 'react';
import './WhoAre.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import WhoAreImage from '../../assets/WhoAre.svg';

const WhoAre = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="who-are-section" id="who-are">
      <div className="who-are-header">
        <h2>
          <span className="who">WHO</span> <span className="we-are">WE ARE</span>
        </h2>
        <h3 className="history-heading">Our Glorious <br /> <strong>History</strong></h3>
      </div>

      <div className="who-are-content">
        <div className="image-box" data-aos="fade-right">
          <img src={WhoAreImage} alt="Clinic Hub" />
        </div>
        <div className="text-box" data-aos="fade-left">
          <h4>Who are we?</h4>
          <p>
            Clinic Hub is a smart digital platform that aims to transform the healthcare experience through technology.
            By combining ease of use with efficiency, we strive to provide an integrated digital solution that facilitates
            patients' access to medical services and supports doctors and medical staff in organizing tasks and
            providing more effective healthcare.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhoAre;
