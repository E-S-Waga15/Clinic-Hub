import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Appointments from './pages/Appointments/Appointments';

import About from './pages/AboutUs/About';
import Doctors from './features/Doctors/Doctors'; // لاحظ أن هذا لم يعد مستخدماً كمسار مباشر
import Contact from './pages/ContactUs/Contact';
import Login from './features/Login/Login';
import Footer from './components/Footer/Footer';
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
import NotFound from './pages/NotFound/NotFound';

// استيراد PrivateRoute
import PrivateRoute from './components/PrivateRoute';

function App() {
  // للتعامل مع شاشة التحميل الأولية
  useEffect(() => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.style.display = 'none';
    }
  }, []);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [redirectPathAfterLogin, setRedirectPathAfterLogin] = useState(null); // جديد: لتخزين المسار المراد إعادة التوجيه إليه

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false); // إغلاق المودال
    if (redirectPathAfterLogin) {
      // إعادة التوجيه إلى المسار المحفوظ بعد تسجيل الدخول بنجاح
      // استخدام Navigate هنا يتطلب استخدام useNavigate hook داخل مكون
      // لذا سنعتمد على منطق Router في Appointments إذا لم يتم التعامل معها هنا
    }
  };

  return (
    <Router>
      <div className="App">
        <Navbar onLoginClick={handleLoginClick} />
        {/* تمرير دالة handleLoginSuccess إلى مكون Login لإغلاق المودال بعد النجاح */}
        <Login
          isLoginOpen={isLoginModalOpen}
          setIsLoginOpen={setIsLoginModalOpen}
          onLoginSuccess={handleLoginSuccess} // تمرير هذه الدالة
        />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />

          {/* المسار الخاص (Private Route) */}
          {/* تمرير setIsLoginModalOpen إلى PrivateRoute */}
          <Route element={<PrivateRoute setIsLoginModalOpen={setIsLoginModalOpen} />}>
            <Route path="/appointments" element={<Appointments />} />
          </Route>

          <Route path="/about" element={<About />} />
          <Route path="/doctor" element={<Navigate to="/" state={{ scrollTo: 'doctors-section' }} replace />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;