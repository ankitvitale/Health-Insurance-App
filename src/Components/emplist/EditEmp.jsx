import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditBeneficiary() {
    const { id } = useParams(); 
    const [beneficiary, setBeneficiary] = useState(null); 
    const [formData, setFormData] = useState({
        fullName: '',
        address: '',
        phoneNumber: '',
        dateOfJoining: '',
        dateOfRetirement: '',
        aadharNo: '',
        departmentName: '',
        departmentLocation: '',
        designation: '',
        benificiaryCardDependents: [
            {
                id: '',
                name: '',
                relation: '',
                age: '',
                gender: ''
            }
        ]
    });

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        async function fetchBeneficiary() {
            try {
                let url = `http://localhost:8080/benificiaries/${id}`;
                let response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                let data = await response.json();
                setBeneficiary(data);

                
                setFormData({
                    cardNo: data.cardNo || '',
                    fullName: data.fullName || '',
                    address: data.address || '',
                    phoneNumber: data.phoneNumber || '',
                    dateOfJoining: data.dateOfJoining || '',
                    dateOfRetirement: data.dateOfRetirement || '',
                    dateOfBirth: data.dateOfBirth || '',
                    cardIssueDate: data.cardIssueDate || '',
                    aadharNo: data.aadharNo || '',
                    departmentName: data.departmentName || '',
                    departmentLocation: data.departmentLocation || '',
                    designation: data.designation || '',
                    benificiaryCardDependents: data.benificiaryCardDependents || []
                });
            } catch (error) {
                console.error('Error fetching beneficiary:', error);
            }
        }

        fetchBeneficiary();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name.startsWith('dependents.')) {
            const index = name.split('.')[1]; 
            const field = name.split('.')[2]; 
            setFormData((prevFormData) => {
                const updatedDependents = [...prevFormData.benificiaryCardDependents];
                updatedDependents[index] = {
                    ...updatedDependents[index],
                    [field]: value
                };
                return { ...prevFormData, benificiaryCardDependents: updatedDependents };
            });
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let url = `http://localhost:8080/updateBenificiary/${id}`;
            let response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            let updatedData = await response.json();
            console.log('Beneficiary updated:', updatedData);
            navigate('/admin/emplist');
        } catch (error) {
            console.error('Error updating beneficiary:', error);
        }
    };

    if (!beneficiary) {
        return <div>Loading...</div>; 
    }

    return (
        <div>
            <h1>Edit Beneficiary</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Card No:
                    <input
                        type="text"
                        name="cardNo"
                        value={formData.cardNo}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Full Name:
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Address:
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Phone Number:
                    <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Date of Joining:
                    <input
                        type="date"
                        name="dateOfJoining"
                        value={formData.dateOfJoining}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Date of Retirement:
                    <input
                        type="date"
                        name="dateOfRetirement"
                        value={formData.dateOfRetirement}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>Date of Birth:</label>
                <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
                <label>Isue Card Date</label>
                <input type="date" name="cardIssueDate" value={formData.cardIssueDate} onChange={handleChange} required />
                <label>
                    Aadhar No:
                    <input
                        type="text"
                        name="aadharNo"
                        value={formData.aadharNo}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Department Name:
                    <input
                        type="text"
                        name="departmentName"
                        value={formData.departmentName}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Department Location:
                    <input
                        type="text"
                        name="departmentLocation"
                        value={formData.departmentLocation}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Designation:
                    <input
                        type="text"
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        required
                    />
                </label>

                <h2>Edit Dependents</h2>
                {formData.benificiaryCardDependents.map((dependent, index) => (
                    <div key={dependent.id || index}>
                        <h3>Dependent {index + 1}</h3>
                        <label>
                            Name:
                            <input
                                type="text"
                                name={`dependents.${index}.name`}
                                value={dependent.name}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Relation:
                            <input
                                type="text"
                                name={`dependents.${index}.relation`}
                                value={dependent.relation}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Age:
                            <input
                                type="number"
                                name={`dependents.${index}.age`}
                                value={dependent.age}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label>
                            Gender:
                            <select
                                name={`dependents.${index}.gender`}
                                value={dependent.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </label>
                    </div>
                ))}

                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
}

export default EditBeneficiary;
