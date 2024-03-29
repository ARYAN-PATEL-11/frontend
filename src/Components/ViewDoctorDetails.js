import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
// import { route } from "react-router-dom";
import { useLocation } from "react-router-dom";



export const ViewDoctorDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [role, setRole] = useState('');
  // console.log("Location", location.state.doctor);

  const handleUpdateDetails = () => {
    // Navigate to the update details page
    navigate('/admin/admin-doctor-details-update', { state: { doctor: doctorDetails } });
  };

  const handleChangePassword = () => {
    // Navigate to the change password page
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
        status: true // Assuming response.data.status contains the updated status
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
        status: false // Assuming response.data.status contains the updated status
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
      // Handle the case where doctor details are not available
      navigate('/error'); // Redirect to error page or handle accordingly
    }
    // console.log("doctorDetails",doctorDetails);
  }, [location.state, navigate]);
  console.log("doctorDetails", doctorDetails);
 

  return (
    <div className="container glass-background mt-5">
      <label className="text-login fw-bold text-center">
        DOCTOR DETAILS
      </label>
      {doctorDetails && (
        <div>
          <p className="mb-2">Doctor Id: {doctorDetails.doctorId}</p>
          <p className="mb-2">Name: {doctorDetails.name}</p>
          <p className="mb-2">Date of Birth: {new Date(doctorDetails.dob).toLocaleDateString()}</p>
          <p className="mb-2">Mobile No: {doctorDetails.mobileNo}</p>
          <p className="mb-2">Gender: {doctorDetails.gender}</p>
          <p className="mb-2">Abha ID: {doctorDetails.abhaId}</p>
          <p className="mb-2">Speciality: {doctorDetails.speciality}</p>
          <p className="mb-2">Experience: {doctorDetails.experience} years</p>
          <p className="mb-2">Email: {doctorDetails.email}</p>
          <p className="mb-2">Status: {doctorDetails.status ? 'Active' : 'Inactive'}</p>
          <br />
          <div className="mt-3">
            {/* Add buttons with respective functionalities */}
            <button className="btn btn-primary me-2" onClick={handleUpdateDetails}>Update Details</button>
            <button className="btn btn-primary me-2" onClick={handleChangePassword}>Change Password</button>
            
            <div className="mt-3">
              {/* Add buttons with respective functionalities */}
              {console.log("Role:", role)}
              {console.log("Doctor Details:", doctorDetails)}
              {role === 'DOCTOR' ? null : (
                <>
                  {doctorDetails.status === true ? (
                    <button className="btn btn-danger me-2" onClick={() => handleDeactivateDoctor(doctorDetails.email)}>Deactivate</button>
                  ) : (
                    <button className="btn btn-success me-2" onClick={() => handleActivateDoctor(doctorDetails.email)}>Activate</button>
                  )}
                </>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );











};
