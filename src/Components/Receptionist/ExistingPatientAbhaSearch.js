import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TextField from "@mui/material/TextField";
import patientImage from '../../assets/PatientPage.png';
import toast from 'react-hot-toast';

export const ExistingPatientAbhaSearch = () => {
  const [abhaId, setAbhaId] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const formData = { abhaId };
      axios.defaults.withCredentials = true;
      const response = await axios.post("http://localhost:9191/receptionist/patientDetails", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Response:', response.data);
      const patientDetails = {
        abhaId: response.data.abhaId,
        address: response.data.address,
        bloodGroup: response.data.bloodGroup,
        dob: response.data.dob,
        gender: response.data.gender,
        mobileNo: response.data.mobileNo,
        name: response.data.name
      };
      navigate('/receptionist/existing-patient-details', { state: { patientDetails } });
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error searching for patient');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex justify-center items-center">
      <div className="flex admin-dashboard justify-evenly items-center border-amber-300 border-solid">
        <div className="image-container">
          <img src={patientImage} className="admin-image" alt='patientImage' />
          <div className="dashboard-name-patient">ABHA SEARCH</div>
        </div>
        <div className="container glass-background mt-5">
          <form onSubmit={handleSubmit}>
            <label className="text-login fw-bold text-center">
              Enter <br /> Abha Address
            </label>
            <TextField
              id="abhaid"
              label="Abha Address"
              value={abhaId}
              style={{ marginBottom: "2rem", width: "50%" }}
              onChange={(e) => setAbhaId(e.target.value)}
              required
            />
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                <div className="loader"></div>
              </div>
            ) : (
              <button
                type="submit"
                className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                style={{ marginTop: '2rem', width: "50%", height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                Search
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};