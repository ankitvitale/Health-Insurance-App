import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../config';
function PaymentList() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function getData() {
            const token = localStorage.getItem('token');
            try { 
                let url = `${BASE_URL}/getAllHospitalPayments`;
                
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
console.log(data)
    function view(id){
        console.log(id)
    }

    const updateStatus = async (id, status) => {
        try {
            let url = `${BASE_URL}/customer/${id}/status`;
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
                        <th className='th'>Hospital Name</th>                  
                        <th className='th'>Emp Name</th>
                        <th className='th'>Patient Name</th>
                        <th className='th'>Bank Name</th>
                        <th className='th'>PayMentMode</th>                     
                        <th className='th'>Amount</th>
                        
                    </tr>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td className='td'>{item.hospitalName}</td>
                            <td className='td'>{item.employeeName}</td>
                            <td className='td'>{item.patientName}</td>
                            <td className='td'>{item.bankName}</td>
                            <td className='td'>{item.paymentMode}</td>
                            
                            <td className='td'>{item.amount}</td>
                           
                        </tr>
                    ))}
            </table>
        </div>
    </div>
    </>
);
}


export default PaymentList;
