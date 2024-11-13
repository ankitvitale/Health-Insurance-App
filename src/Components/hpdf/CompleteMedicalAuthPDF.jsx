


// import React, { useEffect, useState } from 'react';
// import './pdf.css'
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import logo from '../../Assets/jivit-logo.svg'
// import { useParams } from 'react-router-dom';
// const CompleteMedicalAuthPDF = () => {
//   const [data1 ,setData1]=useState([])
//   const {id} = useParams()

//     const token = localStorage.getItem('jwtToken');
  
//     useEffect(() => {
//       async function getData() { 
//           try {
//               let response = await fetch(url, {
//                   method: 'GET',
//                   headers: {
//                       'Authorization': `Bearer ${token}`,
//                       'Content-Type': 'application/json',
//                   },
//               });
  
//               if (!response.ok) {
//                   throw new Error(`HTTP error! status: ${response.status}`);
//               }
              
//               let emp = await response.json();
//               setData1([emp]);
//           } catch (error) {
//               console.error('Error fetching data:', error);
//           }
//       }
      
//       getData();
//   }, []);
// console.log(data1)
// console.log(id)
//     const handlePrint = () => {
//       const input = document.getElementById('table-to-print');
//       html2canvas(input, { useCORS: true }).then((canvas) => {
//         const imgData = canvas.toDataURL('image/png');
//         const pdf = new jsPDF();
//         const imgWidth = 190; 
//         const pageHeight = pdf.internal.pageSize.height;
//         const imgHeight = (canvas.height * imgWidth) / canvas.width;
//         let heightLeft = imgHeight;
  
//         let position = 0;
  
//         pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
//         heightLeft -= pageHeight;
  
//         while (heightLeft >= 0) {
//           position = heightLeft - imgHeight;
//           pdf.addPage();
//           pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
//           heightLeft -= pageHeight;
//         }
//         pdf.save('HealthcareTable.pdf');
//       });
//     };
  
//     return (
//       <div className="p-4">
     
