import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOtp } from '../../../store/slices/authSlice';
import "./OTPModal.css";
import AuthBanner from '../../../components/AuthBanner/AuthBanner';
import { Tuple } from '@reduxjs/toolkit';

const OTPModal = ({ isOpen, onClose, onVerifyCode }) => {
  const [otp, setOtp] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(0);
  const inputRef = useRef(null);

  const dispatch = useDispatch();
  const { phoneNumber, loading, isLoggedIn, filledData, error } = useSelector(state => state.auth);

  useEffect(() => {
    if (!isOpen) {
      setOtp('');
      setFocusedIndex(0);
    } else if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isLoggedIn && filledData === false) {
      onVerifyCode();
    }
  }, [isLoggedIn, filledData, onVerifyCode]);

  useEffect(() => {
    if (isLoggedIn  && filledData === true ) {
      onClose();
      window.location.reload();
    }
  }, [isLoggedIn, onClose]);


  const handleVerify = () => {
    if (otp.length === 4 && phoneNumber) {
      dispatch(verifyOtp({ number: phoneNumber, otp }));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleVerify();
    }
  };

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setOtp(value);
    setFocusedIndex(Math.min(value.length, 3));
  };

  const handleBoxClick = (index) => {
    const allowedIndex = Math.min(otp.length, 3);
    if (index <= allowedIndex) {
      setFocusedIndex(index);
      inputRef.current?.focus();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="otp-modal-overlay" onClick={(e) => {
      if (e.target.classList.contains('otp-modal-overlay')) {
        onClose();
      }
    }}>
      <div className="otp-modal-content container-fluid">
        <AuthBanner onClose={onClose} />
        <div className="row h-100 flex-column flex-lg-row">
          <div className="otp-content-container col-12 col-lg-6">
            <h1 className="otp-title">Verify your<br />phone number</h1>
            <p className="otp-subtitle">
              Enter the 4-digit code we sent to<br />your phone number
            </p>

            <div className="d-flex flex-column flex-lg-row align-items-center gap-2 w-100">
              <div className="otp-container w-100">
                <input 
                  ref={inputRef}
                  type="text" 
                  value={otp}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  className="otp-input-hidden"
                />
                <div className="otp-boxes d-flex gap-2">
                  {Array(4).fill(0).map((_, index) => {
                    const isFilled = index < otp.length;
                    const isActive = index === focusedIndex;
                    const isClickable = index <= otp.length;

                    return (
                      <div
                        key={index}
                        className={`otp-box flex-1 d-flex align-items-center justify-content-center 
                          ${isActive ? 'focused' : ''} 
                          ${isFilled ? 'filled' : ''} 
                          ${isClickable ? 'clickable' : ''}`}
                        onClick={() => handleBoxClick(index)}
                      >
                        {otp[index] || <span>0</span>}
                        {isActive && !isFilled && <div className="otp-cursor-blink"></div>}
                      </div>
                    );
                  })}
                </div>
              </div>
              <button 
                onClick={handleVerify}
                className="otp-button"
                disabled={otp.length !== 4 || loading}
              >
                {loading ? 'Verifying...' : 'Verify Code'}
              </button>
            </div>
                  
            {error && <p className="text-danger mt-2 text-center">{error}</p>}

            <p className="mt-3 text-center">
              Didn't receive the code? <button className="btn btn-link p-0 otp-resend-link">
                Resend Code
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPModal;
