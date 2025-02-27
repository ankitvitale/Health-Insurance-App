import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../config';




const ClaimDetailModal = ({ claim, onClose }) => {
  if (!claim) return null;

  return (
      <div className="modal-overlay">
          <div className="modal-content">
              <h2>Claim Details</h2>
              <button className="close-button" onClick={onClose}>Close</button>
              <div>
                  <p><strong>Card No:</strong> {claim.cardNo}</p>
                  <p><strong>Patient Name:</strong> {claim.pesentName}</p>
                  <p><strong>Emp Name:</strong> {claim.employeeName}</p>
                  <p><strong>Hospital:</strong> {claim.hospital}</p>
                  <p><strong>Coupon:</strong> {claim.coupon}</p>
                  <p><strong>Location:</strong> {claim.location}</p>
                  {/* <p><strong>Doctor:</strong> {claim.nameOfDoctor}</p>
                  <p><strong>Hospital:</strong> {claim.hospital.hospitalName}</p>
                  <p><strong>Doctor Fee:</strong> {claim.doctorFeeSurgeonAss}</p>
                  <p><strong>Room Rent:</strong> {claim.perDayRoomRent}</p>
                  <p><strong>Expected Length of Stay:</strong> {claim.expectedLengthOfStay}</p>
                  <p><strong>Chief Complaints:</strong> {claim.chiefComplaints}</p>
                  <p><strong>Status:</strong> {claim.status}</p> */}
                  <div>
                      <p><strong>Documents:</strong></p>
                      <p>
                          <strong>Doc1:</strong>
                          <img src={claim.doc1} alt="Aadhar Card" style={{ width: '140px'}} />
                      </p>   
                  </div>
              </div>
          </div>
      </div>
  );
};



const HealthList = () => {
  const [cleamRequests, setCleamRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedClaim, setSelectedClaim] = useState(null); 

  useEffect(() => {
    const fetchCleamRequests = async () => {
      const token = localStorage.getItem('token');
      try {
        let response = await fetch(`${BASE_URL}/adminHeathCheckupList`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        setCleamRequests(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCleamRequests();
  }, []);

  const token = localStorage.getItem('token');

  const updateStatus = async (id, status) => {
    try {
      setCleamRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id ? { ...request, status } : request
        )
      );

      let url = `${BASE_URL}/healthCheckupAuthorized/${id}`;
      let response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      alert('Successfully Authorized');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error updating status:', error);
      setCleamRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id ? { ...request, status: 'Pending' } : request
        )
      );
    }
  };

  const updateStatusReject = async (id, status) => {
    try {
      setCleamRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id ? { ...request, status } : request
        )
      );

      let url = `${BASE_URL}/healthCheckupRejected/${id}`;
      let response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      alert('Successfully Rejected');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error updating status:', error);
      setCleamRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id ? { ...request, status: 'Pending' } : request
        )
      );
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleViewClick = (claim) => {
    setSelectedClaim(claim); 
  };
  const handleCloseModal = () => {
    setSelectedClaim(null); 
  };

  console.log(cleamRequests)

  return (
    <>
    <div className='container'>
      <div className="table-container">
        <table>
          <tr >
            <th className='th'>ID</th>
            <th className='th'>CardNo</th>
            <th className='th'>Patient Name</th>
            <th className='th'>Employee Name</th>
            <th className='th'>Location</th>
            <th className='th'>Hospital</th>
            <th className='th'>Status</th>
            <th className='th'>Action</th>
          </tr>
          {cleamRequests.length > 0 ? (
            cleamRequests.map((request) => (
              <tr key={request.id}>
                <td className='td'>{request.id}</td>
                <td className='td'>{request.cardNo}</td>
                <td className='td'>{request.pesentName}</td>
                <td className='td'>{request.employeeName}</td>
                <td className='td'>{request.location}</td>
                <td className='td'>{request.hospital}</td>
                <td className='td'>{request.status}</td>
                <td className='td'>
                  <button
                    style={{
                      margin: '1px',
                      backgroundColor: 'green',
                      color: 'white',
                      padding: '2px',
                    }}
                    onClick={() => updateStatus(request.id, 'Authorized')}
                  >
                    Approve
                  </button>
                  <button
                    style={{
                      margin: '1px',
                      backgroundColor: 'red',
                      color: 'white',
                      padding: '2px',
                    }}
                    onClick={() => updateStatusReject(request.id, 'Rejected')}
                  >
                    Reject
                  </button>/
                  <button className='td' onClick={() => handleViewClick(request)}>View</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No data available</td>
            </tr>
          )}
        </table>
      </div>
    </div>
    {selectedClaim && (
                <ClaimDetailModal claim={selectedClaim} onClose={handleCloseModal} />
            )}
    </>
  );
};

export default HealthList;
