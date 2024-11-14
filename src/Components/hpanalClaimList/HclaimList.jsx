// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const ClaimDetailModal = ({ claim, onClose }) => {
//     if (!claim) return null;

//     return (
//         <div className="modal-overlay">
//             <div className="modal-content">
//                 <h2>Claim Details</h2>
//                 <button className="close-button" onClick={onClose}>Close</button>
//                 <div>
//                     <p><strong>Card No:</strong> {claim.healthCardNo}</p>
//                     <p><strong>Patient Name:</strong> {claim.patientName}</p>
//                     <p><strong>Provisional Diagnosis:</strong> {claim.provisionalDiagnosis}</p>
//                     <p><strong>Date of Admission:</strong> {claim.dateOfAdmission}</p>
//                     <p><strong>Total Expense:</strong> {claim.totalExpenseHospitalization}</p>
//                     <p><strong>Address:</strong> {claim.address}</p>
//                     <p><strong>Doctor:</strong> {claim.nameOfDoctor}</p>
//                     <p><strong>Hospital:</strong> {claim.hospital.hospitalName}</p>
//                     <p><strong>Doctor Fee:</strong> {claim.doctorFeeSurgeonAss}</p>
//                     <p><strong>Room Rent:</strong> {claim.perDayRoomRent}</p>
//                     <p><strong>Expected Length of Stay:</strong> {claim.expectedLengthOfStay}</p>
//                     <p><strong>Chief Complaints:</strong> {claim.chiefComplaints}</p>
//                     <p><strong>Status:</strong> {claim.status}</p>
//                     <div>
//                         <p><strong>Documents:</strong></p>
//                         <p>
//                             <strong>Aadhar Card:</strong>
//                             <img src={claim.aadharCard} alt="Aadhar Card" style={{ width: '140px'}} />
//                         </p>
//                         <p>
//                             <strong>Promissory Note:</strong>
//                             <img src={claim.promissoryNote} alt="Promissory Note" style={{ width: '140px' }} />
//                         </p>
//                         <p>
//                             <strong>Jivat Health Card:</strong>
//                             <img src={claim.jivatHealthCard} alt="Jivat Health Card" style={{ width: '140px'}} />
//                         </p>
//                         <p>
//                             <strong>Salary AC Cheque:</strong>
//                             <img src={claim.salaryACCheque} alt="Salary AC Cheque" style={{ width: '140px' }} />
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const HclaimList = () => {
//     const [data, setData] = useState([]);
//     const [filteredData, setFilteredData] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedClaim, setSelectedClaim] = useState(null); 
// const navigate = useNavigate()
//     const token = localStorage.getItem('jwtToken');

//     useEffect(() => {
//         async function getData() {
//             if (!token || !isTokenValid(token)) {
//                 console.error("Token is missing, invalid, or malformed.");
//                 return;
//             }
            
//             try {
//                 let response = await fetch(url, {
//                     method: 'GET',
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                         'Content-Type': 'application/json',
//                     },
//                 });
    
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }
                
//                 let emp = await response.json();
//                 setData(emp);
//                 setFilteredData(emp);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         }
        
//         getData();
//     }, [token]);


    
//     function isTokenValid(token) {
//         const parts = token.split('.');
//         return parts.length === 3;
//     }

//     const handleSearch = (event) => {
//         const value = event.target.value;
//         setSearchTerm(value);
        
//         const filtered = data.filter(item =>
//             item.healthCardNo.toLowerCase().includes(value.toLowerCase()) ||
//             item.patientName.toLowerCase().includes(value.toLowerCase()) ||
//             item.provisionalDiagnosis.toLowerCase().includes(value.toLowerCase())
//         );
//         setFilteredData(filtered);
//     };

//     const handleViewClick = (claim) => {
//         setSelectedClaim(claim); 
//     };

