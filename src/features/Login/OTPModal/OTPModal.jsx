import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp } from "../../../store/slices/authSlice";
import "./OTPModal.css";
import AuthBanner from "../../../components/AuthBanner/AuthBanner";
import { Tuple } from "@reduxjs/toolkit";
const OTPModal = ({ isOpen, onClose, onVerifyCode }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputsRef = useRef([]);

  const dispatch = useDispatch();
  const { phoneNumber, loading, isLoggedIn, filledData, error } = useSelector(state => state.auth);

  useEffect(() => {
    if (!isOpen) {
      setOtp(['', '', '', '']);
    } else {
      inputsRef.current[0]?.focus();
    }
  }, [isOpen]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, ''); // رقم فقط
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // تنقل للخانة التالية تلقائيًا
    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      const updatedOtp = [...otp];
      if (otp[index] === '') {
        // انتقل للخلف إذا كانت الخانة فارغة
        inputsRef.current[index - 1]?.focus();
      } else {
        updatedOtp[index] = '';
        setOtp(updatedOtp);
      }
    }
  };

  const handleVerify = () => {
    const otpCode = otp.join('');
    if (otpCode.length === 4 && phoneNumber) {
      dispatch(verifyOtp({ number: phoneNumber, otp: otpCode }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="otp-modal-overlay" onClick={(e) => {
      if (e.target.classList.contains('otp-modal-overlay')) {
        onClose();
      }
    }}>
      <div className="otp-modal-content">
        <div className="otp-boxes d-flex gap-2 justify-content-center">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => inputsRef.current[index] = el}
              type="text"
              inputMode="numeric"
              pattern="\d*"
              maxLength={1}
              className="otp-box text-center"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              style={{ width: '50px', height: '50px', fontSize: '24px' }}
            />
          ))}
        </div>
        <button
          onClick={handleVerify}
          disabled={otp.some(d => d === '') || loading}
        >
          {loading ? 'Verifying...' : 'Verify Code'}
        </button>
        {error && <p className="text-danger mt-2">{error}</p>}
      </div>
    </div>
  );
};


export default OTPModal;
