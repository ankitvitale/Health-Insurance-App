import React, { useEffect, useState } from 'react';
import './Home.css';
import benifit from '../../Assets/Benefit.svg';
import discharg from '../../Assets/discharge.svg';
import vector from '../../Assets/Vector.svg';
import company from '../../Assets/Company.svg';
import people from '../../Assets/pp 1.svg';
import cash from '../../Assets/cashless.svg';
import work from '../../Assets/workingman.svg';
import happy from '../../Assets/happy.svg';
import together from '../../Assets/together.svg';
import stay from '../../Assets/stayman.svg';
import service1 from '../../Assets/service1.svg';
import service2 from '../../Assets/service2.svg';
import service3 from '../../Assets/service3.svg';
import service4 from '../../Assets/service4.svg';
import insurance from '../../Assets/insurance.svg';
import mission1 from '../../Assets/mission1.svg';
import mission2 from '../../Assets/mission2.svg';
import mission3 from '../../Assets/mission3.svg';
import customer from '../../Assets/customer.svg';
import Header from '../../Components/header/Header';
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./Home.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from '../../Components/footer/Footer';
import ScrollToTop from '../../Scroll';
import { apiUrl } from '../../Components/shared';
function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    useEffect(() => {
        AOS.init();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            console.log('Form submitted:', formData);
            
            // Make a POST request using fetch
            const response = await fetch(`https://jivithealthcare.in/api/appointment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // Convert formData to JSON string
            });
    
            if (response.ok) { // Check if response is successful (status code 200-299)
                const data = await response.json(); // Parse JSON response
                console.log('Appointment created successfully:', data);
                setIsModalOpen(false); // Close the modal after successful submission
            } else {
                console.error('Failed to create appointment:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error submitting the form:', error);
        }
    
        // Reset the form after submission
        setFormData({
            name: '',
            email: '',
            phone: '',
            message: '',
        });
    };
    

    const handleCancel = () => {
        setIsModalOpen(false);
        setFormData({
            name: '',
            email: '',
            phone: '',
            message: '',
        }); // Reset the form
    };
   
    return (
        <>
            <ScrollToTop />
            <div className="main-wrapper" id='top'>
                <Header />
                <div className="main-content">
                    <h1 data-aos='fade-down' data-aos-duration='1200'>Health Insurance Plan</h1>
                    <p data-aos='fade-right' data-aos-duration='1400'>Health insurance provisions for employees of state and semi-state government agencies.</p>
                    <div className="main btn" data-aos='fade-up' data-aos-duration='1500'>
                        <button onClick={() => setIsModalOpen(true)}>Get Appointment</button>
                    </div>
                </div>
            </div>
            <div className="benifit">
                <div className="benifit-content">
                    <img src={benifit} alt="" />
                    <h2> Benefits of the Aarogyadeep Scheme</h2>
                </div>
                <div className="benifit-boxes">
                    <div className="box" data-aos='zoom-in' data-aos-duration='1000'>
                        <img src={discharg} alt="" />
                        <p>Discharge without paying any bills.</p>
                    </div>
                    <div className="box" data-aos='zoom-in' data-aos-duration='1100'>
                        <img src={vector} alt="" />
                        <p>Cashless treatment without advance payment after admission.</p>
                    </div>
                    <div className="box" data-aos='zoom-in' data-aos-duration='1200'>
                        <img src={company} alt="" />
                        <p>After discharge, the company handles all the medical reimbursement procedures.</p>
                    </div>
                    <div className="box" data-aos='zoom-in' data-aos-duration='1300'>
                        <img src={people} alt="" />
                        <p>Cashless coverage up to ₹3 to ₹5 lakhs for 27 emergencies and 5 serious illnesses.</p>
                    </div>
                    <div className="box" data-aos='zoom-in' data-aos-duration='1400'>
                        <img src={cash} alt="" />
                        <p>Cashless benefits for 6 family members.</p>
                    </div>
                </div>
                <div className="benifit-btn">
                    <span>More Details ➡</span>
                </div>
            </div>
            <div className="works">
                <div className="work" data-aos='fade-left' data-aos-duration='1000'>
                    <img src={work} alt="" />
                    <span>2k+</span>
                    <span>TRAINED ADVISORS</span>
                </div>
                <div className="work" data-aos='fade-up' data-aos-duration='1200'>
                    <img src={happy} alt="" />
                    <span>15K+</span>
                    <span>HAPPY CUSTOMERS</span>
                </div>
                <div className="work" data-aos='fade-down' data-aos-duration='1400'>
                    <img src={together} className='together' alt="" />
                    <span>20+</span>
                    <span>INSURANCE PARTNERS</span>
                </div>
                <div className="work" data-aos='fade-right' data-aos-duration='1600'>
                    <img src={stay} alt="" />
                    <span>50K+</span>
                    <span>POLICIES SOLD</span>
                </div>
            </div>
            <div className="services" id='service'>
                <h2>Our Services</h2>
                <div className="service" data-aos='fade-right' data-aos-duration='1000'>
                    <img src={service1} alt="" />
                    <div className="service-content">
                        <h5>Cashless Hospitalization</h5>
                        <p>We Provide Cashless hospitalization service, which allows the policy holder to avail of hospital facilities without having to worry about paying hospital bills.</p>
                    </div>
                </div>
                <div className="service s1" data-aos='fade-right' data-aos-duration='1100'>
                    <div className="service-content">
                        <h5>Claims Management</h5>
                        <p>We Provide Claims Management by identifying, controlling and resolving demands by individuals or public entities to recover losses from any Member of the Association.</p>
                    </div>
                    <img src={service2} alt="" />
                </div>
                <div className="service" data-aos='fade-right' data-aos-duration='1200'>
                    <img src={service3} alt="" />
                    <div className="service-content">
                        <h5>Free Medical Check-up</h5>
                        <p>We allow FREE medical check-ups. However, avail it without the fear that it may escalate the premium rates.</p>
                    </div>
                </div>
                <div className="service s2" data-aos='fade-right' data-aos-duration='1300'>
                    <div className="service-content">
                        <h5>Health Services Coordination</h5>
                        <p>Involves planning, directing, and coordinating medical and health services.</p>
                    </div>
                    <img src={service4} alt="" />
                </div>
            </div>
            <div className="insurance">
                <div className="insrance-content">
                    <h3>
                        Access <span>Free Insurance</span> Consultation Services from <span>Our Certified Experts!</span>
                    </h3>
                </div>
                <div className="insurance-img">
                    <img src={insurance} alt="" />
                </div>
            </div>
            <div className="about" id='about'>
                <h2>About Us</h2>
                <p>Jivit Healthcare & Medical Services Pvt. Ltd provides government health plans, best health assistant, claim management & government health plans, health check-up plans. Jivit Healthcare & Medical Services Pvt. Ltd. is a prominent & trustable Health care company which has great experience in medical & healthcare services. Our team always delivers the best healthcare services to the customers...</p>
                <div className="missions">
                    <div className="mission" data-aos='zoom-in' data-aos-duration='1200'>
                        <img src={mission1} alt="" />
                        <h6>Our Mission</h6>
                        <p>Convenient and best possible quality healthcare services members at reasonable cost & quality excellence best solution..</p>
                    </div>
                    <div className="mission" data-aos='zoom-in' data-aos-duration='1400'>
                        <img src={mission2} alt="" />
                        <h6>Our Goals</h6>
                        <p>To deliver the highest level of quality medical services, thus supporting & developing our health, care, environment & community.</p>
                    </div>
                    <div className="mission" data-aos='zoom-in' data-aos-duration='1600'>
                        <img src={mission3} alt="" />
                        <h6>Our Value</h6>
                        <p>To earn the trust of our members by delivering exemplary services, transparent communication, accountability and reliability.</p>
                    </div>
                </div>
            </div>
            <div className="customers" id='customer'>
                <h2>Our Customers</h2>
                <Swiper
                    effect={"coverflow"}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={"auto"}
                    coverflowEffect={{
                        rotate: 10,
                        stretch: 0,
                        depth: 0,
                        modifier: 0,
                        slideShadows: true,
                    }}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}

                    modules={[EffectCoverflow,Autoplay]}
                    className='swip_wrap'>
                    <div className="w">
                        <SwiperSlide className='swiper-feedback'>
                            <div className="cc">
                                <div className="customer">
                                    <div className="customer-img">
                                        <img src={customer} alt="" />
                                    </div>
                                    <div className="customer-info">
                                        <h6>Arvind Fulzele</h6>
                                        <p>“Best Supporting Staff 24/7 Servives”</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className='swiper-feedback'>
                            <div className="cc">
                                <div className="customer">
                                    <div className="customer-img">
                                        <img src={customer} alt="" />
                                    </div>
                                    <div className="customer-info">
                                        <h6>Mr. Dashrath Daulat Patil </h6>
                                        <p>“I was Greate Experience With Jivit-Healthcare & Medical Services Pvt. Ltd..”</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className='swiper-feedback'>
                            <div className="cc">
                                <div className="customer">
                                    <div className="customer-img">
                                        <img src={customer} alt="" />
                                    </div>
                                    <div className="customer-info">
                                        <h6>Nilesh Rathod</h6>
                                        <p>“I was able to get an appointment quickly, which was great for my urgent issue.”</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className='swiper-feedback'>
                            <div className="cc">
                                <div className="customer">
                                    <div className="customer-img">
                                        <img src={customer} alt="" />
                                    </div>
                                    <div className="customer-info">
                                        <h6>Aditya</h6>
                                        <p>Provide Best Service And Quick Response </p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    </div>
                </Swiper>
            </div>
            <Footer />
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Book an Appointment</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                            <textarea
                                name="message"
                                placeholder="Message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                            <div className="modal-buttons">
                                <button type="submit">Submit</button>
                                <button type="button" onClick={handleCancel}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default Home;
