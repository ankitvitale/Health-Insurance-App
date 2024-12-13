import React, { useEffect, useState, useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

function AllHospitalList() {
    const [data, setData] = useState([]);
    const tableRef = useRef(); // Reference to the table for generating PDF

    useEffect(() => {
        async function getData() {
            try {
                let url = `https://jivithealthcare.in/api/AllhospitalsList`;

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

    // Function to generate and download PDF
    const downloadPDF = async () => {
        const element = tableRef.current;
        const canvas = await html2canvas(element, { scale: 2 }); // Render the table as a canvas
        const imgData = canvas.toDataURL('image/png'); // Convert canvas to image
        const pdf = new jsPDF('p', 'mm', 'a4'); // Create a new PDF instance
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight); // Add the image to the PDF
        pdf.save('hospital_list.pdf'); // Save the PDF
    };

    return (
        <>
         <button onClick={downloadPDF} style={{ marginRight: '10px', float:'right' ,backgroundColor: '#007bff',
    color: '#fff' ,border:'none',padding:'5px'}}>
                    Download PDF
                </button>
            <div className="container">
                {/* Button to trigger PDF download */}
               

                {/* Table to display hospital data */}
                <div className="table-container" ref={tableRef}>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>Hospital Name</th>
                                <th>Phone Number</th>
                                <th>Doctor Name</th>
                                <th>Speciality</th>
                                <th>Email</th>
                                <th>City</th>
                            </tr>
                        </thead>
                        <tbody>
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
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default AllHospitalList;
