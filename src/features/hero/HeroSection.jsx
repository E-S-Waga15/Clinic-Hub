import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../../assets/HeroSection.svg';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-12 hero-content">
            <h1 className="hero-title">
              Your Health, <br />
              Our Priority
            </h1>
            <p className="hero-description">
              Book appointments with the best doctors and specialists in your area.
              Quick, easy, and convenient healthcare access at your fingertips.
            </p>
            <div className="hero-buttons">
              <Link to="/specialty" className="btn btn-primary hero-btn">
                Get Started
              </Link>
              <Link to="/about" className="btn btn-outline hero-btn">
                Learn more about the app
              </Link>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 hero-image-container">
            <img src={heroImage} alt="Healthcare Illustration" className="hero-image" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
