import React, { useState } from "react";
import LoginModal from "./LoginModal/LoginModal";
import OTPModal from "./OTPModal/OTPModal";
import FillData from "./FillData/FillData";

const Login = ({ isLoginOpen, setIsLoginOpen }) => {
  const [isOTPOpen, setIsOTPOpen] = useState(false);
  const [isFillDataOpen, setIFillDataOpen] = useState(false);

  const handleSendCode = () => {
    setIsLoginOpen(false);
    setIsOTPOpen(true);
  };
  const handleVerifyCode = () => {
    setIsOTPOpen(false);
    setIFillDataOpen(true);
  };
  const handleNext = () => {
    setIFillDataOpen(false);
  };
  return (
    <>
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSendCode={handleSendCode}
      />
      <OTPModal
        isOpen={isOTPOpen}
        onClose={() => setIsOTPOpen(false)}
        onVerifyCode={handleVerifyCode}
      />
      <FillData
        isOpen={isFillDataOpen}
        onClose={() => setIFillDataOpen(false)}
        onNext={handleNext}
      />
    </>
  );
};

export default Login;
