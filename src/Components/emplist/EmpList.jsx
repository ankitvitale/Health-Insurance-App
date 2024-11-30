import React, { useEffect, useState } from 'react';
import './EmpList.css';
import { Link, useNavigate } from 'react-router-dom';

function App() {
    const [data, setData] = useState([]); 
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); 
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; 

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
        setCurrentPage(1); // Reset to the first page after a search
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                        <thead>
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
                        </thead>
                        <tbody>
                            {currentItems.map((item, index) => (
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
                                         <button className='td' onClick={() => updateStatus(item.id)}>Edit</button>
                                    </td>
                                    <td>
                                        <button className='td' onClick={() => cardId(item.id)}>Show Card</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="pagination">
                        {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => paginate(index + 1)}
                                className={currentPage === index + 1 ? 'active' : ''}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
