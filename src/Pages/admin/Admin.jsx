import React, { useState } from 'react'
import './Admin.css'
import logo from '../../Assets/jivit-logo.svg'
import { Link, Outlet } from 'react-router-dom'
import { FaHeart, FaHospital, FaUser, FaBars, FaCut, FaPlus, FaList, FaPaypal, FaSquare, FaUsers } from 'react-icons/fa'
import { FaTicket } from 'react-icons/fa6'


function Admin() {
    const [icon, setIcon] = useState(false)
    const [DropdownOpen, setIsDropdownOpen] = useState(false);

    const isDropdownOpen = () => {
        setIsDropdownOpen(!DropdownOpen);
    };
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };
    return (
        <>
            <header className='admin-header'>
                <div className="header-icon">
                    <img src={logo} alt="" />
                </div>
                <div className="admin-logo">
                    <h5 onClick={() => isDropdownOpen()}><FaUser /> Admin@gmail.com</h5>
                    {/* Dropdown menu */}
                    {DropdownOpen && (
                        <div className="dropdown-menu">

                            <button className='td' onClick={handleLogout}>Logout</button>

                        </div>
                    )}
                </div>
            </header>
            <hr />
            <aside>
                <div className="hidden" onClick={() => {
                    setIcon(!icon)
                }}>{icon ? <FaCut /> : <FaBars />} </div>
                <div className='sidebar'>
                    <div className="items">
                        <div className="dash">
                            <Link to='/admin'><button>Dashboard</button></Link>

                        </div>
                        <hr />
                        <div className="hospital">
                            <h5><FaHospital /> Hospital</h5>
                            <Link to='hospitalform'><FaPlus className='i' />Add Hospital</Link>
                            <Link to='hospitallist'><FaList className='i' /> Hospital List</Link>
                            <Link to='claimtlist'><FaSquare className='i' /> Hospital Claim</Link>
                            <Link to='hospitalpay'><FaPaypal className='i' />Hospital Payments</Link>
                            <Link to='paymentlist'><FaPaypal className='i' />Payments List</Link>
                        </div>
                        <hr />
                        <div className="health">
                            <h5><FaHeart /> Health Checkup</h5>
                            <Link to='healthtlist'><FaList className='i' /> Health List</Link>
                        </div>
                        <hr />
                        <div className="admin-customers">
                            <h5><FaUsers /> Customers</h5>
                            <Link to='empform'> <FaPlus className='i' /> Add Benificiary</Link>
                            <Link to='emplist'><FaList className='i' />  Customers List</Link>
                            <Link to='tickets'><FaTicket className='i' />  Tickets</Link>
                            <Link to='AppointmentTable'><FaTicket className='i' />  Appoimenet List</Link>

                        </div>
                    </div>
                </div>
                {
                    icon &&
                    <div className="items1">
                        <div className="dash">
                            <Link to='/admin'><button>Dashboard</button></Link>

                        </div>
                        <hr />
                        <div className="hospital">
                            <h5><FaHospital /> Hospital</h5>
                            <Link to='hospitalform' onClick={() => {
                                setIcon(!icon)
                            }}>Add Hospital</Link>
                            <Link to='hospitallist' onClick={() => {
                                setIcon(!icon)
                            }}>Hospital List</Link>
                            <Link to='claimtlist' onClick={() => {
                                setIcon(!icon)
                            }}>Hospital Claim</Link>
                            <Link to='hospitalpay' onClick={() => {
                                setIcon(!icon)
                            }}>Hospital Payments</Link>
                            <Link to='paymentlist' onClick={() => {
                                setIcon(!icon)
                            }}>Payments List</Link>
                        </div>
                        <hr />
                        <div className="health">
                            <h5> <FaHeart /> Health Checkup</h5>
                            <Link to='healthtlist' onClick={() => {
                                setIcon(!icon)
                            }}>Health List</Link>
                        </div>
                        <hr />
                        <div className="admin-customers">
                            <h5><FaUser /> Customers</h5>
                            <Link to='empform' onClick={() => {
                                setIcon(!icon)
                            }}>Add Benificiary</Link>
                           
                            <Link to='emplist' onClick={() => {
                                setIcon(!icon)
                            }}>Customers List</Link>
                                  <Link to='tickets' onClick={() => {
                                setIcon(!icon)
                            }}><FaTicket className='i' />  Tickets</Link>
                             <Link to='tickets' onClick={() => {
                                setIcon(!icon)
                            }}><FaTicket className='i' />  Appoimenet List</Link>
                        </div>
                    </div>
                }
                <section>
                    <Outlet />
                </section>
            </aside>
        </>
    )
}

export default Admin