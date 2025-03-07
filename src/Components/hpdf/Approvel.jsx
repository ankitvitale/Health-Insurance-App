import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../config';
import Signature from '../../Assets/card/digital.png'
import './pdf1.css';

const Approvel = () => {
  const [data, setData] = useState({});
  const { id } = useParams();
  const token = localStorage.getItem('jwtToken');

  useEffect(() => {
    async function getData() {
      try {
        let url = `${BASE_URL}/cleamRequest/${id}`;
        let response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
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
  }, [id, token]);

  const DOA = new Date(data.dateOfAdmission).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const handlePrint = () => {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(18);
    doc.text('JIVIT HEALTHCARE & MEDICAL SERVICES PVT LTD.', 105, 15, { align: 'center' });
    doc.setFontSize(12);
    doc.text(`DATE: ${DOA}`, 200, 30, { align: 'right' });
    doc.text(`Authorization Letter: ${data.patientName}`, 10, 30);
    doc.text(`Hospital Name: ${data.hospital?.hospitalName}`, 10, 40);
    doc.text(`Employee/Beneficiary Card Number: ${data.healthCardNo}`, 10, 50);
    doc.text(`Authorization No: ${data.authorizationNo || 'N/A'}`, 10, 60);

    const headers = [["Field", "Details"]];
    const dataValues = [
      ["Name of Patient", data.patientName],
      ["Department Name", data.departmentName],
      ["Duration of Ailment", data.durationOfAilment],
      ["Date of Admission", DOA],
      ["Provisional Diagnosis", data.provisionalDiagnosis],
      ["Authorized Hospitalization (In Days)", data.expectedLengthOfStay],
      ["Room Type", data.classOfAccommodation],
      ["GR Ailment", data.grAilment],
      ["GR Ailment Code", data.grAilmentCode],
    ];

    doc.autoTable({
      head: headers,
      body: dataValues,
      startY: 70,
      theme: 'grid',
      headStyles: { fillColor: [22, 160, 133] },
      styles: { cellPadding: 3, fontSize: 10 },
    });

    let remark = `Case is covered for ${data.planOfTreatmentSurgical} management bill will be settled as per agreed MOU rate`;
    doc.text('Remark:', 10, doc.autoTable.previous.finalY + 10);
    doc.text(remark, 30, 180);

    doc.addImage(Signature, 'PNG', 10, doc.autoTable.previous.finalY + 30, 40, 20);
    doc.text('Approved by: Authorization Team ', 10, doc.autoTable.previous.finalY + 60);
    doc.text('(Jivit Health Care & Medical Services Pvt. Ltd)', 10, doc.autoTable.previous.finalY + 70);
 ;

    doc.save(`${data.patientName}.pdf`);
  };

  return (
    <div className="container1">
      <div className="header4">
        <h1>JIVIT HEALTHCARE & MEDICAL SERVICES PVT LTD.</h1>
        <p>CORPORATE OFFICE:- Plot No.61, Kanchan Nagar Jalgaon</p>
        <h2>PRE-AUTHORIZATION APPROVAL LETTER</h2>
      </div>

      <div className="content">
        <p><strong>CONTACT US:</strong> +91-0257-2355100, +91-9322006810, +91-9665450999</p>
        <p><strong>Authorization Letter:</strong> {data.patientName}</p>
        <p><strong>Hospital Name:</strong> {data.hospital?.hospitalName || 'N/A'}</p>
        <p><strong>Employee/Beneficiary Card Number:</strong> {data.healthCardNo}</p>
      </div>

      <table className="details-table">
        <tbody>
          <tr><td><strong>Name of Patient:</strong></td><td>{data.patientName}</td></tr>
          <tr><td><strong>Department Name:</strong></td><td>{data.departmentName}</td></tr>
          <tr><td><strong>Duration of Ailment:</strong></td><td>{data.durationOfAilment}</td></tr>
          <tr><td><strong>Date of Admission:</strong></td><td>{DOA}</td></tr>
          <tr><td><strong>Provisional Diagnosis:</strong></td><td>{data.provisionalDiagnosis}</td></tr>
          <tr><td><strong>Authorized Hospitalization (In Days):</strong></td><td>{data.expectedLengthOfStay}</td></tr>
          <tr><td><strong>Room Type:</strong></td><td>{data.classOfAccommodation}</td></tr>
          <tr><td><strong>GR Ailment:</strong></td><td>{data.grAilment}</td></tr>
          <tr><td><strong>GR Ailment Code:</strong></td><td>{data.grAilmentCode}</td></tr>
        </tbody>
      </table>

      <p><strong>Remark:</strong> Case is covered for <strong>{data.planOfTreatmentSurgical}</strong> management bill will be settled as per agreed MOU rate</p>

      <div className="footer">
        <p><strong>Approved by:</strong> Authorization Team </p>
        <p>Signature Of Patient/Employee:</p>
        <p>_________________________</p>
        <p>This document is a copyright of JIVIT HEALTHCARE & MEDICAL SERVICES PVT. LTD. and is confidential.</p>
      </div>

      <button onClick={handlePrint} className="download-btn">Download PDF</button>
    </div>
  );
};

export default Approvel;

// Sample data object
// const data = {
//   date: '2024-10-16',
//   patientName: 'John Doe',
//   hospitalName: 'Health Care Hospital',
//   cardNumber: '123456789',
//   authorizationNo: '1',
//   departmentName: 'Cardiology',
//   durationOfAilment: '2 weeks',
//   dateOfAdmission: '2024-10-15',
//   provisionalDiagnosis: 'Chest Pain',
//   authorizedHospitalization: '3 days',
//   authorizationLimit: 'Fifty Thousand Only',
//   roomType: 'Private Room',
//   grAilment: 'Heart Disease',
//   grAilmentCode: 'HD001',
//   remark: 'Case is approved and Bill will be settled as per agreed MOU rate',
//   instructions: [
//     'Follow up with the cardiologist.',
//     'Adhere to prescribed medication.',
//     'Rest and avoid physical exertion.',
//   ],
// };