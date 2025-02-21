import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './Card.css';
import logo from '../../Assets/jivitlogo.png'
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
                let url = `http://localhost:8080/api/benificiaries/${params.id}`;
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

    <div className="mobile-warning">
        <p>Please open this project on a laptop or desktop for card.</p>
    </div>

            <div className="card" ref={printRef}>
                {/* Front Side */}
                <div className="card-side card-front">

                    <div className="card-info">
                        <div className="info-left">
                            <p><b>Card No:</b> <span style={{ color: "red", fontWeight: "bold", fontSize: "10px" }}>{data.cardNo}</span></p>
                            <p><b>Emp. Name:</b>{data.fullName}</p>
                            <p><b>DOB:</b> {formattedDate}</p>
                            <p><b>Dept. Name:</b> {data.departmentName}</p>
                            <p><b>Location:</b> {data.departmentLocation}</p>
                            <p><b>Designation:</b>{data.designation}</p>
                        </div>
                        <div className="info-right">
                            <div className="card-header">
                                <img
                                    src={logo} // Replace with logo URL
                                    alt="Jivit Healthcare"
                                    className="card-logo"
                                />

                            </div>
                            <p><b>Gender:</b> {data.gender || "Male"}</p>
                            <p><b>DOI:</b>{formatedoi}</p>
                            <p><b>DOR:</b>  {formatedor}</p>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", paddingTop: "70px", justifyContent: "center", color: "white", fontSize: "8px", paddingRight: "5px" }}> <div style={{ fontSize: "11px", borderBottom: "1px solid white", margin: "2px" }}>Help Line:</div> <div>9322006819, 9307633246,</div> 9021184557, 9665450899</div>
                        <p style={{
                            color: "white",
                            fontSize: "8px",
                        marginTop: "38px",padding: "5px",textAlign:"center"}}>
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
                            color: "white",
                            fontSize: "15px",
                            textAlign:"center",
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
                            color: "white",
                            fontSize: "15px",
                            textAlign: "center",

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
                    <p>Visit us at - www.jivithealthcare.com</p>
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


// <div className="card">
//     {/* Front Side */}
//     <div className="card-side card-front">

//         <div className="card-info">
//             <div className="info-left">
//                 <p><b>Card No:</b> <span style={{ color: "red", fontWeight: "bold", fontSize: "16px" }}>{data.cardNo}</span></p>
//                 <p><b>Emp. Name:</b>{data.fullName}</p>
//                 <p><b>DOB:</b> {formattedDate}</p>
//                 <p><b>Dept. Name:</b> {data.departmentName}</p>
//                 <p><b>Location:</b> {data.departmentLocation}</p>
//                 <p><b>Designation:</b>{data.designation}</p>
//             </div>
//             <div className="info-right">
//                 <div className="card-header">
//                     <img
//                         src={logo} // Replace with logo URL
//                         alt="Jivit Healthcare"
//                         className="card-logo"
//                     />

//                 </div>
//                 <p><b>Gender:</b> {data.gender || "Male"}</p>
//                 <p><b>DOI:</b>{formatedoi}</p>
//                 <p><b>DOR:</b>  {formatedor}</p>
//             </div>
//         </div>
//         <div className="card-footer">
//             <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", paddingTop: "70px", justifyContent: "center", color: "white", fontSize: "11px", paddingRight: "5px" }}> <div style={{ fontSize: "14px", borderBottom: "1px solid white", margin: "2px" }}>Help Line:</div> <div>9322006819, 9307633246,</div> 9021184557, 9665450899</div>
//             <p style={{ color: "white", fontSize: "12px", marginTop: "68px" }}>
//                 ADDRESS: PLOT NO - 61, KANCHAN NAGAR, TAL: DIST JALGAON-425001
//             </p>
//         </div>
//     </div>

//     {/* Back Side */}
//     <div className="card-side card-back">
//         <div className="instructions">
//             <h3 style={
//                 {
//                     backgroundColor: "#1587CE",
//                     color: "white",
//                     fontSize: "15px"
//                 }
//             }>Instructions</h3>
//             <ol>
//                 <li>Schemes shall be cashless only for Jivit Healthcare cardholders.</li>
//                 <li>
//                     This card is valid only for 27 acute and 5 major diseases as
//                     defined by the Maharashtra Government.
//                 </li>
//                 <li>
//                     This card is valid only in network hospitals of Jivit Healthcare
//                     Pvt. Ltd.
//                 </li>
//                 <li>
//                     OPD treatment is not covered under the scheme, and this card is
//                     non-transferable.
//                 </li>
//             </ol>
//         </div>
//         <div className="dependents">
//             <h3 style={
//                 {
//                     backgroundColor: "#1587CE",
//                     color: "white",
//                     fontSize: "15px"
//                 }
//             }>Dependents</h3>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Sr.No</th>
//                         <th>Name</th>
//                         <th>Gender</th>
//                         <th>Age</th>
//                         <th>Relation</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {
//                         family.map((e, i) => (
//                             <tr  key={i}>
//                                 <td>{i + 1}</td>
//                                 <td>{e.name}</td>
//                                 <td>{e.gender}</td>
//                                 <td>{e.age}</td>
//                                 <td>{e.relation}</td>
//                             </tr>
//                         ))
//                     }
//                 </tbody>
//             </table>
//         </div>
//         <div className="footer">
//             <p>Visit us at - www.jivithealthcare.com</p>
//         </div>
//     </div>
// </div>