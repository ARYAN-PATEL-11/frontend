import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import receptionist from '../assets/receptionist_11833579-removebg-preview.png'; 


export default function ReceptionistDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token) {
      // Redirect to login page if token doesn't exist
      navigate("/");
    }
    if (role !== "RECEPTIONIST") {
      navigate("/");
      localStorage.clear();
    }
  }, []);


  const handleAbhaIdCreation = () => {
    // Navigate to the Abha ID Creation page
    navigate('/abhaCreation');
  };

  const handleAbhaIdVerification = () => {
    // Navigate to the Abha ID Verification page
    navigate('/abhaVerification');
  };

  const handleDoctorsAppointment = () => {
    // Navigate to the Doctor's Appointment page
    navigate('/doctorAppointment');
  };

  return (
    <div>
      <div className="h-full flex justify-center items-center mt-20">
        <div className='flex justify-evenly items-center gap-40 mt-20 border-amber-300 border-solid '>
          <div className='border border-gray p-5 rounded-md bg-slate-200'>
            <img src={receptionist} className="w-64 h-64" alt="Receptionist"></img>
          </div>
          <div className='flex flex-col gap-5 '>
            <button type="button" onClick={handleAbhaIdCreation} className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">ABHA ID CREATION</button>
            <button type="button" onClick={handleAbhaIdVerification} className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">ABHA ID VERIFICATION</button>
            <button type="button" onClick={handleDoctorsAppointment} className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">DOCTOR'S APPOINTMENT</button>
          </div>
        </div>
      </div>
    </div>
  );
}
