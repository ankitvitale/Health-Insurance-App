import React, { useEffect, useState } from 'react';


const ClaimDetailModal = ({ claim, onClose }) => {
  if (!claim) return null;

  return (
      <div className="modal-overlay">
          <div className="modal-content">
              <h2>Claim Details</h2>
              <button className="close-button" onClick={onClose}>Close</button>
              <div>
                  <p><strong>Card No:</strong> {claim.healthCardNo}</p>
                  <p><strong>Patient Name:</strong> {claim.patientName}</p>
                  <p><strong>Provisional Diagnosis:</strong> {claim.provisionalDiagnosis}</p>
                  <p><strong>Date of Admission:</strong> {new Date(claim.dateOfAdmission).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })}</p>
                  <p><strong>Total Expense:</strong> {claim.totalExpenseHospitalization}</p>
                  <p><strong>Address:</strong> {claim.address}</p>
                  <p><strong>Doctor:</strong> {claim.nameOfDoctor}</p>
                  <p><strong>Hospital:</strong> {claim.hospital.hospitalName}</p>
                  <p><strong>Doctor Fee:</strong> {claim.doctorFeeSurgeonAss}</p>
                  <p><strong>Room Rent:</strong> {claim.perDayRoomRent}</p>
                  <p><strong>Expected Length of Stay:</strong> {claim.expectedLengthOfStay}</p>
                  <p><strong>Chief Complaints:</strong> {claim.chiefComplaints}</p>
                  <p><strong>Status:</strong> {claim.status}</p>
                  <p><strong>Discharge message:</strong> {claim.massage? claim.massage : 'Not Discharge Yet'}</p>
                  <div className='discharge' style={{display:'flex', flexWrap:'wrap', gap:'12px'}}>
                      <p><strong>Documents:</strong></p>
                      <span>
                          <p>Aadhar:</p>
                          <img src={`https://82.112.237.134:8080/${claim.aadharCard}`} alt="Aadhar Card" style={{ width: '140px' }} />
                      </span>
                      <span>
                          <p>Promissory:</p>
                          <img src={`https://jivithealthcare.in/api/${claim.promissoryNote}`} alt="Promissory Note" style={{ width: '140px' }} />
                      </span>
                      <span>
                          <p>Jivat Card:</p>
                          <img src={claim.jivatHealthCard} alt="Jivat Health Card" style={{ width: '140px'}} />
                      </span>
                      <span>
                          <p>Salary Cheque:</p>
                          <img src={claim.salaryACCheque} alt="Salary AC Cheque" style={{ width: '140px' }} />
                      </span>
                      <span>
                          <p>Discharge</p>
                          {
                            claim.dischargecard ? <img src={claim.dischargecard} alt="Discharge" style={{ width: '140px' }} /> :'Not Discharge Yet'
                          }
                          
                      </span>
                      <span>
                          <p>finalBill</p>
                          {
                            claim.finalbill ? <img src={claim.finalbill} alt="Final-Bill" style={{ width: '140px' }} /> :'Not Discharge Yet'
                          }
                          
                      </span>
                  </div>
              </div>
          </div>
      </div>
  );
};

const CleamRequestList = () => {
  const [cleamRequests, setCleamRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const [selectedClaim, setSelectedClaim] = useState(null); 

  useEffect(() => {
    const fetchCleamRequests = async () => {
      try {
        let response = await fetch(`https://jivithealthcare.in/api/adminCleamRequests`, {
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

  const updateStatus = async (id, status) => {
    try {
      let url = `https://jivithealthcare.in/api/updateStatusAuthorized/${id}`;
      let response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      alert('Successfully Authorized');
      setCleamRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id ? { ...request, status } : request
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const updateStatusreject = async (id, status) => {
    try {
      let url = `https://jivithealthcare.in/api/updateStatusRejected/${id}`;
      let response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      alert('Successfully Rejected');
      setCleamRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id ? { ...request, status } : request
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
console.log(cleamRequests)

const handleViewClick = (claim) => {
  setSelectedClaim(claim); 
};
const handleCloseModal = () => {
  setSelectedClaim(null); 
};

  return (
    <>
    <div className="container">
                <div className="table-container">
      <table border="1">
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Hospital Name</th>
            <th>Patient Name</th>
            <th>Dignousis</th>
            <th>DOA</th>
            <th>Amount</th>
            <th>Health Card ID</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead> 
        <tbody>
          {cleamRequests.length > 0 ? (
            cleamRequests.map((request,ind) => (
              <tr key={request.id}>
                <td>{ind}</td>
                <td>{request.hospital?.hospitalName}</td>
                <td>{request.patientName}</td>
                <td>{request.provisionalDiagnosis}</td>
                <td> {new Date(request.dateOfAdmission).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                    })} </td> 
                <td>{request.totalExpenseHospitalization}</td>
                <td>{request.healthCardNo}</td>
                <td>{request.status}</td>
                <td>
                  <button
                    onClick={() => updateStatus(request.id, 'Authorized')}
                    style={{ margin: '1px', backgroundColor: 'green', color: 'white', padding: '2px' }}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatusreject(request.id, 'Rejected')}
                    style={{ margin: '1px', backgroundColor: 'red', color: 'white', padding: '2px' }}
                  >
                    Reject
                  </button>/
                  <button className='td' onClick={() => handleViewClick(request)}>View</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>
    {selectedClaim && (
                <ClaimDetailModal claim={selectedClaim} onClose={handleCloseModal} />
            )}
    </>
  );
};

export default CleamRequestList;