//     const handleCloseModal = () => {
//         setSelectedClaim(null); 
//     };
//     const handleDownload = (id) => {
//         navigate(`pdf/${id}`);
//     };
//     const handleApprovel = (id) => {
//         navigate(`approvel/${id}`);
//     };
//     return (
//         <>
//             <h1>Claim List</h1>
//             <input style={{ width: '25%', marginLeft: '20px' }}
//                 type="text"
//                 placeholder="Search by CardNo, Patient Name, or Disease"
//                 value={searchTerm}
//                 onChange={handleSearch}
//             />
//             <div className="container">
//                 <div className="table-container">
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>Sr No.</th>
//                                 <th>CardNo</th>
//                                 <th>Patient Name</th>
//                                 <th>Disease</th>
//                                 <th>Amount</th>
//                                 <th>Date Of Admission</th>
//                                 <th>Status</th>
//                                 <th>Action</th>
//                                 <th>Approvel</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {filteredData.map((item, index) => (
//                                 <tr key={index}>
//                                     <td>{item.id}</td>
//                                     <td>{item.healthCardNo}</td>
//                                     <td>{item.patientName}</td>
//                                     <td>{item.provisionalDiagnosis}</td>
//                                     <td>{item.totalExpenseHospitalization}</td>
//                                     <td>{item.dateOfAdmission}</td>
//                                     <td>{item.status}</td>
//                                     <td>
//                                         <button className='td' onClick={() => handleViewClick(item)}>View</button>/
//                                         <button className='td' onClick={() => handleDownload(item.id)}>Download</button>
//                                     </td>
//                                     <td>
//                                        {item.status === 'Authorized' ?  <button className='td' onClick={() => handleApprovel(item.id)}>Download</button> :'Processing' }</td>
//                                 </tr>
//                             ))}
//                         </tbody> 
//                     </table>
//                 </div>
//             </div>

//             {selectedClaim && (
//                 <ClaimDetailModal claim={selectedClaim} onClose={handleCloseModal} />
//             )}
//         </>
//     );
// };

// export default HclaimList;

// const modalStyles = `
// .modal-overlay {
//     position: fixed;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     background: rgba(0, 0, 0, 0.7);
//     display: flex;
//     justify-content: center;
//     align-items: center;
// }

// .modal-content {
//     background: white;
//     padding: 20px;
//     border-radius: 5px;
//     max-width: 600px;
//     width: 100%;
// }

// .close-button {
//     background: red;
//     color: white;
//     border: none;
//     padding: 10px;
//     cursor: pointer;
//     float: right;
// }
// `;

// const styleElement = document.createElement('style');
// styleElement.innerHTML = modalStyles;
// document.head.appendChild(styleElement);



import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Hclaimlist.css"
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
                    <p><strong>Date of Admission:</strong> {claim.dateOfAdmission}</p>
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
                          <img src={claim.aadharCard} alt="Aadhar Card" style={{ width: '140px'}} />
                      </span>
                      <span>
                          <p>Promissory:</p>
                          <img src={claim.promissoryNote} alt="Promissory Note" style={{ width: '140px' }} />
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
                            claim.dischargecard ? <img src={claim.dischargecard} alt="Salary AC Cheque" style={{ width: '140px' }} /> :'Not Discharge Yet'
                          }
                          
                      </span>
                      <span>
                          <p>finalBill</p>
                          {
                            claim.finalbill ? <img src={claim.finalbill} alt="Salary AC Cheque" style={{ width: '140px' }} /> :'Not Discharge Yet'
                          }
                          
                      </span>
                  </div>
                </div>
            </div>
        </div>
    );
};

