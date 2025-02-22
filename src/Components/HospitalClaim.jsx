import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../config';

const ClaimDetailModal = ({ claim, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!claim) return null;

  const handleImageClick = (src) => {
    setSelectedImage(src);
  };

  const handleDownload = (src) => {
    const link = document.createElement('a');
    link.href = src;
    link.setAttribute('download', 'image.jpg'); // Sets default filename
    link.target = '_blank'; // Opens in new tab if necessary
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
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
          <p><strong>Discharge message:</strong> {claim.massage ? claim.massage : 'Not Discharge Yet'}</p>
          <div className='discharge' style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
            <p><strong>Documents:</strong></p>
            {[
              { label: 'Aadhar', src: `${BASE_URL}/${claim.aadharCard}` },
              { label: 'Promissory', src: `${BASE_URL}/${claim.promissoryNote}` },
              { label: 'Jivat Card', src: claim.jivatHealthCard },
              { label: 'Salary Cheque', src: claim.salaryACCheque },
              { label: 'Discharge', src: claim.dischargecard },
              { label: 'Final Bill', src: claim.finalbill }
            ].map((doc, index) => (
              doc.src ? (
                <span key={index} style={{ textAlign: 'center' }}>
                  <p>{doc.label}:</p>
                  <img
                    src={doc.src}
                    alt={doc.label}
                    style={{ width: '140px', height: 'auto', cursor: 'pointer', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }}
                    onClick={() => handleImageClick(doc.src)}
                  />
                  <div style={{ marginTop: '8px' }}>
                  
                    <button style={{padding:"5px",backgroundColor:"#0073CF",color:"white",border:"none" }} onClick={() => handleImageClick(doc.src)}>Show</button>
                  </div>
                </span>
              ) : (
                <span key={index}>{doc.label}: Not Available</span>
              )
            ))}
          </div>
        </div>
      </div>
      {selectedImage && (
        <div className="fullscreen-overlay" onClick={() => setSelectedImage(null)}>
          <div className="fullscreen-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <img src={selectedImage} alt="Full View" style={{ maxWidth: '90%', maxHeight: '90vh', borderRadius: '8px' }} />
            <div style={{ marginTop: '12px' }}>
              <button  onClick={() => handleDownload(selectedImage)} style={{ marginRight: '8px',padding:"5px",backgroundColor:"#0073CF",color:"white",border:"none"}}>Complete Open</button>
              <button onClick={() => setSelectedImage(null)} style={{ marginRight: '8px',padding:"5px",backgroundColor:"black",color:"white",border:"none" }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
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
        // let response = await fetch(`${BASE_URL}/adminCleamRequests`, {
         let response = await fetch(`${BASE_URL}/adminCleamRequests`, {

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
      let url = `${BASE_URL}/updateStatusAuthorized/${id}`;
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
      let url = `${BASE_URL}/updateStatusRejected/${id}`;
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
            <th className='th'>Sr.No</th>
            <th className='th'>Hospital Name</th>
            <th className='th'>Patient Name</th>
            <th className='th'>Dignousis</th>
            <th className='th'>DOA</th>
            <th className='th'>Amount</th>
            <th className='th'>Health Card ID</th>
            <th className='th'>Status</th>
            <th className='th'>Action</th>
          </tr>
        </thead> 
        <tbody>
          {cleamRequests.length > 0 ? (
            cleamRequests.map((request,ind) => (
              <tr key={request.id}>
                <td className='td'>{ind}</td>
                <td className='td'>{request.hospital?.hospitalName}</td>
                <td className='td'>{request.patientName}</td>
                <td className='td'>{request.provisionalDiagnosis}</td>
                <td className='td'> {new Date(request.dateOfAdmission).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                    })} </td> 
                <td className='td'>{request.totalExpenseHospitalization}</td>
                <td className='td'>{request.healthCardNo}</td>
                <td className='td'>{request.status}</td>
                <td className='td'>
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
                  <button   style={{ margin: '1px', backgroundColor: '#0073CF', color: 'white', padding: '2px' }} onClick={() => handleViewClick(request)}>View</button>
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
