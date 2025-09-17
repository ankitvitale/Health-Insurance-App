import React, { useEffect, useState } from 'react';
function PaymentList() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function getData() {
            const token = localStorage.getItem('token');
            try { 
                let url = `https://jivithealthcare.in/api/getAllHospitalPayments`;
                
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
            let url = `https://jivithealthcare.in/api/customer/${id}/status`;
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
                        <th>Emp Name</th>
                        <th>Patient Name</th>
                        <th>Bank Name</th>
                        <th>PayMentMode</th>                     
                        <th>Amount</th>
                        
                    </tr>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.hospitalName}</td>
                            <td>{item.employeeName}</td>
                            <td>{item.patientName}</td>
                            <td>{item.bankName}</td>
                            <td>{item.paymentMode}</td>
                            
                            <td>{item.amount}</td>
                           
                        </tr>
                    ))}
            </table>
        </div>
    </div>
    </>
);
}


export default PaymentList;