const DischargeModal = ({ claimId, onClose }) => {
    const [message, setMessage] = useState('');
    const [finalBill, setFinalBill] = useState(null);
    const [dischargeCard, setDischargeCard] = useState(null);
    const token = localStorage.getItem('jwtToken');
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('massage', message);
        formData.append('finalbill', finalBill);
        formData.append('dischargecard', dischargeCard);

        try {
            const response = await fetch(`http://82.112.237.134:8080/updateCleamRequest/${claimId}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                alert('Discharge information submitted successfully');
                onClose();
            } else {
                console.error('Failed to submit discharge information');
            }
        } catch (error) {
            console.error('Error submitting discharge information:', error);
        }
    };

    const handleFileChange = (e, setFile) => {
        setFile(e.target.files[0]);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Discharge Details</h2>
                <button className="close-button" onClick={onClose}>Close</button>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Message</label>
                        <input
                            name='massage'
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Final Bill (Document)</label>
                        <input
                            type="file"
                            name='finalbill'
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFileChange(e, setFinalBill)}
                            required
                        />
                    </div>
                    <div>
                        <label>Discharge Card (Document)</label>
                        <input
                            type="file"
                            name='dischargecard'
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFileChange(e, setDischargeCard)}
                            required
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

const HclaimList = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedClaim, setSelectedClaim] = useState(null);
    const [dischargeClaimId, setDischargeClaimId] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('jwtToken');

    useEffect(() => {
        async function getData() {
            if (!token || !isTokenValid(token)) {
                console.error("Token is missing, invalid, or malformed.");
                return;
            }

            try {
                let url = `http://82.112.237.134:8080/hospitalCleamRequests`;
                let response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                let emp = await response.json();
                setData(emp);
                setFilteredData(emp);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        getData();
    }, [token]);

    function isTokenValid(token) {
        const parts = token.split('.');
        return parts.length === 3;
    }

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        const filtered = data.filter(item =>
            item.healthCardNo.toLowerCase().includes(value.toLowerCase()) ||
            item.patientName.toLowerCase().includes(value.toLowerCase()) ||
            item.provisionalDiagnosis.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const handleViewClick = (claim) => {
        setSelectedClaim(claim);
    };

    const handleCloseModal = () => {
        setSelectedClaim(null);
    };
        const handleDownload = (id) => {
        navigate(`pdf/${id}`);
    };

    const handleDischarge = (id) => {
        setDischargeClaimId(id);
    };
const handleApprovel = (id) => {
    navigate(`approvel/${id}`);
};

    return (
        <>
            <h1>Claim List</h1>
            <input
                style={{ width: '25%', marginLeft: '20px' }}
                type="text"
                placeholder="Search by CardNo, Patient Name, or Disease"
                value={searchTerm}
                onChange={handleSearch}
            />
            <div className="container">
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Sr No.</th>
                                <th>CardNo</th>
                                <th>Patient Name</th>
                                <th>Disease</th>
                                <th>Amount</th>
                                <th>Date Of Admission</th>
                                <th>Status</th>
                                <th>Action</th>
                                <th>Discharge</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.healthCardNo}</td>
                                    <td>{item.patientName}</td>
                                    <td>{item.provisionalDiagnosis}</td>
                                    <td>{item.totalExpenseHospitalization}</td>
                                    <td>{item.dateOfAdmission}</td>
                                    <td>{item.status}</td>
                                    <td>
                                        <button className='td' onClick={() => handleViewClick(item)}>View</button>
                                        <button className='td' onClick={() => handleDownload(item.id)}>Download</button>
                                         {item.status === 'Authorized' ?  <button className='td' onClick={() => handleApprovel(item.id)}>Approval</button> :'Processing' }
                                    </td>
                                    <td>
                                        {item.status === 'Authorized' ? (
                                            <button className='td' onClick={() => handleDischarge(item.id)}>Discharge</button>
                                        ) : 'Processing'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedClaim && (
                <ClaimDetailModal claim={selectedClaim} onClose={handleCloseModal} />
            )}

            {dischargeClaimId && (
                <DischargeModal claimId={dischargeClaimId} onClose={() => setDischargeClaimId(null)} />
            )}
        </>
    );
};

export default HclaimList;

