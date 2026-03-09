import React, { useState } from 'react';
import './OTPInput.css';

const OTPInput = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const handleChange = (val, index) => {
    if (isNaN(val)) return;
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);
    if (val && index < 3) document.getElementById(`otp-${index + 1}`).focus();
  };
  return (
    <div className="otp-container">
      <h2>Enter OTP</h2>
      <div className="otp-inputs">
        {otp.map((d, i) => (
          <input key={i} id={`otp-${i}`} type="text" maxLength="1" value={d} onChange={e => handleChange(e.target.value, i)} />
        ))}
      </div>
    </div>
  );
};
export default OTPInput;
