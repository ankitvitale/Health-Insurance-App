

import React, { useEffect, useState } from 'react';

const AppointmentTable = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            const token = localStorage.getItem('token'); 

            try {
                const response = await fetch(`http://82.112.237.134:8080/Allappointment`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`, 
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setAppointments(data); 
                } else {
                    console.error('Error fetching appointments:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        fetchAppointments();
    }, []); 

console.log(process.env.REACT_APP_API_KEY)
    const token = localStorage.getItem('token');

    const updateStatus = async (id, status) => {
        try {
            setAppointments((prevAppointments) =>
                prevAppointments.map((appointment) =>
                    appointment.id === id ? { ...appointment, status } : appointment
                )
            );

            let url = `http://82.112.237.134:8080/AppoinmentStatusAuthorized/${id}`;
            let response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ status }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            alert('Successfully Authorized');
        } catch (error) {
            console.error('Error updating status:', error);
            setAppointments((prevAppointments) =>
                prevAppointments.map((appointment) =>
                    appointment.id === id ? { ...appointment, status: 'Pending' } : appointment
                )
            );
        }
    };

    const updateStatusReject = async (id, status) => {
        try {
            setAppointments((prevAppointments) =>
                prevAppointments.map((appointment) =>
                    appointment.id === id ? { ...appointment, status } : appointment
                )
            );

            let url = `http://82.112.237.134:8080/AppoinmentStatusReject/${id}`;
            let response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ status }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            alert('Successfully Rejected');
        } catch (error) {
            console.error('Error updating status:', error);
            setAppointments((prevAppointments) =>
                prevAppointments.map((appointment) =>
                    appointment.id === id ? { ...appointment, status: 'Pending' } : appointment
                )
            );
        }
    };

    return (
        <div>
            <h2>Appointment List</h2>
            <table border="1" style={{ width: '100%', textAlign: 'left' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Message</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.length > 0 ? (
                        appointments.map((appointment) => (
                            <tr key={appointment.id}>
                                <td>{appointment.id}</td>
                                <td>{appointment.name}</td>
                                <td>{appointment.email}</td>
                                <td>{appointment.phone}</td>
                                <td>{appointment.message}</td>
                                <td>{appointment.status}</td>
                                <td>
                                    <button
                                        style={{
                                            margin: '1px',
                                            backgroundColor: 'green',
                                            color: 'white',
                                            padding: '2px',
                                        }}
                                        onClick={() => updateStatus(appointment.id, 'Authorized')}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        style={{
                                            margin: '1px',
                                            backgroundColor: 'red',
                                            color: 'white',
                                            padding: '2px',
                                        }}
                                        onClick={() => updateStatusReject(appointment.id, 'Rejected')}
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No appointments found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AppointmentTable;

