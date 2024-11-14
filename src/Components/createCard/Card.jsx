import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './Card.css';
import front from '../../Assets/card/update.png';
import back from '../../Assets/card/back.png';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function Card() {
    const [data, setData] = useState({});
    const [family, setFamily] = useState([]);
    const printRef = useRef();
    let params = useParams();

    useEffect(() => {
        async function getData() {
            const token = localStorage.getItem('token');
            try {
                let url = `http://82.112.237.134:8080/benificiaries/${params.id}`;

                let response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                let emp = await response.json();
                setData(emp);
                setFamily(emp.benificiaryCardDependents)
                console.log(emp);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        getData();
    }, [params.id]);
    console.log(family)
    const handlePrint = () => {
        const MAX_WIDTH = 200;
        const MAX_HEIGHT = 200;

        html2canvas(printRef.current, { scale: 1 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();

            const imgWidth = canvas.width;
            const imgHeight = canvas.height;

            let scale = Math.min(MAX_WIDTH / imgWidth, MAX_HEIGHT / imgHeight);
            let newWidth = imgWidth * scale;
            let newHeight = imgHeight * scale;

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            const xPos = (pdfWidth - newWidth) / 2;
            const yPos = (pdfHeight - newHeight) / 2;


            pdf.addImage(imgData, 'PNG', xPos, yPos, newWidth, newHeight);
            pdf.save('card.pdf');
        });
    };
    console.log(data)
    return (
        <>
            <div className="img" ref={printRef}>
                <img src={front} alt="Front of Card" />
                <img src={back} alt="Back of Card" />
                <div className="card">
                    <h3 className=''><span>Card No  : </span>  {data.cardNo}</h3>
                    <h4 className='hh'><span> Emp. Name  : </span> {data.fullName}</h4>
                    <h4 className='dob'><span>DOB  : </span>  {data.dateOfBirth}</h4>
                    <h4 className='dob'><span>Dept. Name  : </span>  {data.departmentName}</h4>
                    <h4 className='dob'><span>Location  : </span>  {data.departmentLocation}</h4>
                    <h4 className='dob'><span>Designation    : </span>  {data.designation}</h4>
                </div>
                <div className="card1">
                    <h4 className='dob'><span>Gender:</span>  {data.gender || "Male"}</h4>
                    <h4 className='dob'><span>DOI:</span>  {data.cardIssueDate}</h4>
                    <h4 className='dob'><span>DOR:</span>  {data.dateOfRetirement}</h4>
                </div>
                <div className="table">
                    <table>
                        <thead className='thead'>
                            <tr className='ttr'>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Age</th>
                                <th>Relation</th></tr>

                        </thead>
                        <tbody> 
                            {
                                family.map((e) => (
                                    <tr className='ttr'>
                                        <td>{e.name}</td>
                                        <td>{e.gender}</td>
                                        <td>{e.age}</td>
                                        <td>{e.relation}</td>
                                    </tr>
                                ))
                            }
                        </tbody>

                    </table>
                </div>
            </div>
            <button className="print-btn" onClick={handlePrint}>
                Print Card
            </button>
        </>
    );
}

export default Card;