//         <div id="table-to-print">
//           <table className="w-full border-collapse border border-gray-300">
//             <thead>
//               <tr>
//                 <th colSpan="4" className="border border-gray-300 p-2 text-center bg-white apdf">
//                   <img
//                     src={logo}
//                     alt="Jivit Healthcare Logo"
//                     className="w-20 h-20 mx-auto mb-2"
//                   />
//                   <h2 className="text-xl font-bold">
//                     JIVIT HEALTHCARE & MEDICAL SERVICES PVT. LTD
//                   </h2>
//                   <p>CORPORATE OFFICE: PLOT NO.61, KANCHAN NAGAR JALGAON</p>
//                   <p>PRE-AUTHORIZATION REQUEST FORM</p>
//                   <p>CONTACT US: +91-0257-2355100, +91-9322006810, +91-9665450999</p>
//                   <p>E-MAIL: info@jivithealthcare.com | WEB: www.jivithealthcare.com</p>
//                 </th>
//               </tr>
//             </thead>
//             <tbody className='pbody'>
//             {data1.map((entry, index) => (
//           <React.Fragment key={index}>
//             <tr>
//               <td className="border border-gray-300 p-2 text-left">
//                 <strong>Employee Name: </strong>{entry.employeeName}
//               </td>
//               <td className="border border-gray-300 p-2 text-left">
//                 <strong>Patient Name: </strong>{entry.patientName}
//               </td>
//             </tr>
//             <tr>
//               <td className="border border-gray-300 p-2 text-left">
//                 <strong>Health Card No: </strong>{entry.healthCardNo}
//               </td>
//               <td className="border border-gray-300 p-2 text-left">
//                 <strong>Department Name: </strong>{entry.departmentName}
//               </td>
//             </tr>
//             <tr>
//               <td className="border border-gray-300 p-2 text-left">
//                 <strong>Mobile No: </strong>{entry.mobileNo}
//               </td>
//               <td className="border border-gray-300 p-2 text-left">
//                 <strong>Relation with Employee: </strong>{entry.relationWithEmployee}
//               </td>
//             </tr>
//             <tr>
//               <td className="border border-gray-300 p-2 text-left">
//                 <strong>Address: </strong>{entry.address}
//               </td>
//               <td className="border border-gray-300 p-2 text-left">
//                 <strong>Adhar Card: </strong> {entry.aadharCard ? 'Yess' : 'No'}
//               </td>
//             </tr>
//             <h4 className='ppdf'>  PART- II ( To be filled in by Doctor/Hospital )    </h4>
//             <tr>
//             <td className="border border-gray-300 p-2 text-left">
//                 <strong>Date Of Admition: </strong>{entry.dateOfAdmission}
//               </td>
//             <td className="border border-gray-300 p-2 text-left">
//                 <strong>Chief Complaints: </strong>{entry.chiefComplaints}
//               </td>
//             </tr>
//             <tr>
//               <td className="border border-gray-300 p-2 text-left">
//                 <strong>Provisional Diagnosis: </strong>{entry.provisionalDiagnosis}
//               </td>
//               <td className="border border-gray-300 p-2 text-left">
//                 <strong>Plan of Treatment (Medical): </strong>{entry.planOfTreatmentMedical}
//               </td>
//             </tr>
//             <tr>
//               <td className="border border-gray-300 p-2 text-left">
//                 <strong>Plan of Treatment (Surgical): </strong>{entry.planOfTreatmentSurgical}
//               </td>
//               <td className="border border-gray-300 p-2 text-left">
//                 <strong>General Ailment: </strong>{entry.grAilment}
//               </td>
//             </tr>
//             <tr>
//               <td className="border border-gray-300 p-2 text-left">
//                 <strong>General Ailment Code: </strong>{entry.grAilmentCode}
//               </td>
//               <td className="border border-gray-300 p-2 text-left">
//                 <strong>Status: </strong>{entry.status}
//               </td>
//             </tr>
//             <tr>
//               <td className="border border-gray-300 p-2 text-left">
//                 <strong>Expected Length of Stay: </strong>{entry.expectedLengthOfStay}
//               </td>
//               <td className="border border-gray-300 p-2 text-left">
//                 <strong>Class of Accommodation: </strong>{entry.classOfAccommodation}
//               </td>
//             </tr>
//             <tr>
//               <td className="border border-gray-300 p-2 text-left">
//                 <strong>Per Day Room Rent: </strong>{entry.perDayRoomRent}
//               </td>
//               <td className="border border-gray-300 p-2 text-left">
//                 <strong>Expected Cost Investigation: </strong>{entry.expectedCostInvestigation}
//               </td>
//             </tr>
//             <tr>
//               <td className="border border-gray-300 p-2 text-left">
//                 <strong>Medicines & Consumables Cost: </strong>{entry.medicinesConsumablesCost}
//               </td>
//               <td className="border border-gray-300 p-2 text-left">
//                 <strong>Doctor Fee (Surgeon Assist): </strong>{entry.doctorFeeSurgeonAss}
//               </td>
//             </tr> 
//             <tr>
//               <td className="border border-gray-300 p-2 text-left">
//                 <strong>Surgeon Anesthetist Visit Charges: </strong>{entry.surgeonAnesthetistVisitCharges}
//               </td>
//               <td className="border border-gray-300 p-2 text-left">
//                 <strong>Total Expense Hospitalization: </strong>{entry.totalExpenseHospitalization}
//               </td>
//             </tr>
//             <tr>
//               <td className="border border-gray-300 p-2 text-left">
//                 <strong>Name of Doctor: </strong>{entry.nameOfDoctor}
//               </td>
//               <td className="border border-gray-300 p-2 text-left">
//                 <strong>Doctor Registration Number: </strong>{entry.doctorRegistrationNumber}
//               </td>
//             </tr>
//             <tr>
//               <td className="border border-gray-300 p-2 text-left">
//                 <strong>Alcohol Abuse: </strong>{entry.alcoholAbuse ? 'Yes' : 'No'}
//               </td>
//               <td className="border border-gray-300 p-2 text-left">
//                 <strong>MLC FIR Copy: </strong>{entry.mlcFirCopy ? 'Yes' : 'No'}
//               </td>
//             </tr>
          
