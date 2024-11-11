import React, { useEffect, useState } from 'react';

function AllHospitalList() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function getData() {
            try { 
                let url = 'http://localhost:8080/AllhospitalsList';
                
                let response = await fetch(url, {
                    method: 'GET', 
                    headers: {
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

    console.log(data);

    function view(id) {
        console.log(id);
    }

    const updateStatus = async (id, status) => {
        try {
            let url = `http://localhost:8080/customer/${id}/status`;
            let response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            let updatedCustomer = await response.json();
            setData(data.map(customer => customer._id === id ? updatedCustomer.data : customer));
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    return (
        <>
            <div className="container">
                <div className="table-container">
                    <table>
                            <tr>
                                <th>Hospital Name</th>
                                <th>Phone Number</th>
                                <th>Doctor Name</th>
                                <th>Speciality</th>
                                <th>Email</th>
                                <th>City</th>
                            </tr>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.hospitalName}</td>
                                    <td>{item.mobileNo}</td>
                                    <td>{item.doctorName}</td>
                                    <td>{item.speciality}</td>
                                    <td>{item.email}</td>
                                    <td>{item.tahsil}</td>
                                    
                                </tr>
                            ))}
                    </table>
                </div>
            </div>
        </>
    );
}

export default AllHospitalList;
