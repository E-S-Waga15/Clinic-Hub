import React, { useState ,useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';

import About from './pages/AboutUs/About';
import Doctors from './features/Doctors/Doctors';
import Contact from './pages/ContactUs/Contact';
import Login from './features/Login/Login';
import Footer from './components/Footer/Footer';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import NotFound from './pages/NotFound/NotFound';

function App() {

  useEffect(() => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.style.display = 'none';
    }
  }, []);
  


  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  return (
    <Router>
      <div className="App">
        <Navbar onLoginClick={handleLoginClick} />
        <Login isLoginOpen={isLoginModalOpen} setIsLoginOpen={setIsLoginModalOpen} />
        <Routes>
        <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/specialty" element={<Navigate to="/" state={{ scrollTo: 'specialty-section' }} replace />} />
          <Route path="/about" element={<About />} />
          <Route path="/doctor" element={<Navigate to="/" state={{ scrollTo: 'doctors-section' }} replace />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
