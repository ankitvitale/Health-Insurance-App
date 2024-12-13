import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import './pdf.css';
import 'jspdf-autotable'; // Optional for better table formatting
import signatureImage from '../../Assets/card/digital.png'; // Path to your signature image
import { useParams } from 'react-router-dom';

const Approvel = () => {
  const [data, setData] = useState({});
  const { id } = useParams();

  const token = localStorage.getItem('jwtToken');

  useEffect(() => {
    async function getData() {
      try {
        let url = `http://82.112.237.134:8080/cleamRequest/${id}`;
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

  console.log(data)
  const DOA = new Date(data.dateOfAdmission).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  console.log(DOA);
  const handlePrint = () => {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', putOnlyUsedFonts: true, floatPrecision: 16 });

    // First Page
    doc.setFont('helvetica', 'normal');

    // Title
    doc.setFillColor('#bfdef4'); // Light blue background
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), 80, 'F'); // Fill the title background
    doc.setFontSize(18);
    doc.text('JIVIT HEALTHCARE & MEDICAL SERVICES PVT LTD.', 105, 15, { align: 'center' });
    doc.setFontSize(10);
    doc.text('CORPORATE OFFICE:- Plot No.61, Kanchan Nagar Jalgaon', 105, 25, { align: 'center' });
    doc.setFontSize(16);
    doc.text('PRE-AUTHORIZATION APPROVAL LETTER', 105, 35, { align: 'center' });
    doc.setFontSize(10);
    doc.text('Contact Us : +91-0257-2355100,+91-9322006810,+91-9665450999', 105, 45, { align: 'center' });
    doc.setFontSize(10);
    doc.text('E-MAIL:-info@jivithealthcare.in', 105, 50, { align: 'center' });
    doc.setFontSize(10);
    doc.text('Website :  www.jivithealthcare.in ', 105, 55, { align: 'center' });

    // Date
    doc.text(`DATE: ${DOA}`, 200, 90, { align: 'right', fontSize: '18px' });

    // Patient Information
    doc.setFontSize(12);
    doc.text(`Authorization Letter: ${data.patientName}`, 10, 90);
    doc.text(`Hospital Name: ${data.hospital?.hospitalName}`, 10, 100);
    doc.text(`Employee/Beneficiary Card Number: ${data.healthCardNo}`, 10, 110);
    doc.text(`Authorization No: ${data.authorizationNo  || 'N/A'}`, 10, 120);

    // Add a line break
    doc.text('', 10, 130);


    // Table Headers
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
      startY: 140,
      theme: 'grid',
      headStyles: { fillColor: [22, 160, 133] },
      styles: { cellPadding: 3, fontSize: 10 },
    });

    // Remarks and Instructions
    let remark = `Case is coverd for ${data.planOfTreatmentSurgical} management bill will be settled as per agreed MOU rate `
    doc.text('Remark:', 10, doc.autoTable.previous.finalY + 10);
    doc.text(remark, 10, 260)

    // doc.text(data.remark, 10, doc.autoTable.previous.finalY + 15);


    // Footer
    doc.text('This document is a copyright of JIVIT HEALTHCARE & MEDICAL SERVICES PVT. LTD. 2022 and contains', 10, doc.autoTable.previous.finalY + 95);
    doc.text('Information that is not to be shared, copied, disclosed or otherwise without the written consent', 10, doc.autoTable.previous.finalY + 100);
    doc.text('of JIVIT HEALTHCARE & MEDICAL SERVICES PVT. LTD.', 10, doc.autoTable.previous.finalY + 105);
    doc.text('This is a system generated letter.', 10, doc.autoTable.previous.finalY + 115);
    doc.text('Email id: authorization@jivithealthcare.com / info@jivithealthcare.com', 10, doc.autoTable.previous.finalY + 120);
    doc.text('WEBSITE: www.jivithealthcare.com', 10, doc.autoTable.previous.finalY + 125);
    doc.text('Contact: +91-0257-2355100, +91-9322006810, +91-9665450999', 10, doc.autoTable.previous.finalY + 130);
    doc.text('PRIVATE & CONFIDENTIAL', 10, doc.autoTable.previous.finalY + 135);

    // Add a new page for instructions
    doc.addPage();

    // Instructions Header
    doc.setFontSize(16);
    doc.text('Instructions:', 10, 10);
    doc.setFontSize(12);



    const ins = `The Company will not be held liable for payment in the event of any discrepancy in information                                             
 provided by the hospital at the time of admission & network settlement
 (in final document submission) If any details provided are insufficient / incorrect, there may be a
 delay / denial of pre-authorization (cashless) request Denial of cashless does not mean denial of
 treatment 

 Any change in the Diagnosis / Treatment plan should be intimated to the company before
 discharge of the patient
 Any request for authorization / enhancement made by the hospital after discharge of the patient 
 will not be considered
 All queries raised by the Company should be replied within 24 hours
 If Hospital bill is estimated to be higher than guarantee of payment, a request letter for additional 
 amount  need to be sent to JIVIT HEALTHCARE & MEDICAL SERVICES PVT.LTD.

 The CD / DCD of procedures have to be submitted with the claims file.
 For billing prospective send following document as soon as possible.
 Hospitals bill summary with final bill showing details of unit of each services (Authenticated by 
 the  patient signature) Discharge summary & reports of all investigations (original). Prescription of 
 Medicines Claim form signed by the patient Claim document should be submitted within 5 days 
 from the date of discharge.
 Non Admissible as per the rule are strictly to be paid by Employee/Beneficiaries
 Document required to member verification at the time of discharge. JIVIT HEALTHCARE & MEDICAL
  SERVICES PVT.LTD.
 JIVIT HEALTHCARE CARD/ Government id card/ Payment Slip Salary Account Cheque (Account Pay)
`

    const note = `Note:
  Convalescence, General Debility, Run Down Condition, Cognitional external disease,sterility STD,
  International self injury, Use of Alcohol/Drugs.
  Any condition directly or indirectly causes to or associated with syndrome and condition 
  commonly to as AIDS. Undertaking by the patients
  
  I authorized the hospital/provider to submit the attested indoor case papers (case sheet) related 
  to  my treatment to department is asked for.
  `;

    const ft = ` This document is a copyright of JIVIT HEALTHCARE & MEDICAL SERVICES PVT.LTD.2022 and
 containsInformation that is not to be shared, copied, disclosed or otherwise without the written consent 
 of JIVIT HEALTHCARE & MEDICAL SERVICES PVT.LTD.
 This is a system generated letter.

 Email id:authorization@jivithealthcare.com / info@jivithealthcare.com 
 WEBSITE :- www.jivithealthcare.com
 Contact: +91-0257-2355100, +91-9322006810, +91-9665450999 

 PRIVATE & CONFIDENTIAL`

    doc.text(ins, 10, 15)

    // Approved by and Signature
    doc.text('Approved by:', 10, doc.autoTable.previous.finalY + -60);
    const imgWidth = 40;
    const imgHeight = 20;
    doc.addImage(signatureImage, 'PNG', 10, doc.autoTable.previous.finalY + -55, imgWidth, imgHeight, undefined, 'FAST');
    doc.text('Mr. Mayur Sapkale', 10, doc.autoTable.previous.finalY + -55);

    doc.text('Signature Of Patient/Employee:', 180, doc.autoTable.previous.finalY + -55, { align: 'right' });
    doc.text('_________________________', 180, doc.autoTable.previous.finalY + -50, { align: 'right' });

    doc.text(note, 10, 140)
    doc.text(ft, 10, 250)

    // Save the PDF
    doc.save(`${data.patientName}.pdf`);
  };


  return (
    <div className="container1 mx-auto max-w-[210mm] bg-white border border-gray-300 p-4" style={{ height: '297mm', padding: '20mm' }}>
      <div className="header text-center title-bg">
        <h1 className="text-2xl font-bold text-blue-600">JIVIT HEALTHCARE & MEDICAL SERVICES PVT LTD.</h1>
        <p className="text-sm">CORPORATE OFFICE:- Plot No.61, Kanchan Nagar Jalgaon</p>
        <h2 className="text-xl font-semibold mt-4">PRE-AUTHORIZATION APPROVAL LETTER</h2>
      </div>

      <div className="main-contentt mt-4">
        <div className="flex justify-between">
          <p> <strong>CONTACT US:</strong> +91-0257-2355100, +91-9322006810, +91-9665450999</p>
        </div>
        <div className="mt-4">
          <p><strong>Authorization Letter:</strong> {data.patientName}</p>
          <p><strong>Hospital Name:</strong> {data.hospital?.hospitalName || 'N/A'}</p>

          <p><strong>Employee/Beneficiary Card Number:</strong> {data.healthCardNo}</p>
          {/* <p><strong>Authorization No:</strong> {data.authorizationNo}</p> */}
        </div>
        <table className="w-full border-collapse border border-gray-300 mt-4">
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2"><strong>Name of Patient:</strong></td>
              <td className="border border-gray-300 p-2">{data.patientName}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2"><strong>Department Name:</strong></td>
              <td className="border border-gray-300 p-2">{data.departmentName}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2"><strong>Duration of Ailment:</strong></td>
              <td className="border border-gray-300 p-2">{data.durationOfAilment}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2"><strong>Date of Admission:</strong></td>
              <td className="border border-gray-300 p-2">{DOA}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2"><strong>Provisional Diagnosis:</strong></td>
              <td className="border border-gray-300 p-2">{data.provisionalDiagnosis}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2"><strong>Authorized Hospitalization (In Days):</strong></td>
              <td className="border border-gray-300 p-2">{data.expectedLengthOfStay}</td>
            </tr>

            <tr>
              <td className="border border-gray-300 p-2"><strong>Room Type:</strong></td>
              <td className="border border-gray-300 p-2">{data.classOfAccommodation}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2"><strong>GR Ailment:</strong></td>
              <td className="border border-gray-300 p-2">{data.grAilment}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2"><strong>GR Ailment Code:</strong></td>
              <td className="border border-gray-300 p-2">{data.grAilmentCode}</td>
            </tr>
          </tbody>
        </table>
        <span>Remark: Case is coverd for <strong>{data.planOfTreatmentSurgical} </strong> management bill will be settled as per agreed MOU rate</span>
      </div>
      <div className="footer mt-4">
        <p><strong>Approved by:</strong> Mr. Mayur Sapkale</p>
        <p>Signature Of Patient/Employee:</p>
        <p>_________________________</p>
        <p>This document is a copyright of JIVIT HEALTHCARE & MEDICAL SERVICES PVT. LTD. 2022 and contains</p>
        <p>Information that is not to be shared, copied, disclosed or otherwise without the written consent</p>
        <p>of JIVIT HEALTHCARE & MEDICAL SERVICES PVT. LTD.</p>
        <p>This is a system generated letter.</p>
        <p>Email id: authorization@jivithealthcare.com / info@jivithealthcare.com</p>
        <p>WEBSITE: www.jivithealthcare.com</p>
        <p>PRIVATE & CONFIDENTIAL</p>
      </div>
      <button onClick={handlePrint} className="mt-4 bg-blue-500 text-white p-2 rounded">Download PDF</button>
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