//             <h4 className='ppdf'>  Upload Documents (Yes / No)</h4>
//             <tr>
//     <td className="border border-gray-300 p-2 text-left">
//                 <strong>Jivat Health Card: </strong>
//                 {entry.jivatHealthCard ? "Yes" :'No'}
//               </td>
//             </tr>
//             <tr>
//               <td className="border border-gray-300 p-2 text-left">
//                 <strong>Salary AC Cheque: </strong>
//                 {entry.salaryACCheque ? "Yes" : "No"}
//               </td>
//               <td className="border border-gray-300 p-2 text-left">
//                 <strong>Promissory Note: </strong>
//             {entry.promissoryNote ? "Yes" : "No"}
//               </td>
//             </tr>
           
//           </React.Fragment>
//         ))}

//             </tbody>
//           </table>
//         </div>
//         <button 
//           onClick={handlePrint}
//           className="mb-4 px-4 py-2  bg-blue-500  text-white rounded td"
//         >
//           Download PDF
//         </button>
//       </div>
//     );
//   };
// export default CompleteMedicalAuthPDF;


import React, { useEffect, useState } from 'react';
import './pdf.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import logo from '../../Assets/jivit-logo.svg';
import { useParams } from 'react-router-dom';

const CompleteMedicalAuthPDF = () => {
  const [data1, setData1] = useState([]);
  const { id } = useParams();

  const token = localStorage.getItem('jwtToken');

  useEffect(() => {
    async function getData() {
      try {
        let url = `${process.env.REACT_APP_API_KEY}/cleamRequest/${id}`;
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
        setData1([emp]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    getData();
  }, [id, token]);

  const calculateTotalExpense = (entry) => {
    const { doctorFeeSurgeonAss, expectedCostInvestigation, medicinesConsumablesCost, surgeonAnesthetistVisitCharges, expectedLengthOfStay, perDayRoomRent } = entry;

    // Convert values to numbers and provide default values (0) if undefined
    const doctorFee = parseFloat(doctorFeeSurgeonAss) || 0;
    const expectedCost = parseFloat(expectedCostInvestigation) || 0;
    const medicinesCost = parseFloat(medicinesConsumablesCost) || 0;
    const surgeonVisitCharges = parseFloat(surgeonAnesthetistVisitCharges) || 0;
    const lengthOfStay = parseFloat(expectedLengthOfStay) || 0;
    const roomRent = parseFloat(perDayRoomRent) || 0;

    // Calculate total expense
    const totalExpense = doctorFee + expectedCost + medicinesCost + surgeonVisitCharges + (lengthOfStay * roomRent);
    
    return totalExpense.toFixed(2); // Return the total with 2 decimal places
  };
console.log(data1)
  const handlePrint = () => {
    const input = document.getElementById('table-to-print');
    html2canvas(input, { useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 190;
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save('HealthcareTable.pdf');
    });
  };

  return (
    <div className="p-4">
      <div id="table-to-print">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th colSpan="4" className="border border-gray-300 p-2 text-center bg-white apdf">
                <img
                  src={logo}
                  alt="Jivit Healthcare Logo"
                  className="w-20 h-20 mx-auto mb-2"
                />
                <h2 className="text-xl font-bold">JIVIT HEALTHCARE & MEDICAL SERVICES PVT. LTD</h2>
                <p>CORPORATE OFFICE: PLOT NO.61, KANCHAN NAGAR JALGAON</p>
                <p>PRE-AUTHORIZATION REQUEST FORM</p>
                <p>CONTACT US: +91-0257-2355100, +91-9322006810, +91-9665450999</p>
                <p>E-MAIL: info@jivithealthcare.com | WEB: www.jivithealthcare.com</p>
              </th>
            </tr>
          </thead>
          <tbody className='pbody'>
            {data1.map((entry, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td className="border border-gray-300 p-2 text-left">
                    <strong>Employee Name: </strong>{entry.employeeName}
                  </td>
                  <td className="border border-gray-300 p-2 text-left">
                    <strong>Patient Name: </strong>{entry.patientName}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 text-left">
                    <strong>Health Card No: </strong>{entry.healthCardNo}
                  </td>
                  <td className="border border-gray-300 p-2 text-left">
                    <strong>Department Name: </strong>{entry.departmentName}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 text-left">
                    <strong>Mobile No: </strong>{entry.mobileNo}
                  </td>
                  <td className="border border-gray-300 p-2 text-left">
                    <strong>Relation with Employee: </strong>{entry.relationWithEmployee}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 text-left">
                    <strong>Address: </strong>{entry.address}
                  </td>
                  <td className="border border-gray-300 p-2 text-left">
                    <strong>Adhar Card: </strong> {entry.aadharCard ? 'Yes' : 'No'}
                  </td>
                </tr>
                <h4 className='ppdf'>PART- II ( To be filled in by Doctor/Hospital )</h4>
                <tr>
                  <td className="border border-gray-300 p-2 text-left">
                    <strong>Date Of Admition: </strong>{entry.dateOfAdmission}
                  </td>
                  <td className="border border-gray-300 p-2 text-left">
                    <strong>Chief Complaints: </strong>{entry.chiefComplaints}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 text-left">
                    <strong>Provisional Diagnosis: </strong>{entry.provisionalDiagnosis}
                  </td>
                  <td className="border border-gray-300 p-2 text-left">
                    <strong>Plan of Treatment (Medical): </strong>{entry.planOfTreatmentMedical}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 text-left">
                    <strong>Plan of Treatment (Surgical): </strong>{entry.planOfTreatmentSurgical}
                  </td>
                  <td className="border border-gray-300 p-2 text-left">
                    <strong>General Ailment: </strong>{entry.grAilment}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 text-left">
                    <strong>General Ailment Code: </strong>{entry.grAilmentCode}
                  </td>
                  <td className="border border-gray-300 p-2 text-left">
                    <strong>Status: </strong>{entry.status}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 text-left">
                    <strong>Expected Length of Stay: </strong>{entry.expectedLengthOfStay}
                  </td>
                  <td className="border border-gray-300 p-2 text-left">
                    <strong>Class of Accommodation: </strong>{entry.classOfAccommodation}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 text-left">
                    <strong>Per Day Room Rent: </strong>{entry.perDayRoomRent}
                  </td>
                  <td className="border border-gray-300 p-2 text-left">
                    <strong>Expected Cost Investigation: </strong>{entry.expectedCostInvestigation}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 text-left">
                    <strong>Medicines & Consumables Cost: </strong>{entry.medicinesConsumablesCost}
                  </td>
                  <td className="border border-gray-300 p-2 text-left">
                    <strong>Doctor Fee (Surgeon Assist): </strong>{entry.doctorFeeSurgeonAss}
                  </td>
                </tr> 
                <tr>
                  <td className="border border-gray-300 p-2 text-left">
                    <strong>Surgeon Anesthetist Visit Charges: </strong>{entry.surgeonAnesthetistVisitCharges}
                  </td>
                  <td className="border border-gray-300 p-2 text-left">
                    <strong>Other Charges: </strong>{entry.otherCharges}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2 text-left">
                    <strong>Total Expense Hospitalization: </strong>{calculateTotalExpense(entry)}
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={handlePrint}
          className="mb-4 px-4 py-2  bg-blue-500  text-white rounded td"
        >
          Print PDF
        </button>
      </div>
    </div>
  );
};

export default CompleteMedicalAuthPDF;
