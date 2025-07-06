import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOtp } from '../../../store/slices/authSlice';
import "./OTPModal.css";
import AuthBanner from '../../../components/AuthBanner/AuthBanner';
import OtpInput from 'react-otp-input';

const OTPModal = ({ isOpen, onClose, onVerifyCode }) => {
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const { phoneNumber, loading, isLoggedIn, filledData, error } = useSelector(state => state.auth);

  useEffect(() => {
    if (!isOpen) {
      setOtp('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (isLoggedIn && filledData === false) {
      onVerifyCode();
    }
  }, [isLoggedIn, filledData, onVerifyCode]);

  useEffect(() => {
    if (isLoggedIn && filledData === true) {
      onClose();
      window.location.reload();
    }
  }, [isLoggedIn, onClose]);

  const handleVerify = () => {
    if (otp.length === 4 && phoneNumber) {
      dispatch(verifyOtp({ number: phoneNumber, otp }));
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
              <div className="otp-container w-100 d-flex justify-content-center">
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={4}
                  isInputNum
                  shouldAutoFocus
                  inputStyle={{
                    width: '48px',
                    height: '48px',
                    margin: '0 5px',
                    fontSize: '20px',
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                    textAlign: 'center',
                    backgroundColor: '#f9f9f9'
                  }}
                  focusStyle={{
                    border: '2px solid #006A71',
                    outline: 'none'
                  }}
                />
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
