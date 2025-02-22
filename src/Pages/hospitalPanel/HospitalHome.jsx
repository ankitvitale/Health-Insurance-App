import React, { useState } from 'react';
import './Home.css'; 
import { Link, Outlet } from 'react-router-dom';
import logo from '../../Assets/jivit-logo.svg'
import { FaDownload } from 'react-icons/fa';
import { BASE_URL } from '../../config';

const HospitalHome = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [hospitalName, setHospitalName] = useState(''); 
  const [message, setMessage] = useState(''); 

  function Logout() {
    localStorage.removeItem('jwtToken');
    window.location.href = '/hospitallogin';
  }

  function openPopup() {
    setIsPopupOpen(true); 
  }

  function closePopup() {
    setIsPopupOpen(false);
    setMessage('');
  }

  const token = localStorage.getItem("jwtToken");

  async function submitMessage() {
    if (message.trim() === '') {
      alert('Please enter a message before submitting.');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/tecketRaise`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,

        },
        body: JSON.stringify({ hospitalName, message }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit message');
      }

      console.log('Message submitted successfully:', message);
      alert('Message submitted successfully!');

      closePopup(); 
    } catch (error) {
      console.error('Error submitting message:', error);
      alert('Failed to submit the message. Please try again.');
    }
  }

  return (
    <>
      <header>
        <div className="hopitalName">
          <img src={logo} alt="" width={'150px'} />
        </div>
        <div className="ticket">
          <Link to={''}>CheckUp Request</Link>
          <Link to={'checkuplist'}>CheckUp List</Link>
          <Link to={'claimform'}>Claim request</Link>
          <Link to={'hclaimlist'}>Claim List</Link>
          <a href='/docs/kutumb.pdf'
            target='_blank'
            download='kutumb.pdf'>Cutumb PramanPatra<FaDownload color='blue' /></a>
          <a href='/docs/parishist.pdf'
            target='_blank'
            download='parishist.pdf'>Parishist Document<FaDownload color='blue' /></a>
          <button className="lbtn" onClick={Logout}>Logout</button>
          <button className="lbtn" onClick={openPopup}>Ticket</button>
        </div>
      </header>

      <Outlet />

     
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h2>Submit a Ticket</h2>
            <input type="text" placeholder="Enter your hospital name" value={hospitalName} onChange={(e) => setHospitalName(e.target.value)} />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message here"
              rows="4"
              cols="50"
            />
            <button onClick={submitMessage}>Add</button> 
            <button onClick={closePopup}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
};

export default HospitalHome;
