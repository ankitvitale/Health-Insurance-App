import React, { useState } from "react";
import axios from "axios";
import './Cform.css';

const HealthCheckupForm = () => {
  const [hospital, setHospital] = useState("");
  const [cardNo, setCardNo] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [depermentName, setDepermentName] = useState("");
  const [pesentName, setPesentName] = useState("");
  const [location, setLocation] = useState("");
  const [coupon, setCoupon] = useState("");
  const [doc1, setDoc1] = useState(null);
  const [status, setStatus] = useState("Pending");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("hospital", hospital);
    formData.append("cardNo", cardNo);
    formData.append("employeeName", employeeName);
    formData.append("depermentName", depermentName);
    formData.append("pesentName", pesentName);
    formData.append("location", location);
    formData.append("coupon", coupon);
    formData.append("doc1", doc1);
    formData.append("status", status);

    const token = localStorage.getItem("jwtToken");

    try {
      const response = await fetch(
        `http://82.112.237.134:8080/healthCheckupReqest`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      console.log(formData)
      resetForm()
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Health Checkup Request submitted:", data);

    } catch (error) {
      console.error("Error submitting request:", error);
    }
  };

  const resetForm = () => {
    setHospital('')
    setCardNo('')
setEmployeeName('')
setDepermentName('')
setPesentName('')
setLocation('')
setCoupon('')
setDoc1('')
setStatus('')
  };

  return (
    <div>
      <h1>New CheckUp</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-container">
          <div>
            <label>Hospital Name:</label>
            <input
              type="text"
              value={hospital}
              onChange={(e) => setHospital(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Card No.:</label>
            <input
              type="text"
              value={cardNo}
              onChange={(e) => setCardNo(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Employee Name:</label>
            <input
              type="text"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Department Name:</label>
            <input
              type="text"
              value={depermentName}
              onChange={(e) => setDepermentName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Present Name:</label>
            <input
              type="text"
              value={pesentName}
              onChange={(e) => setPesentName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Location:</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Coupon:</label>
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
          </div>
          <div>
            <label>Status:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
            </select>
          </div>
          <div>
            <label>Upload Documents (Max 10):</label>
            <input
              type="file"
              onChange={(e) => setDoc1(e.target.files[0])}
              required
            />
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default HealthCheckupForm;
