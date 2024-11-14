import React, { useEffect, useState } from 'react';
import './EmpList.css';
import { Link, useNavigate } from 'react-router-dom';

function App() {
    const [data, setData] = useState([]); 
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); 
    const navigate = useNavigate();
    useEffect(() => {
        async function getData() {
            const token = localStorage.getItem('token');
            try {
                let url = `http://82.112.237.134:8080/benificiaries`;

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
    }, []);

    const updateStatus = async (id) => {
        navigate(`editemp/${id}`);
    };

  

    const cardId = (id) => {
        navigate(`card/${id}`);
    };

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        const filtered = data.filter(item =>
            item.cardNo.toLowerCase().includes(value.toLowerCase()) ||
            item.fullName.toLowerCase().includes(value.toLowerCase()) ||
            item.departmentName.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(filtered);
    };

    return (
        <>
            <input style={{ width: '25%', marginLeft: '20px' }}
                type="text"
                placeholder="Search by CardNo, FullName, or Department Name"
                value={searchTerm}
                onChange={handleSearch}
            />


            <div className="container">
                <div className="table-container">
                    <table>
                        <tr>
                            <th>CardNo</th>
                            <th>Full Name</th>
                            <th>Phone Number</th>
                            <th>Date of Joining</th>
                            <th>Date of Retirement</th>
                            <th>Aadhar No</th>
                            <th>Department Name</th>
                            <th>Department Location</th>
                            <th>Action</th>
                            <th>Create card</th>
                        </tr>
                        {filteredData.map((item, index) => (
                            <tr key={index}>
                                <td>{item.cardNo}</td>
                                <td>{item.fullName}</td>
                                <td>{item.phoneNumber}</td>
                                <td>{new Date(item.dateOfJoining).toLocaleDateString()}</td>
                                <td>{new Date(item.dateOfRetirement).toLocaleDateString()}</td>
                                <td>{item.aadharNo}</td>
                                <td>{item.departmentName}</td>
                                <td>{item.departmentLocation}</td>
                                <td>
                                     <button className='td' onClick={() => updateStatus(item.id)}>Edit</button></td>
                                <td>
                                    <button className='td' onClick={() => cardId(item.id)}>Show Card</button>
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        </>
    );
}

export default App;
