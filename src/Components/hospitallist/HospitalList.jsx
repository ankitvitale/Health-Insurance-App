import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HospitalDetailModal = ({ hospital, onClose }) => {
    if (!hospital) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Hospital Details</h2>
                <button className="close-button" onClick={onClose}>Close</button>
                <div>
                    <p><strong>Hospital Name:</strong> {hospital.hospitalName}</p>
                    <p><strong>Doctor Name:</strong> {hospital.doctorName}</p>
                    <p><strong>Speciality:</strong> {hospital.speciality}</p>
                    <p><strong>Phone Number:</strong> {hospital.mobileNo}</p>
                    <p><strong>Email:</strong> {hospital.email}</p>
                    <p><strong>Address:</strong> {hospital.address}</p>
                    <p><strong>City:</strong> {hospital.tahsil}</p>
                    <p><strong>District:</strong> {hospital.district}</p>
                    <p><strong>Country:</strong> {hospital.country}</p>
                    <p><strong>Bank Name:</strong> {hospital.bankName}</p>
                    <p><strong>Account Number:</strong> {hospital.accountNumber}</p>
                    <p><strong>IFSC Code:</strong> {hospital.ifscCode}</p>
                    <p><strong>Account Name:</strong> {hospital.accountName}</p>
                    <p><strong>OTP:</strong> {hospital.otp}</p>
                    <p><strong>Pincode:</strong> {hospital.pincode}</p>
                    <p><strong>Remark:</strong> {hospital.remark}</p>
                    <p><strong>Expiration Time:</strong>  {new Date(hospital.expirationTime).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                    })} </p>
                </div>
            </div>
        </div>
    );
};

function HospitalList() {
    const [data, setData] = useState([]);
    const [selectedHospital, setSelectedHospital] = useState(null); // State for the selected hospital
     const [search, setSearch] = useState('');
const navigate = useNavigate()
    useEffect(() => {
        async function getData() {
            const token = localStorage.getItem('token');
            try {
                let url = `https://jivithealthcare.in/api/AllhospitalsList`;
                
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
                console.log(emp);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        
        getData();
    }, []);
     const filteredData = data
        .filter(item =>
            item.hospitalName?.toLowerCase().includes(search.toLowerCase()) ||
            item.doctorName?.toLowerCase().includes(search.toLowerCase()) ||
            item.speciality?.toLowerCase().includes(search.toLowerCase()) ||
            item.tahsil?.toLowerCase().includes(search.toLowerCase()) ||
            item.email?.toLowerCase().includes(search.toLowerCase()) ||
            item.mobileNo?.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => a.hospitalName?.localeCompare(b.hospitalName));

    const handleViewClick = (hospital) => {
        setSelectedHospital(hospital); // Set the selected hospital to show in the modal
    };

    const handleDeleteClick = async(id) =>{
        const token = localStorage.getItem('token');
         try {
         let url = `https://jivithealthcare.in/api/deleteHospital/${id}`
           

            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            alert('Data Deleted')
            // Check if the response is successful
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            console.log('Beneficiary deleted successfully');
            navigate('/admin/hospitallist');
        } catch (error) {
            console.error('Error deleting beneficiary:', error);
        }

    }

    const handleCloseModal = () => {
        setSelectedHospital(null); // Close the modal
    };

    return (
        <>
            <div style={{ padding: '20px', display:"flex",flexDirection:"column",alignItems:"center" }}>
                  <input
                    type="text"
                    placeholder="Search hospitals..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{
                        marginBottom: '15px',
                        padding: '6px',
                        width: '100%',
                        maxWidth: '350px',
                        border: '1px solid #ccc',
                        borderRadius: '4px'
                    }}
                />
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Hospital Name</th>
                                <th>Phone Number</th>
                                <th>Doctor Name</th>
                                <th>Speciality</th>
                                <th>Email</th>
                                <th>City</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.hospitalName}</td>
                                    <td>{item.mobileNo}</td>
                                    <td>{item.doctorName}</td>
                                    <td>{item.speciality}</td>
                                    <td>{item.email}</td>
                                    <td>{item.tahsil}</td>
                                    <td>
                                        <button className='td' onClick={() => handleViewClick(item)}>View</button>
                                        <button className='td' onClick={() => handleDeleteClick(item.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal to show hospital details */}
            {selectedHospital && (
                <HospitalDetailModal hospital={selectedHospital} onClose={handleCloseModal} />
            )}
        </>
    );
}

// CSS for the Modal
const modalStyles = `
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    max-width: 600px;
    width: 100%;
}

.close-button {
    background: red;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    float: right;
}
`;

// Append CSS to the document
const styleElement = document.createElement('style');
styleElement.innerHTML = modalStyles;
document.head.appendChild(styleElement);

export default HospitalList;
