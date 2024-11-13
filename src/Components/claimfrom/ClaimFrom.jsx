import React, { useEffect, useState } from "react";
import './ClaimFrom.css';

const ClaimRequestForm = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [patientName, setPatientName] = useState("");
  const [healthCardNo, setHealthCardNo] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [relationWithEmployee, setRelationWithEmployee] = useState("");
  const [address, setAddress] = useState("");
  const [chiefComplaints, setChiefComplaints] = useState("");
  const [provisionalDiagnosis, setProvisionalDiagnosis] = useState("");
  const [planOfTreatmentMedical, setPlanOfTreatmentMedical] = useState("");
  const [planOfTreatmentSurgical, setPlanOfTreatmentSurgical] = useState("");
  const [grAilment, setGrAilment] = useState("");
  const [grAilmentCode, setGrAilmentCode] = useState("");
  const [dateOfAdmission, setDateOfAdmission] = useState("");
  const [expectedLengthOfStay, setExpectedLengthOfStay] = useState("");
  const [classOfAccommodation, setClassOfAccommodation] = useState("");
  const [perDayRoomRent, setPerDayRoomRent] = useState("");
  const [expectedCostInvestigation, setExpectedCostInvestigation] = useState("");
  const [medicinesConsumablesCost, setMedicinesConsumablesCost] = useState("");
  const [doctorFeeSurgeonAss, setDoctorFeeSurgeonAss] = useState("");
  const [surgeonAnesthetistVisitCharges, setSurgeonAnesthetistVisitCharges] = useState("");
  const [totalExpenseHospitalization, setTotalExpenseHospitalization] = useState("");
  const [nameOfDoctor, setNameOfDoctor] = useState("");
  const [doctorRegistrationNumber, setDoctorRegistrationNumber] = useState("");
  const [alcoholAbuse, setAlcoholAbuse] = useState(false);
  const [mlcFirCopy, setMlcFirCopy] = useState(false);
  const [aadharCard, setAadharCard] = useState(null);
  const [jivatHealthCard, setJivatHealthCard] = useState(null);
  const [salaryACCheque, setSalaryACCheque] = useState(null);
  const [promissoryNote, setPromissoryNote] = useState(null);
  const [parishitdocument, setParishitdocument] = useState(null);
  const [cutumnbpramanpatra, setCutumnbpramanpatra] = useState(null);
  const [status, setStatus] = useState("Pending");





  const calculateTotalExpense = () => {
    const total = (parseFloat(perDayRoomRent) * parseInt(expectedLengthOfStay || 0)) +
      parseFloat(expectedCostInvestigation || 0) +
      parseFloat(medicinesConsumablesCost || 0) +
      parseFloat(doctorFeeSurgeonAss || 0) +
      parseFloat(surgeonAnesthetistVisitCharges || 0);

    setTotalExpenseHospitalization(total.toFixed(2));
  };

  // Use useEffect to automatically calculate total expense when relevant fields change
  useEffect(() => {
    calculateTotalExpense();
  }, [perDayRoomRent, expectedLengthOfStay, expectedCostInvestigation, medicinesConsumablesCost, doctorFeeSurgeonAss, surgeonAnesthetistVisitCharges]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("employeeName", employeeName);
    formData.append("patientName", patientName);
    formData.append("healthCardNo", healthCardNo);
    formData.append("departmentName", departmentName);
    formData.append("mobileNo", mobileNo);
    formData.append("relationWithEmployee", relationWithEmployee);
    formData.append("address", address);
    formData.append("chiefComplaints", chiefComplaints);
    formData.append("provisionalDiagnosis", provisionalDiagnosis);
    formData.append("planOfTreatmentMedical", planOfTreatmentMedical);
    formData.append("planOfTreatmentSurgical", planOfTreatmentSurgical);
    formData.append("grAilment", grAilment);
    formData.append("grAilmentCode", grAilmentCode);
    formData.append("dateOfAdmission", dateOfAdmission);
    formData.append("expectedLengthOfStay", expectedLengthOfStay);
    formData.append("classOfAccommodation", classOfAccommodation);
    formData.append("perDayRoomRent", perDayRoomRent);
    formData.append("expectedCostInvestigation", expectedCostInvestigation);
    formData.append("medicinesConsumablesCost", medicinesConsumablesCost);
    formData.append("doctorFeeSurgeonAss", doctorFeeSurgeonAss);
    formData.append("surgeonAnesthetistVisitCharges", surgeonAnesthetistVisitCharges);
    formData.append("totalExpenseHospitalization", totalExpenseHospitalization);
    formData.append("nameOfDoctor", nameOfDoctor);
    formData.append("doctorRegistrationNumber", doctorRegistrationNumber);
    formData.append("alcoholAbuse", alcoholAbuse);
    formData.append("mlcFirCopy", mlcFirCopy);
    formData.append("aadharCard", aadharCard);
    formData.append("jivatHealthCard", jivatHealthCard);
    formData.append("salaryACCheque", salaryACCheque);
    formData.append("promissoryNote", promissoryNote);
    formData.append("parishitdocument", parishitdocument);
    formData.append("cutumnbpramanpatra", cutumnbpramanpatra);
    formData.append("status", status);


    try {
      const token = localStorage.getItem("jwtToken");
      console.log(token)
      const response = await fetch(
        `${process.env.REACT_APP_API_KEY}/createCleamRequest`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      console.log(formData)
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Claim request submitted:", data);
      resetForm();
    } catch (error) {
      console.error("Error submitting request:", error);
    }
  };

  const resetForm = () => {
    setEmployeeName("");
    setPatientName("");
    setHealthCardNo("");
    setDepartmentName("");
    setMobileNo("");
    setRelationWithEmployee("");
    setAddress("");
    setChiefComplaints("");
    setProvisionalDiagnosis("");
    setPlanOfTreatmentMedical("");
    setPlanOfTreatmentSurgical("");
    setGrAilment("");
    setGrAilmentCode("");
    setDateOfAdmission("");
    setExpectedLengthOfStay("");
    setClassOfAccommodation("");
    setPerDayRoomRent("");
    setExpectedCostInvestigation("");
    setMedicinesConsumablesCost("");
    setDoctorFeeSurgeonAss("");
    setSurgeonAnesthetistVisitCharges("");
    setTotalExpenseHospitalization("");
    setNameOfDoctor("");
    setDoctorRegistrationNumber("");
    setAlcoholAbuse(false);
    setMlcFirCopy(false);
    setAadharCard(null);
    setJivatHealthCard(null);
    setSalaryACCheque(null);
    setPromissoryNote(null);
    setCutumnbpramanpatra(null)
    setParishitdocument()
    setStatus("Pending");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="claim-form" encType="multipart/form-data">
        <div className="form-container">

          <div>
            <label>Employee Name</label>
            <input
              type="text"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              required
            />
          </div>


          <div>
            <label>Patient Name</label>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              required
            />
          </div>


          <div>
            <label>Health Card No</label>
            <input
              type="text"
              value={healthCardNo}
              onChange={(e) => setHealthCardNo(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Department Name</label>
            <input
              type="text"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Mobile No</label>
            <input
              type="tel"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Relation with Employee</label>
            <input
              type="text"
              value={relationWithEmployee}
              onChange={(e) => setRelationWithEmployee(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Chief Complaints</label>
            <input
              type="text"
              value={chiefComplaints}
              onChange={(e) => setChiefComplaints(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Provisional Diagnosis</label>
            <input
              type="text"
              value={provisionalDiagnosis}
              onChange={(e) => setProvisionalDiagnosis(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Plan of Treatment (Medical)</label>
            <input
              type="text"
              value={planOfTreatmentMedical}
              onChange={(e) => setPlanOfTreatmentMedical(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Plan of Treatment (Surgical)</label>
            <input
              type="text"
              value={planOfTreatmentSurgical}
              onChange={(e) => setPlanOfTreatmentSurgical(e.target.value)}
              required
            />
          </div>

          <div>
            <label>General Ailment</label>
            <input
              type="text"
              value={grAilment}
              onChange={(e) => setGrAilment(e.target.value)}
              required
            />
          </div>

          <div>
            <label>General Ailment Code</label>
            <input
              type="text"
              value={grAilmentCode}
              onChange={(e) => setGrAilmentCode(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Date of Admission</label>
            <input
              type="date"
              value={dateOfAdmission}
              onChange={(e) => setDateOfAdmission(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Expected Length of Stay (in days)</label>
            <input
              type="number"
              value={expectedLengthOfStay}
              onChange={(e) => setExpectedLengthOfStay(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Class of Accommodation</label>
            <input
              type="text"
              value={classOfAccommodation}
              onChange={(e) => setClassOfAccommodation(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Per Day Room Rent</label>
            <input
              type="number"
              value={perDayRoomRent}
              onChange={(e) => setPerDayRoomRent(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Expected Cost of Investigation</label>
            <input
              type="number"
              value={expectedCostInvestigation}
              onChange={(e) => setExpectedCostInvestigation(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Medicines and Consumables Cost</label>
            <input
              type="number"
              value={medicinesConsumablesCost}
              onChange={(e) => setMedicinesConsumablesCost(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Doctor Fee (Surgeon/Assistant)</label>
            <input
              type="number"
              value={doctorFeeSurgeonAss}
              onChange={(e) => setDoctorFeeSurgeonAss(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Surgeon/Anesthetist Visit Charges</label>
            <input
              type="number"
              value={surgeonAnesthetistVisitCharges}
              onChange={(e) => setSurgeonAnesthetistVisitCharges(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Total Expense Hospitalization</label>
            <input
              type="number"
              value={totalExpenseHospitalization}
              readOnly
            />
          </div>

          <div>
            <label>Name of Doctor</label>
            <input
              type="text"
              value={nameOfDoctor}
              onChange={(e) => setNameOfDoctor(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Doctor Registration Number</label>
            <input
              type="text"
              value={doctorRegistrationNumber}
              onChange={(e) => setDoctorRegistrationNumber(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Alcohol Abuse</label>
            <input
              type="checkbox"
              checked={alcoholAbuse}
              onChange={(e) => setAlcoholAbuse(e.target.checked)}
            />
          </div>

          <div>
            <label>MLC/FIR Copy</label>
            <input
              type="checkbox"
              checked={mlcFirCopy}
              onChange={(e) => setMlcFirCopy(e.target.checked)}
            />
          </div>

          <div>
            <label>Aadhar Card</label>
            <input
              type="file"
              onChange={(e) => setAadharCard(e.target.files[0])}
            />
          </div>

          <div>
            <label>Jivat Health Card</label>
            <input
              type="file"
              onChange={(e) => setJivatHealthCard(e.target.files[0])}
            />
          </div>

          <div>
            <label>Salary AC Cheque</label>
            <input
              type="file"
              onChange={(e) => setSalaryACCheque(e.target.files[0])}
            />
          </div>

          <div>
            <label>Promissory Note</label>
            <input
              type="file"
              onChange={(e) => setPromissoryNote(e.target.files[0])}
            />
          </div>

          <div>

            <label>Cutumnb Pramanpatra</label>
            <input
              type="file"
              onChange={(e) => setCutumnbpramanpatra(e.target.files[0])}
            />
          </div>

          <div>
            <label>Parishitdocument</label>
            <input
              type="file"
              onChange={(e) => setParishitdocument(e.target.files[0])}
            />
          </div>

          <button type="submit">Submit Claim Request</button>
        </div>
      </form>
    </>
  );
};

export default ClaimRequestForm;
