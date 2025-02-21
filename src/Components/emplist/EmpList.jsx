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
    const token = localStorage.getItem('token');
    useEffect(() => {
        async function getData() {

            try {
                let url = `http://localhost:8080/api/benificiaries`;
                // let url = `http://localhost:8080/benificiaries`;

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

                // Sort by id in descending order to display the newest entry first
                emp.sort((a, b) => b.id - a.id); // Replace `id` with your unique identifier

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

    const deleteData = async (id) => {
        try {
            // const url = `http://localhost:8080/deleteBeneficiary/${id}`;
            const url = `https://jivithealthcare.in/api/deleteBeneficiary/${id}`;

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
            navigate('/admin/emplist');
        } catch (error) {
            console.error('Error deleting beneficiary:', error);
        }
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
                                <th  className='th'>CardNo</th>
                                <th className='th'>Full Name</th>
                                <th className='th'>Phone Number</th>
                                <th className='th'>Date of Joining</th>
                                <th className='th'>Date of Retirement</th>
                                <th className='th'>Aadhar No</th>
                                <th className='th'>Department Name</th>
                                <th className='th'>Department Location</th>
                                <th className='th'>Action</th>
                                <th className='th'>Create card</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item, index) => (
                                <tr key={index}>
                                    <td className='td'>{item.cardNo}</td>
                                    <td className='td'>{item.fullName}</td>
                                    <td className='td'>{item.phoneNumber}</td>
                                    <td className='td'>{new Date(item.dateOfJoining).toLocaleDateString()}</td>
                                    <td className='td'>{new Date(item.dateOfRetirement).toLocaleDateString()}</td>
                                    <td className='td'>{item.aadharNo}</td>
                                    <td className='td'>{item.departmentName}</td>
                                    <td className='td'>{item.departmentLocation}</td>
                                    <td className='td'>
                                        <button style={{padding:"5px",backgroundColor:"green",color:"white",border:"none"}} onClick={() => updateStatus(item.id)}>Edit</button>
                                        <button style={{padding:"5px",backgroundColor:"red",color:"white",border:"none"}} onClick={() => deleteData(item.id)}>Delete</button>
                                    </td>
                                    <td className='td'>
                                        <button style={{padding:"5px",backgroundColor:"#0073CF",color:"white",border:"none"}} onClick={() => cardId(item.id)}>Show Card</button>
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
