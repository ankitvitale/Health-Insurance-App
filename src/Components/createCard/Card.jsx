import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './Card.css';
import front from '../../Assets/card/update.png';
import back from '../../Assets/card/back.png';
import JMS from '../../Assets/card/image (2).png'
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
                let url = `${process.env.REACT_APP_API_KEY}/benificiaries/${params.id}`;

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

    const handlePrint = () => {
        const MAX_WIDTH = 200;
        const MAX_HEIGHT = 200;

        html2canvas(printRef.current, { scale: 2 }).then((canvas) => {
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


            pdf.addImage(imgData, 'PNG', 5, -10, 200, newHeight);
            pdf.save(`${data.fullName}.pdf`);
        });
    };


    const dob = new Date(data.dateOfBirth);
    const doi = new Date(data.cardIssueDate);
    const dor = new Date(data.dateOfRetirement);
    const formattedDate = dob.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
    const formatedoi = doi.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
    const formatedor = dor.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
    return (
        <>
            <div className="img" ref={printRef}>
                {/* <img src={front} alt="Front of Card" />
                <img src={back} alt="Back of Card" /> */}
                <img src={JMS} alt="JMS Card" />

                <div className="card">
                    <h3 className='h3'> {data.cardNo}</h3>
                    <p className='hh'> {data.fullName}</p>
                    <p className='dob'>  {formattedDate}</p>
                    <p className='dob'> {data.departmentName}</p>
                    <p className='dob'>  {data.departmentLocation}</p>
                    <p className='dob'> {data.designation}</p>
                </div>
                <div className="cardspan">DOR</div>
                <div className="cardspan1">DOI</div>
                <div className="card1">
                    <p className='dob'>  {data.gender || "Male"}</p>
                    <p className='dob'>  {formatedoi}</p>
                    <p className='dob'> {formatedor}</p>
                </div>
                <div className="line"></div>
                <div className="line2">Government</div>
                <div className="table">
                    <table>
                        <thead className='thead'>
                            <tr className='ttr'>
                                <th>Sr.No</th>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Age</th>
                                <th>Relation</th>
                            </tr>

                        </thead>
                        <tbody>
                            {
                                family.map((e, i) => (
                                    <tr className='ttr' key={i}>
                                        <td>{i + 1}</td>
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