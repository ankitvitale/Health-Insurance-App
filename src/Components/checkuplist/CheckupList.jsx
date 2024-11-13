import React, { useEffect, useState } from 'react';
function CheckupList() {
    const [data, setData] = useState([]); 
    const [filteredData, setFilteredData] = useState([]); 
    const [searchTerm, setSearchTerm] = useState(''); 
    const token = localStorage.getItem('jwtToken');

    useEffect(() => {
        async function getData() {
            if (!token || !isTokenValid(token)) {
                console.error("Token is missing, invalid, or malformed.");
                return; 
            }
            
            try {
                let url = `${process.env.REACT_APP_API_KEY}/hospitalHeathCheckupList`;
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
    };

    return (
        <>
            <input style={{width:'25%',marginLeft:'20px'}}
                    type="text"
                    placeholder="Search by CardNo, Full Name, Pesent Name, or Hospital"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            <div className="container">
                
           
             

                <div className="table-container">
                    <table>
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
                            {filteredData.map((item, index) => (
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
                    </table>
                </div>
            </div>
        </>
    );
}

export default CheckupList;
