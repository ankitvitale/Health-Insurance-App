import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import authorize from '../../Assets/admin/authorize.svg'
import pending from '../../Assets/admin/pending.svg'
import Reject from '../../Assets/admin/reject.svg'
import total from '../../Assets/admin/total.svg'
function Dashboard() {
  const [data, setData] = useState([]);
  const [emp, setEmp] = useState([]);
  const [dpending, setDpending] = useState([]);
  const [autho, setAutho] = useState([]);
  const [reject, setReject] = useState([]);
  const [apending, setApending] = useState([]);
  const [empautho, setEmpautho] = useState([]);
  const [empreject, setEmpreject] = useState([]);
  useEffect(() => {
    const fetchCleamRequests = async () => {
      const token = localStorage.getItem('token');
      try {
        let response = await fetch(`http://82.112.237.134:8080/adminHeathCheckupList`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        setData(data);
      } catch (err) {
       console.log(err)
      }
    };

    fetchCleamRequests();
  }, []);
  useEffect(() => {
    let status = data.filter((e) => e.status === "Pending")
    let authorize = data.filter((e) => e.status === 'Authorized')
    let reject = data.filter((e) => e.status === 'Rejected')
    setDpending(status)
    setAutho(authorize)
    setReject(reject)
  }, [data])
  useEffect(() => {
    async function getData() {
        const token = localStorage.getItem('token');
        try {
            let url = `http://82.112.237.134:8080/benificiaries`;

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

            let employee = await response.json();
            setEmp(employee);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    getData();
}, []);
console.log(emp)
  useEffect(() => {
    let status = emp.filter((e) => e.status === "Pending")
    let authorize = emp.filter((e) => e.status === 'Authorized')
    let reject = emp.filter((e) => e.status === 'Rejected')
    setApending(status)
    setEmpautho(authorize)
    setEmpreject(reject)
  }, [data])
  return (
    <>
      <div className="dashbord">
        <h1 className='h1'>Dashboard</h1>
        <div className="admin-hospital">
          <h5>Hospitalization Request
          </h5>
          <div className="requests">
            <div className="request">
              <h4>Authorized</h4>
              <h6 className='a'>{autho.length}</h6>
              <p>"This transaction has been authorized."</p>
              <img src={authorize} alt="" />
            </div>
            <div className="request">
              <h4>Pending</h4>
              <h6 className='p'>{dpending.length}</h6>
              <p>"The decision is still pending."</p>
              <img src={pending} alt="" />
            </div>
            <div className="request">
              <h4>Reject</h4>
              <h6 className='r'>{reject.length}</h6>
              <p>"The claim was rejected."</p>
              <img src={Reject} alt="" />
            </div>
            <div className="request">
              <h4>Total</h4>
              <h6 className='t'>{data.length}</h6>
              <p>"The total number of requests.“</p>
              <img src={total} alt="" />
            </div>
          </div>
        </div>
        <div className="admin-hospital">
          <h5>Health CheckUp
          </h5>
          <div className="requests">
            <div className="request">
              <h4>Authorized</h4>
              <h6 className='a'>{autho.length}</h6>
              <p>"This transaction has been authorized."</p>
              <img src={authorize} alt="" />
            </div>
            <div className="request">
              <h4>Pending</h4>
              <h6 className='p'>{dpending.length}</h6>
              <p>"The decision is still pending."</p>
              <img src={pending} alt="" />
            </div>
            <div className="request">
              <h4>Reject</h4>
              <h6 className='r'>{reject.length}</h6>
              <p>"The claim was rejected."</p>
              <img src={Reject} alt="" />
            </div>
            <div className="request">
              <h4>Total</h4>
              <h6 className='t'>{data.length}</h6>
              <p>"The total number of requests.“</p>
              <img src={total} alt="" />
            </div>
          </div>
        </div>
        <div className="admin-hospital">
          <h5>Customers
          </h5>
          <div className="requests">
            <div className="request">
              <h4>Authorized</h4>
              <h6 className='a'>{empautho.length}</h6>
              <p>"This transaction has been authorized."</p>
              <img src={authorize} alt="" />
            </div>
            <div className="request">
              <h4>Pending</h4>
              <h6 className='p'>{apending.length}</h6>
              <p>"The decision is still pending."</p>
              <img src={pending} alt="" />
            </div>
            <div className="request">
              <h4>Reject</h4>
              <h6 className='r'>{empreject.length}</h6>
              <p>"The claim was rejected."</p>
              <img src={Reject} alt="" />
            </div>
            <div className="request">
              <h4>Total</h4>
              <h6 className='t'>{emp.length}</h6>
              <p>"The total number of requests.“</p>
              <img src={total} alt="" />
            </div>
          </div>
        </div>
 
      </div>
    </>
  )
}

export default Dashboard