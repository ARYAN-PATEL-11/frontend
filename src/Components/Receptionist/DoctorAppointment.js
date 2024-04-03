import React from 'react'
import DAForm from './DAForm';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorAppointment = () => {
  let navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/");
        }
      }, []);
  return (
    <div className='flex justify-center items-center'>
      <div className='flex justify-center items-center mt-10 ml-20 pl-10 pr-10 pt-20' >
         <h1 className='font-bold text-6xl'>APPOINT<br></br>DOCTOR</h1>
      </div>
      <div className='flex justify-center items-center mt-20 pt-10' >
        <DAForm/>
      </div>
    </div>
  )
}

export default DoctorAppointment;
