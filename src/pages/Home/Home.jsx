import React, { useEffect ,useState } from 'react';
import { useLocation } from 'react-router-dom';
import HeroSection from '../../features/hero/HeroSection';
import ServicesSection from '../../features/ServicesSection/ServicesSection';
import SpecialtySection from '../../features/specialtySection/SpecialtySection';
import HowtoUse from '../../features/HowtoUse/HowtoUse';
import Doctors from '../../features/Doctors/Doctors';
import MobileApp from '../../features/MobileApp/MobileApp';
import WhoAre from '../../features/WhoAre/WhoAre';
import Specialty from './LoggedIn/Specialty/Specialty'

const Home = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (location.state?.scrollTo) {
      const section = document.getElementById(location.state.scrollTo);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  useEffect(() => {
    // جلب حالة الدخول وبيانات المستخدم من localStorage
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);

  }, []);

  return (
    <>
      <HeroSection />
      <ServicesSection />
      <div id="oo">
        {isLoggedIn ? (
                <Specialty/>
              ) : ( <SpecialtySection />)}
      </div>
      <HowtoUse />
      <div id="doctors-section">
        <Doctors />
      </div>
      <MobileApp />
      <WhoAre/>
    </>
  );
};

export default Home; 