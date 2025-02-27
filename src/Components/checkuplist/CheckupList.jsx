import React, { useEffect, useState } from 'react';

function CheckupList() {
    const [data, setData] = useState([]); 
    const [filteredData, setFilteredData] = useState([]); 
    const [searchTerm, setSearchTerm] = useState(''); 
    const [currentPage, setCurrentPage] = useState(1); 
    const rowsPerPage = 10; 
    const token = localStorage.getItem('jwtToken');

    useEffect(() => {
        async function getData() {
            if (!token || !isTokenValid(token)) {
                console.error("Token is missing, invalid, or malformed.");
                return; 
            }

            try {
               let url = `https://jivithealthcare.in/api/hospitalHeathCheckupList`;
          //   let url = `http://localhost:8080/api/hospitalHeathCheckupList`;
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
                console.log(emp);
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
            item.cardNo.toLowerCase().includes(value.toLowerCase()) ||
            item.employeeName.toLowerCase().includes(value.toLowerCase()) ||
            item.pesentName.toLowerCase().includes(value.toLowerCase()) ||
            item.hospital.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(filtered);
        setCurrentPage(1); // Reset to the first page on search
    };

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <input
                style={{ width: '25%', marginLeft: '20px' }}
                type="text"
                placeholder="Search by CardNo, Full Name, Pesent Name, or Hospital"
                value={searchTerm}
                onChange={handleSearch}
            />
            <div className="container">
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Sr.No</th>
                                <th>CardNo</th>
                                <th>Full Name</th>
                                <th>Pesent Name</th>
                                <th>Hospital</th>
                                <th>Location</th>
                                <th>Department Name</th>
                                <th>Department Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRows.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.cardNo}</td>
                                    <td>{item.employeeName}</td>
                                    <td>{item.pesentName}</td>
                                    <td>{item.hospital}</td>
                                    <td>{item.location}</td>
                                    <td>{item.depermentName}</td>
                                    <td>{item.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={currentPage === index + 1 ? 'active' : ''}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}

export default CheckupList;
