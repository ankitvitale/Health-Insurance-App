import React from 'react';
import { Navigate } from 'react-router-dom';

const HospitalProtected = ({ children }) => {
  const token = localStorage.getItem('jwtToken') ;
  return token ? children : <Navigate to="/hospitallogin" />;
};
 
export default HospitalProtected;
