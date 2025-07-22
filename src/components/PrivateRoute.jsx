// src/components/PrivateRoute.jsx
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = ({ setIsLoginModalOpen }) => {
  const token = localStorage.getItem('token');
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';


  const [shouldOpenLoginModal, setShouldOpenLoginModal] = useState(false);
  const location = useLocation(); 


  useEffect(() => {

    if (!token || !isLoggedIn) {
      setShouldOpenLoginModal(true);
    }

  }, [token, isLoggedIn]); 


  useEffect(() => {
    if (shouldOpenLoginModal) {
      setIsLoginModalOpen(true);
    
      setShouldOpenLoginModal(false); 
    }
  }, [shouldOpenLoginModal, setIsLoginModalOpen]);

  if (token && isLoggedIn) {
    return <Outlet />; 
  } else {
  
    return <Navigate to="/" state={{ from: location }} replace />;
  }
};

export default PrivateRoute;