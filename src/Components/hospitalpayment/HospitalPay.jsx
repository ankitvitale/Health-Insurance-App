import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const HospitalPay = () => {
  const [hospitalList, setHospitalList] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [hospitalPay, setHospitalPay] = useState({
    hospitalName: '',
    bankName: '',
    paymentMode: '',
    transactionNo: '',
    bankLocation: '',
    branch: '',
    checkNo: '',
    amount: '',
    employeeName: '',
    patientName: '',
    email: '',
    accountNo: '',
    accountName: '',
    ifscCode: '',
    detals: ''
  });

  // Fetch hospital list on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_KEY}/AllhospitalsList`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const hospitals = await response.json();
        const hospitalOptions = hospitals.map(hospital => ({
          value: hospital.hospitalName,
          label: hospital.hospitalName,
          email: hospital.email,
          accountNumber: hospital.accountNumber,
          bankName: hospital.bankName,
          accountName: hospital.accountName || 'Hospital Account',
          ifscCode: hospital.ifscCode,
          district: hospital.district,
          branch: hospital.branch
        }));
        setHospitalList(hospitalOptions);
      } catch (error) {
        console.error('Error fetching hospital list:', error);
      }
    }
    fetchData();
  }, []);

  // Handle hospital selection change
  const handleHospitalSelect = (selectedOption) => {
    setSelectedHospital(selectedOption);

    if (selectedOption) {
      setHospitalPay({
        ...hospitalPay,
        hospitalName: selectedOption.value,
        email: selectedOption.email || '',
        accountNo: selectedOption.accountNumber || '',
        bankName: selectedOption.bankName || '',
        accountName: selectedOption.accountName || 'Hospital Account',
        ifscCode: selectedOption.ifscCode || '',
        bankLocation: selectedOption.district || '',
        branch: selectedOption.branch || ''
      });
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setHospitalPay({
      ...hospitalPay,
      [name]: value
    });
  };

  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/addHospitalPayment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,

        },
        body: JSON.stringify(hospitalPay)

        
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setHospitalPay({
        hospitalName: '',
        bankName: '',
        paymentMode: '',
        transactionNo: '',
        bankLocation: '',
        branch: '',
        checkNo: '',
        amount: '',
        employeeName: '',
        patientName: '',
        email: '',
        accountNo: '',
        accountName: '',
        ifscCode: '',
        detals: ''
      });
      console.log('Payment Data Submitted:', result);
      alert('Payment data submitted successfully!');
    } catch (error) {
      console.error('Error submitting payment data:', error);
      alert('Failed to submit payment data.');
    }
  };

  return (
    <>
      <h1 className='ahospital'>Hospital Payments</h1>
      <div className="form">
        <form onSubmit={handleSubmit} className="employee-form">
          <div className="form-group">
            <label htmlFor="hospitalName">HOSPITAL NAME</label>
            <Select
              id="hospitalName"
              name="hospitalName"
              value={selectedHospital}
              onChange={handleHospitalSelect}
              options={hospitalList}
              isClearable
              placeholder="Select or search a hospital"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="bankName">BANK NAME</label>
            <input
              type="text"
              id="bankName"
              name="bankName"
              value={hospitalPay.bankName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="paymentMode">PAYMENT MODE</label>
            <input
              type="text"
              id="paymentMode"
              name="paymentMode"
              value={hospitalPay.paymentMode}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="transactionNo">TRANSACTION NO.</label>
            <input
              type="text"
              id="transactionNo"
              name="transactionNo"
              value={hospitalPay.transactionNo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="bankLocation">BANK LOCATION</label>
            <input
              type="text"
              id="bankLocation"
              name="bankLocation"
              value={hospitalPay.bankLocation}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="branch">BRANCH</label>
            <input
              type="text"
              id="branch"
              name="branch"
              value={hospitalPay.branch}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="checkNo">CHECK NO.</label>
            <input
              type="text"
              id="checkNo"
              name="checkNo"
              value={hospitalPay.checkNo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount">AMOUNT</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={hospitalPay.amount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="employeeName">EMPLOYEE NAME</label>
            <input
              type="text"
              id="employeeName"
              name="employeeName"
              value={hospitalPay.employeeName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="patientName">PATIENT NAME</label>
            <input
              type="text"
              id="patientName"
              name="patientName"
              value={hospitalPay.patientName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">EMAIL</label>
            <input
              type="email"
              id="email"
              name="email"
              value={hospitalPay.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="accountNo">ACCOUNT NUMBER</label>
            <input
              type="text"
              id="accountNo"
              name="accountNo"
              value={hospitalPay.accountNo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="accountName">ACCOUNT NAME</label>
            <input
              type="text"
              id="accountName"
              name="accountName"
              value={hospitalPay.accountName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="ifscCode">IFSC CODE</label>
            <input
              type="text"
              id="ifscCode"
              name="ifscCode"
              value={hospitalPay.ifscCode}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="detals">DETAILS</label>
            <textarea
              id="detals"
              name="detals"
              value={hospitalPay.detals}
              onChange={handleChange}
              required
            />
          </div>

          <input className='formbutton' type="submit" value='Submit' />
        </form>
      </div>
    </>
  );
};

export default HospitalPay;
