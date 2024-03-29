import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Otp.css';
import Swal from 'sweetalert2';
import { verifyOTP } from '../../api/AuthRequest.js'
import { useParams } from 'react-router-dom';

const Otp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60); // Timer in seconds
  const [expired, setExpired] = useState(false);
  const { username } = useParams();
  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        setExpired(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);
 
  const handleVerify = async () => {
    const enteredOtp = otp.join('');
    console.log(`Verifying OTP for username: ${username}, OTP: ${enteredOtp}`);
    try {
       const response = await verifyOTP(username, enteredOtp);
       console.log('Server response:', response);
       // Check if the response indicates success
       if (response.data && response.data.message === 'OTP verified successfully') {
         navigate("/home");
         Swal.fire({
           icon: 'success',
           title: 'Successfully logged in!',
           showConfirmButton: false,
           timer: 1500
         });
       } else {
         // If the response does not indicate success, log the response for debugging
         console.error('Unexpected response:', response);
         Swal.fire({
           icon: 'error',
           title: 'Incorrect OTP!',
           text: 'Please enter the correct OTP.',
         });
       }
    } catch (error) {
       console.error("Error during OTP verification:", error);
       Swal.fire({
         icon: 'error',
         title: 'Error!',
         text: 'An error occurred during OTP verification. Please try again.',
       });
    }
   };
   
   

  const handleInputChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    if (value !== '' && index < newOtp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }

    setOtp(newOtp);
  };

  const resendOtp = () => {
    // Resend OTP functionality here
    setTimer(60); // Reset timer
    setExpired(false); // Reset expiration status
    setOtp(['', '', '', '', '', '']); // Clear entered OTP
  };

  return (
    <div className="otp-container">
      <h2>OTP Verification</h2>
      <p>Enter the OTP sent to your registered email</p>

      <div className="otp-input-container">
        {otp.map((value, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            type="text"
            maxLength="1"
            value={value}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        ))}
      </div>

      <button className="verify-button" onClick={handleVerify}>
        Verify
      </button>

      {expired && (
        <p className="expired-message">OTP has expired. <button onClick={resendOtp}>Resend OTP</button></p>
      )}

      {!expired && (
        <p className="timer-message">Resend OTP in {timer} seconds</p>
      )}
    </div>
  );
};

export default Otp;
