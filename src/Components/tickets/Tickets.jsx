import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../config';

function Tickets() {
    const [data, setData] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        async function getData() {
            try { 
                let url = `${BASE_URL}/RaiseTicketInfo`;
                
                let response = await fetch(url, {
                    method: 'GET', 
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, 
                    },
                });
        
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                let emp = await response.json();
                setData(emp);
              
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        
        getData();
    }, []);

  

    function view(id) {
        console.log(id);
    }

    return (
        <>
            <div className="container">
                <div className="table-container">
                    <table>
                            <tr>
                                <th>Hospital Name</th>
                                <th>Message</th>
                            </tr>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.hospitalName}</td>
                                    <td><textarea name="" id="">{item.message}</textarea></td>
                                </tr>
                            ))}
                    </table>
                </div>
            </div>
        </>
    );
}

export default Tickets;
