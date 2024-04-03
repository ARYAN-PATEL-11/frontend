import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import doctorImage from "../../assets/DoctorPage.png";

export const ViewDoctorDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [doctorDetails, setDoctorDetails] = useState('');
  const [role, setRole] = useState('');

  const handleUpdateDetails = () => {
    navigate('/admin/admin-doctor-details-update', { state: { doctor: doctorDetails } });
  };

  const handleChangePassword = () => {
    navigate('/admin/admin-doctor-password-change', { state: { doctor: doctorDetails } });
  };

  const handleActivateDoctor = async (email) => {
    try {
      if (!doctorDetails || !doctorDetails.email) {
        console.error("Doctor details or email not available.");
        return;
      }
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const formData = { email: email };
      const response = await axios.post(
        `http://localhost:9191/admin/activateStaff`,
        formData,
        { headers: headers }
      );

      setDoctorDetails(prevDoctorDetails => ({
        ...prevDoctorDetails,
        status: true
      }));
    } catch (error) {
      console.error("Error activating doctor:", error);
    }
  };


  const handleDeactivateDoctor = async (email) => {
    try {
      if (!doctorDetails || !doctorDetails.email) {
        console.error("Doctor details or email not available.");
        return;
      }

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const formData = { email: email };
      const response = await axios.post(
        `http://localhost:9191/admin/deActivateStaff`,
        formData,
        { headers: headers }
      );

      setDoctorDetails(prevDoctorDetails => ({
        ...prevDoctorDetails,
        status: false
      }));
    }
    catch (error) {
      console.error("Error deactivating doctor:", error);
    }
  };






  useEffect(() => {
    const token = localStorage.getItem("token");
    setRole(localStorage.getItem("role"));
    if (!token) {
      navigate("/");
    }
    if (role === "Receptionist") {
      navigate("/");
      localStorage.clear();
    }

    if (location.state && location.state.doctor) {
      setDoctorDetails(location.state.doctor);
    } else {
      navigate('/error');
    }
    // console.log("doctorDetails",doctorDetails);
  }, [location.state, navigate]);
  console.log("doctorDetails", doctorDetails);

  const determineFontSize = () => {
    if (doctorDetails.name && doctorDetails.name.length > 14) {
      return '2rem';
    }
    return '3rem';
  };

  return (
    <div className="h-full flex justify-center items-center ">
      <div className="flex admin-dashboard justify-evenly items-center  border-amber-300 border-solid ">
        <div className="image-container">
          <img src={doctorImage} className="admin-image" />
          <div className="dashboard-name-doctor" style={{ fontSize: determineFontSize() }}>{doctorDetails.name}</div>
        </div>
        <div className="container glass-background mt-5">
          <label className="text-login fw-bold text-center">
            Profile Details
          </label>
          {doctorDetails && (
            <div className="flex flex-col text-2xl">
              <p className="mb-2 font-bold">Name:<span className="font-normal"> {doctorDetails.name}</span></p>
              <p className="mb-2 font-bold">Date of Birth: <span className="font-normal">{new Date(doctorDetails.dob).toLocaleDateString()}</span></p>
              <p className="mb-2 font-bold">Mobile No: <span className="font-normal">{doctorDetails.mobileNo}</span></p>
              <p className="mb-2 font-bold">Gender: <span className="font-normal">{doctorDetails.gender}</span></p>
              <p className="mb-2 font-bold">Email: <span className="font-normal">{doctorDetails.email}</span></p>
              <p className="mb-2 font-bold">Status: {doctorDetails.status ? 'Active' : 'Inactive'}</p>
              <br />
              <div className="mt-3">
                <button
                  type="submit"
                  className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  style={{ marginTop: '2rem', width: "100%", height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  onClick={handleUpdateDetails}>Update Details</button>
                <button
                  type="submit"
                  className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  style={{ marginTop: '2rem', width: "100%", height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  onClick={handleChangePassword}>Change Password</button>
                {role !== 'DOCTOR' && (
                  <>
                    {doctorDetails.status === true ? (
                      <button
                        type="submit"
                        className="button text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        style={{ marginTop: '2rem', width: "100%", height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}

                        onClick={() => handleDeactivateDoctor(doctorDetails.email)}>Deactivate</button>
                    ) : (
                      <button
                        type="submit"
                        className="button text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        style={{ marginTop: '2rem', width: "100%", height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        onClick={() => handleActivateDoctor(doctorDetails.email)}>Activate</button>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );











};