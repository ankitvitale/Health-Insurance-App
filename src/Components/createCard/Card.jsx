import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './Card.css';
import logo from '../../Assets/jivitlogo.png'
import front from '../../Assets/card/update.png';
import back from '../../Assets/card/back.png';
import JMS from '../../Assets/card/image (2).png'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { BASE_URL } from '../../config';

function Card() {
    const [data, setData] = useState({});
    const [family, setFamily] = useState([]);
    const printRef = useRef();
    let params = useParams();

    useEffect(() => {
        async function getData() {
            const token = localStorage.getItem('token');
            try {
                let url = `${BASE_URL}/benificiaries/${params.id}`;
                //   let url = `http//localhost/api/benificiaries/${params.id}`;${process.env.REACT_APP_API_KEY}


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

        html2canvas(printRef.current, {
            scale: 2,
            useCORS: true,
            backgroundColor: null,
            removeContainer: true,
            ignoreElements: (element) => element.classList.contains('no-print'), // Ignore unwanted elements
        }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 5, 5, 200, canvas.height * (200 / canvas.width));
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

            <div className="mobile-warning">
                <p>Please open this project on a laptop or desktop for card.</p>
            </div>

            <div className="card" ref={printRef}>
                {/* Front Side */}
                <div className="card-side card-front">

                    <div className="card-info">
                        <div className="info-left">
                            <p><b>CARD NO</b>  <span className="card-no">:<span  style={{color:"red",fontWeight:"bold",fontSize:"14px"}}>{data.cardNo}</span></span></p>
                            <p><b>EMP NAME</b> <span  >:<span>{data.fullName}</span></span></p>
                            <p><b>DOB</b>  <span>:<span>{formattedDate}</span></span></p>
                            <p><b>DEPT NAME</b>  <span>:<span>{data.departmentName}</span></span></p>
                            <p><b>LOCATION</b> <span>:<span>{data.departmentLocation}</span></span></p>
                            <p><b>DESIGNATION</b> <span>:<span>{data.designation}</span></span></p>
                        </div>
                        <div className="info-right">
                            <div className="card-header">
                                <img src={logo} alt="Jivit Healthcare" className="card-logo" />
                            </div>
                            <p><b >GENDER</b> <span>:<span>{data.gender || "Male"}</span></span></p>
                            <p><b>DOI</b> <span>:<span>{formatedoi}</span></span></p>
                            <p><b>DOR</b> <span>:<span>{formatedor}</span></span></p>
                        </div>
                    </div>

                    <div className="card-footer">
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", paddingTop: "75px", justifyContent: "center", color: "white", fontSize: "8px", paddingRight: "5px" }}> <div style={{ fontSize: "14px", borderBottom: "1px solid white", margin: "2px",fontFamily:"sans-serif" }}>Help Line:</div> <div style={{fontSize:"11px",fontFamily:"sans-serif"}}>9322006810, 9307633246,</div> <div style={{fontSize:"11px",fontFamily:"sans-serif"}}>9021184557, 9665450999</div></div>
                        <p style={{
                            color: "white",
                            fontSize: "10px",
                            marginTop: "23px", padding: "5px", textAlign: "center"
                        }}>
                            ADDRESS: PLOT NO - 61, KANCHAN NAGAR, TAL: DIST JALGAON-425001
                        </p>
                    </div>
                </div>

                {/* Back Side */}
                <div className="card-side card-back">
                    <div className="instructions">
                        <h3 style={
                            {
                                backgroundColor: "#1587CE",
                                color:"whitesmoke",
                                fontSize: "13px",
                                textAlign: "center",
                                padding:"4px 0px",
                                fontFamily:"sans-serif"
                            }
                        }>Instructions</h3>
                        <ol>
                            <li>Schemes shall be cashless only for Jivit Healthcare cardholders.</li>
                            <li>
                                This card is valid only for 27 acute and 5 major diseases as
                                defined by the Maharashtra Government.
                            </li>
                            <li>
                                This card is valid only in network hospitals of Jivit Healthcare
                                Pvt. Ltd.
                            </li>
                            <li>
                                OPD treatment is not covered under the scheme, and this card is
                                non-transferable.
                            </li>
                        </ol>
                    </div>
                    <div className="dependents">
                        <h3 style={
                            {
                                backgroundColor: "#1587CE",
                                color:"whitesmoke",
                                fontSize: "13px",
                                textAlign: "center",
                                padding:"4px 0px",
                                fontFamily:"sans-serif",
                               

                            }
                        }>Dependents</h3>
                        <table classna>
                            <thead>
                                <tr >
                                    <th >Sr.No</th>
                                    <th>Name</th>
                                    <th>Gender</th>
                                    <th>Age</th>
                                    <th>Relation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    family.map((e, i) => (
                                        <tr key={i}>
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
                    <div className="footerp">
                        <p>Visit us at - www.jivithealthcare.in</p>
                    </div>
                </div>
            </div >
            <button className="print-btn" onClick={handlePrint}>
                Print Card
            </button>
        </>
    );
}

export default Card;
