// ProtectedRoute.js
import React from 'react';
import {  useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
 const { blocked } = useSelector((state) => state.authReducer);
const navigate= useNavigate()
 if (blocked) {
    Swal.fire({
      icon: 'error',
      title: 'Blocked!',
      text: 'You have been blocked by the admin.',
    });
    return  navigate('/auth')
 }

 return children;
};

export default ProtectedRoute;
