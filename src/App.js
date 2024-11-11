import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/home/Home';
import Admin from './Pages/admin/Admin';
import Dashboard from './Components/dashboard/Dashboard';
import EmpForm from './Components/form/EmpForm';
import HospitalComponent from './Components/hospitalform/HospitalForm';
import HospitalPay from './Components/hospitalpayment/HospitalPay';
import EmpList from './Components/emplist/EmpList';
import HospitalHome from './Pages/hospitalPanel/HospitalHome';
import FamilyMemberForm from './Components/famiymember/AddFamilyMember';
import Login from './Components/adminLogin/Login';
import PrivateRoute from './Components/adminLogin/Protected';
import HospitalLogin from './Components/hospitalLogin/Login';
import HospitalProtected from './Components/hospitalLogin/Protected';
import HospitalList from './Components/hospitallist/HospitalList';
import CleamRequestList from './Components/HospitalClaim';
import PaymentList from './Components/hpaymentlist/PaymentList';
import HealthList from './Components/healthlist/HealthList';
import CleamRequestForm from './Components/claimfrom/ClaimFrom';
import CheckupForm from './Components/checkupform/CheckupForm';
import CheckupList from './Components/checkuplist/CheckupList';
import Card from './Components/createCard/Card';
import HclaimList from './Components/hpanalClaimList/HclaimList';
import AllHospitalList from './Components/hospitallist/AllHospitalList';
import EditBeneficiary from './Components/emplist/EditEmp';
import Tickets from './Components/tickets/Tickets';
import CompleteMedicalAuthPDF from './Components/hpdf/CompleteMedicalAuthPDF';
import AppointmentTable from './Components/appointment/AppointmentList';
import Approvel from './Components/hpdf/Approvel';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route element={<Login />} path='/login' />
          <Route element={<HospitalLogin />} path='/hospitallogin' />
          <Route element={<AllHospitalList />} path='/AllHospitalList' />
          <Route element={<Home />} path='/' />
          <Route element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          } path='/admin/' >
            <Route element={<Dashboard />} path='' />
            <Route element={<h1>Welcome </h1>} path='hospital' />
            <Route element={<EmpForm />} path='empform' />
            <Route element={<FamilyMemberForm />} path='familyform' />
            <Route element={<HospitalPay />} path='hospitalpay' />
            <Route element={<EmpList />} path='emplist' />
            <Route element={<Card />} path='emplist/card/:id' />
            <Route element={<EditBeneficiary />} path='emplist/editemp/:id' />
            <Route element={<HospitalList />} path='hospitallist' />
            <Route element={<HospitalComponent />} path='hospitalform' />
            <Route element={<PaymentList />} path='paymentlist' />
            <Route element={<CleamRequestList />} path='claimtlist' />
            <Route element={<HealthList />} path='healthtlist' />
            <Route element={<Tickets />} path='tickets' />
            <Route element={<AppointmentTable/>}path='AppointmentTable'/>

            
          </Route>
          <Route element={
            <HospitalProtected>
              <HospitalHome />
            </HospitalProtected>
          } path='/hospitalhome/' >
               <Route element={<CleamRequestForm />} path='claimform' />
               <Route element={<CheckupForm />} path='' />
               <Route element={<CheckupList />} path='checkuplist' />
               <Route element={<HclaimList />} path='hclaimlist' />
               <Route element={<CompleteMedicalAuthPDF />} path='hclaimlist/pdf/:id' />
               <Route element={<Approvel />} path='hclaimlist/approvel/:id' />
             </Route>
         
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
