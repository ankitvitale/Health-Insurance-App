import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OtpForm = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); 
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
const navigate = useNavigate()
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await axios.post(`https://jivithealthcare.in/api/send-otp`, null, {
        params: { email: email },
      });
      setMessage(response.data);  
      setStep(2); 
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Error sending OTP.');
      } else {
        setError('Network error or server unavailable.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await axios.post(`https://jivithealthcare.in/api/validate-otp`, null, {
        params: { email: email, otp: otp },
      });
      setMessage(`Success! Token: ${response.data.jwtToken}`); 
      localStorage.setItem('jwtToken', response.data.jwtToken)
      navigate('/hospitalhome')
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Invalid OTP.');
      } else {
        setError('Network error or server unavailable.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="otp-form-container">
      {step === 1 ? (
        <div>
          <h2>Enter Your Email</h2>
          <form onSubmit={handleEmailSubmit}>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
                placeholder="Enter your email"
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        </div>
      ) : (
        <div>
          <h2>Enter OTP</h2>
          <form onSubmit={handleOtpSubmit}>
            <div>
              <label>OTP:</label>
              <input
                type="text"
                value={otp}
                onChange={handleOtpChange}
                required
                placeholder="Enter the OTP sent to your email"
              />
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Verifying OTP...' : 'Verify OTP'}
            </button>
          </form>
        </div>
      )}

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default OtpForm;
