import React, { useState } from 'react';
import './EmployeeForm.css';
import { BASE_URL } from '../../config';
import { IconBase } from 'react-icons/lib';

const EmpForm = () => {
  const [formData, setFormData] = useState({
    fullName: " ",
    address: " ",
    phoneNumber: "",
    dateOfJoining: "",
    dateOfRetirement: "",
    dateOfBirth: "",
    cardIssueDate: "",
    aadharNo: "",
    departmentName: "",
    departmentLocation: "",
    designation: "",
    gender:"",
    benificiaryCardDependents: []
  });

  const token = localStorage.getItem('token');

  // Function to calculate age from date of birth
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFamilyChange = (index, e) => {
    const { name, value } = e.target;
    const updatedFamilyMembers = [...formData.benificiaryCardDependents];

    // If date of birth is changed, calculate age
    if (name === "dob") {
      const age = calculateAge(value);
      updatedFamilyMembers[index]["age"] = age;
    }

    updatedFamilyMembers[index][name] = value;
    setFormData({ ...formData, benificiaryCardDependents: updatedFamilyMembers });
  };

  const addFamilyMember = () => {
    setFormData({
      ...formData,
      benificiaryCardDependents: [
        ...formData.benificiaryCardDependents,
        {
          name: '',
          gender: '',
          relation: '',
          dob: '',
          age: ''
        }
      ]
    });
  };

  const removeFamilyMember = (index) => {
    const updatedFamilyMembers = formData.benificiaryCardDependents.filter((_, i) => i !== index);
    setFormData({ ...formData, benificiaryCardDependents: updatedFamilyMembers });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Form Data:', formData);

    try {
      const response = await fetch(`${BASE_URL}/addBenificiary`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      alert("Add Benificiary Successfully..");

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Success:', result);

      setFormData({
        fullName: " ",
        address: " ",
        phoneNumber: "",
        dateOfJoining: "",
        dateOfRetirement: "",
        dateOfBirth: "",
        cardIssueDate: "",
        aadharNo: "",
        departmentName: "",
        departmentLocation: "",
        designation: "",
        gender:"",
        benificiaryCardDependents: []
      });

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <h1 className='ahospital'>APPLICATION FORM</h1>
      <div className="form">
        <form onSubmit={handleSubmit} className="employee-form">
          <div className="form-group">
            <label>Full Name:</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Address:</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Phone Number:</label>
            <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Date of Joining:</label>
            <input type="date" name="dateOfJoining" value={formData.dateOfJoining} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Date of Retirement:</label>
            <input type="date" name="dateOfRetirement" value={formData.dateOfRetirement} onChange={handleChange} required/>
          </div>
          <div className="form-group">
            <label>Date of Birth:</label>
            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Issue Card Date</label>
            <input type="date" name="cardIssueDate" value={formData.cardIssueDate} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Aadhar No.:</label>
            <input type="text" name="aadharNo" value={formData.aadharNo} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Department Name:</label>
            <input type="text" name="departmentName" value={formData.departmentName} onChange={handleChange} required/>
          </div>
          <div className="form-group">
            <label>Department Location:</label>
            <input type="text" name="departmentLocation" value={formData.departmentLocation} onChange={handleChange} required/>
          </div>
          <div className="form-group">
            <label>Designation:</label>
            <input type="text" name="designation" value={formData.designation} onChange={handleChange} required/>
          </div>
          <div className="form-group">
            <label>Gender:</label>
            <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
            {/* <input type="text" name="gender" value={formData.gender} onChange={handleChange} required/> */}
          </div>
          

          <div className="form-group">
            <button type="button" onClick={addFamilyMember}>Add Family Member</button>
          </div>

          {formData.benificiaryCardDependents.length > 0 && (
            formData.benificiaryCardDependents.map((member, index) => (
              <div key={index} className="family-member-form">
                <h3>Family Member {index + 1}</h3>

                <div className="form-group">
                  <label>Member Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={member.name}
                    onChange={(e) => handleFamilyChange(index, e)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Gender:</label>
                  <select
                    name="gender"
                    value={member.gender}
                    onChange={(e) => handleFamilyChange(index, e)}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Date of Birth:</label>
                  <input
                    type="date"
                    name="dob"
                    value={member.dob}
                    onChange={(e) => handleFamilyChange(index, e)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Age:</label>
                  <input
                    type="number"
                    name="age"
                    value={member.age}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>Relation:</label>
                  <select
                    name="relation"
                    value={member.relation}
                    onChange={(e) => handleFamilyChange(index, e)}
                    required
                  >
                    <option value="">Select Relation</option>
                    <option value="Husband">Husband</option>
                    <option value="Wife">Wife</option>
                    <option value="Son">Son</option>
                    <option value="Daughter">Daughter</option>
                    <option value="Mother">Mother</option>
                    <option value="Father">Father</option>
                    <option value="Mother-in-law">Mother-in-law</option>
                    <option value="Father-in-law">Father-in-law</option>
                  </select>
                </div>
                <button type="button" onClick={() => removeFamilyMember(index)}>Remove Family Member</button>
              </div>
            ))
          )}

          <input className='formbutton' type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
};

export default EmpForm;
