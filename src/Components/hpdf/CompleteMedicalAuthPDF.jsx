import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../config';
import logo from '../../Assets/jivit-logo.svg';
import './pdf.css';

const CompleteMedicalAuthPDF = () => {
  const [data1, setData1] = useState([]);
  const { id } = useParams();
  const token = localStorage.getItem('jwtToken');

  useEffect(() => {
    async function getData() {
      try {
        let response = await fetch(`${BASE_URL}/cleamRequest/${id}`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        let emp = await response.json();
        setData1([emp]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    getData();
  }, [id, token]);

  const calculateTotalExpense = (entry) => {
    const { doctorFeeSurgeonAss, expectedCostInvestigation, medicinesConsumablesCost, surgeonAnesthetistVisitCharges, expectedLengthOfStay, perDayRoomRent } = entry;
    return (
      (parseFloat(doctorFeeSurgeonAss) || 0) +
      (parseFloat(expectedCostInvestigation) || 0) +
      (parseFloat(medicinesConsumablesCost) || 0) +
      (parseFloat(surgeonAnesthetistVisitCharges) || 0) +
      (parseFloat(expectedLengthOfStay) || 0) * (parseFloat(perDayRoomRent) || 0)
    ).toFixed(2);
  };

  const handlePrint = () => {
    const input = document.getElementById('table-to-print');
    html2canvas(input, { useCORS: true }).then((canvas) => {
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 10, 10, 190, (canvas.height * 190) / canvas.width);
      pdf.save('HealthcareTable.pdf');
    });
  };

  return (
    <div className="container2">
      <div id="table-to-print" className="pdf-container">
        <table className="pdf-table">
          <thead>
            <tr>
              <th colSpan="4" className="header">
                <img src={logo} alt="Jivit Healthcare Logo" className="logo" />
                <h2>JIVIT HEALTHCARE & MEDICAL SERVICES PVT. LTD</h2>
                <p>CORPORATE OFFICE: PLOT NO.61, KANCHAN NAGAR JALGAON</p>
                <p>PRE-AUTHORIZATION REQUEST FORM</p>
                <p>CONTACT US: +91-0257-2355100, +91-9322006810, +91-9665450999</p>
                <p>E-MAIL: info@jivithealthcare.com | WEB: www.jivithealthcare.com</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {data1.map((entry, index) => (
              <React.Fragment key={index}>
                <tr><td><strong>Employee Name:</strong> {entry.employeeName}</td><td><strong>Patient Name:</strong> {entry.patientName}</td></tr>
                <tr><td><strong>Health Card No:</strong> {entry.healthCardNo}</td><td><strong>Department Name:</strong> {entry.departmentName}</td></tr>
                <tr><td><strong>Mobile No:</strong> {entry.mobileNo}</td><td><strong>Relation with Employee:</strong> {entry.relationWithEmployee}</td></tr>
                <tr><td><strong>Address:</strong> {entry.address}</td><td><strong>Aadhar Card:</strong> {entry.aadharCard ? 'Yes' : 'No'}</td></tr>
                <tr><td><strong>Date Of Admission:</strong> {new Date(entry.dateOfAdmission).toLocaleDateString('en-GB')}</td><td><strong>Chief Complaints:</strong> {entry.chiefComplaints}</td></tr>
                <tr><td><strong>Provisional Diagnosis:</strong> {entry.provisionalDiagnosis}</td><td><strong>Plan of Treatment (Medical):</strong> {entry.planOfTreatmentMedical}</td></tr>
                <tr><td><strong>Plan of Treatment (Surgical):</strong> {entry.planOfTreatmentSurgical}</td><td><strong>General Ailment:</strong> {entry.grAilment}</td></tr>
                <tr><td><strong>General Ailment Code:</strong> {entry.grAilmentCode}</td><td><strong>Status:</strong> {entry.status}</td></tr>
                <tr><td><strong>Expected Length of Stay:</strong> {entry.expectedLengthOfStay}</td><td><strong>Class of Accommodation:</strong> {entry.classOfAccommodation}</td></tr>
                <tr><td><strong>Per Day Room Rent:</strong> {entry.perDayRoomRent}</td><td><strong>Expected Cost Investigation:</strong> {entry.expectedCostInvestigation}</td></tr>
                <tr><td><strong>Medicines & Consumables Cost:</strong> {entry.medicinesConsumablesCost}</td><td><strong>Doctor Fee (Surgeon Assist):</strong> {entry.doctorFeeSurgeonAss}</td></tr>
                <tr><td><strong>Surgeon Anesthetist Visit Charges:</strong> {entry.surgeonAnesthetistVisitCharges}</td><td><strong>Other Charges:</strong> {entry.otherCharges}</td></tr>
                <tr><td colSpan="2"><strong>Total Expense Hospitalization:</strong> {calculateTotalExpense(entry)}</td></tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div className="btn-container">
        <button onClick={handlePrint} className="print-btn">Print PDF</button>
      </div>
    </div>
  );
};

export default CompleteMedicalAuthPDF;
