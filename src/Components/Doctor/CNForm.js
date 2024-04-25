import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { PatientHistoryPopup } from "./PatientHistoryPopup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import toast from "react-hot-toast";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";



import { Button, Modal, TextField, Select, MenuItem } from "@material-ui/core";

const purposes = [
  { code: "CAREMGT", display: "Care Management" },
  { code: "BTG", display: "Break the Glass" },
  { code: "PUBHLTH", display: "Public Health" },
  { code: "HPAYMT", display: "Healthcare Payment" },
  { code: "DSRCH", display: "Disease Specific Healthcare Research" },
  { code: "PATRQT", display: "Self Requested" }
];

const CNForm = ({ patientId, doctorId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [appToken, setAppToken] = useState(null);
  const [patientHistory, setPatientHistory] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const [medicine, setMedicine] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");
  const [duration, setDuration] = useState("");
  const [patientDetails, setPatientDetails] = useState({
    name: "",
    age: "",
  });

  const [formData, setFormData] = useState({

    bloodPressure: "",
    oxygenLevel: "",
    pulse: "",
    symptoms: "",
    diagnosis: "",
    // weight: "",
    prescriptions: [],
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    if (location.state && location.state.appToken) {
      setAppToken(location.state.appToken);
    }
  }, [location.state, navigate]);

  useEffect(() => {
    if (appToken) {
      fetchPatientHistory(appToken);
      fetchPatientDetails(appToken);
    }
  }, [appToken]);

  const fetchPatientHistory = async (appToken) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(
        `http://localhost:9191/doctor/history/${appToken}`,
        { headers: headers }
      );
      setPatientHistory(response.data);
    } catch (error) {
      console.error("Error fetching patient history:", error.message);
    }
  };

  const fetchPatientDetails = async (appToken) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.post(
        `http://localhost:9191/doctor/patientDetailByAppointmentNo`,
        { tokenNo: appToken },
        { headers: headers }
      );
      // Extract year, month, and day from the date of birth
      const dobParts = response.data.dob.split("-");
      const dobYear = parseInt(dobParts[0]);
      const dobMonth = parseInt(dobParts[1]) - 1; // Months are zero-based (0-11)
      const dobDay = parseInt(dobParts[2]);
      // Create a Date object for the date of birth
      const dob = new Date(dobYear, dobMonth, dobDay);
      // Calculate the age
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < dob.getDate())
      ) {
        age--; // Subtract 1 if birthday hasn't occurred yet this year
      }
      // Set patient details with name and calculated age
      console.log(response.data);
      setPatientDetails({
        name: response.data.name,
        age: age,
        abhaId: response.data.abhaId,
      });
    } catch (error) {
      console.error("Error fetching patient details:", error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      try {
        if (!appToken) {
          toast.error("Appointment token not found");
          return;
        }


        console.log("abha id:", patientDetails.abhaId);
        console.log("Form data:", formData);
        const response = await axios.post(
          `http://localhost:9191/doctor/addPatientRecord/${appToken}`,
          formData,
          { headers: headers }
        );

        if (response.status !== 200) {
          toast.error("Failed to submit consultation form");
          throw new Error("Failed to submit consultation form");
        } else {
          toast.success("Consultation form submitted successfully");
        }
      } catch (error) {
        toast.error("Error submitting consultation form");
        return;
      }

      try {
        if (checked) {
          const pushCareContextResponse = await axios.post(
            "http://localhost:9191/doctor/pushCareContext",
            { abhaId: patientDetails.abhaId },
            { headers: headers }
          );
          console.log("abha id:", patientDetails.abhaId);
          // Handle success response if needed
          console.log("Push Care Context API response:", pushCareContextResponse.data);
        }


      } catch (error) {
        toast.error("Error pushing care context");
      }
    }
    catch (error) {
      toast.error("Error submitting consultation form");
    }
    finally {
      setTimeout(() => {
        navigate("/doctor/view-appointments");
      }, 2000);
    }

  };




  //   const handleSubmit = async (event) => {
  //     event.preventDefault();
  //     try {
  //       if (!appToken) {
  //         toast.error("Appointment token not found");
  //         return;
  //       }

  //       const token = localStorage.getItem("token");
  //       const headers = {
  //         Authorization: `Bearer ${token}`,
  //       };
  //       console.log("abha id:", patientDetails.abhaId);
  //       console.log("Form data:", formData);
  //       const response = await axios.post(
  //         `http://localhost:9191/doctor/addPatientRecord/${appToken}`,
  //         formData,
  //         { headers: headers }
  //       );

  //       if (response.status !== 200) {
  //         toast.error("Failed to submit consultation form");
  //         throw new Error("Failed to submit consultation form");
  //       } else {
  //         toast.success("Consultation form submitted successfully");
  //       }
  //     }
  //     catch (error) {
  //       toast.error("Error submitting consultation form due to care context failure!!");
  //     }
  //     try {
  //       // If the checkbox is checked, hit the pushCareContext API
  //       if (checked) {
  //         const pushCareContextResponse = await axios.post(
  //           "http://localhost:9191/doctor/pushCareContext",
  //           { abhaId: patientDetails.abhaId },
  //           { headers: headers }
  //         );
  //         console.log("abha id:", patientDetails.abhaId);
  //         // Handle success response if needed
  //         console.log("Push Care Context API response:", pushCareContextResponse.data);
  //       }

  //       setTimeout(() => {
  //         navigate("/doctor/view-appointments");
  //       }, 2000);
  //     }
  //     } catch (error) {
  //     toast.error("Error submitting consultation form due to care context failure!!");
  //   }
  // };



  const handleprescriptionSubmit = () => {
    const prescriptions = {
      medicine,
      dosage,
      frequency,
      duration: parseInt(duration),
    };

    setFormData({
      ...formData,
      prescriptions: [...formData.prescriptions, prescriptions],
    });

    toast.success("Prescription added successfully");
  };

  const [checked, setChecked] = useState(false);

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };















  // const [modalShow, setModalShow] = useState(false);
  const [selectedPurpose, setSelectedPurpose] = useState("");

  const handlePurposeChange = (event) => {
    setSelectedPurpose(event.target.value);
  };

  // const handleprescriptionSubmit = () => {
  //   // Add your submission logic here
  // };






  return (
    <div>
      <div className="mt-5 text-5xl">PATIENT CONSULTATION FORM</div>
      <div className="flex justify-center items-center mt-20 pt-10">
        <div
          className="glass-background cnform"
          style={{ height: "auto", marginBottom: "2rem" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingTop: "2rem",
              width: "100%",
              overflowY: "auto",
            }}
          >
            <div className="flex pl-20 pr-20" style={{ width: "100%" }}>
              <label
                className="fw-bold text-center mb-4"
                style={{ width: "100%" }}
              >
                <div className="flex justify-between" style={{ width: "100%" }}>
                  <div className="font-sans font-thin">Patient Name: {patientDetails.name}</div>
                  <div className="font-sans font-thin">Age: {patientDetails.age}</div>
                </div>
              </label>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="flex pl-20 pr-20">
                <TextField
                  id="symptoms"
                  label="Symptoms"
                  variant="outlined"
                  size="medium"
                  style={{ marginBottom: "1rem", width: "100%" }}
                  value={formData.symptoms}
                  onChange={handleChange}
                />
              </div>
              <div className="flex gap-5 pl-20  pr-20">
                <TextField
                  id="bloodPressure"
                  label="Blood Pressure"
                  variant="outlined"
                  size="medium"
                  style={{ marginBottom: "1rem", width: "100%" }}
                  value={formData.bloodPressure}
                  onChange={handleChange}
                />
                <TextField
                  id="oxygenLevel"
                  label="Oxygen Level"
                  variant="outlined"
                  size="medium"
                  style={{ marginBottom: "1rem", width: "100%" }}
                  value={formData.oxygenLevel}
                  onChange={handleChange}
                />
              </div>
              <div className="flex gap-5 pl-20 pr-20">
                <TextField
                  id="pulse"
                  label="Pulse"
                  variant="outlined"
                  size="medium"
                  style={{ marginBottom: "1rem", width: "100%" }}
                  value={formData.pulse}
                  onChange={handleChange}
                />
                {/* <TextField
                  id="weight"
                  label="Weight"
                  variant="outlined"
                  size="medium"
                  style={{ marginBottom: "1rem", width: "100%" }}
                  value={formData.weight}
                  onChange={handleChange}
                /> */}
                <FormControlLabel
                  control={
                    <Checkbox checked={checked} onChange={handleCheck} />
                  }
                  label={
                    <Typography style={{ fontSize: "22px" }}>
                      Push Care Context
                    </Typography>
                  }
                  style={{ marginBottom: "1rem", width: "100%" }}
                />
              </div>
              <div className="flex pl-20 gap-5 pr-20">
                <TextField
                  id="diagnosis"
                  label="Diagnosis"
                  variant="outlined"
                  size="medium"
                  style={{ marginBottom: "1rem", width: "100%" }}
                  value={formData.diagnosis}
                  onChange={handleChange}
                />

              </div>
              <div className="mt-2 flex justify-end pl-20 gap-5 pr-20">
                <Button
                  className="button "
                  style={{
                    marginTop: "2rem",
                    width: "100%",
                    height: "10%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                  }}
                  onClick={() => {
                    setModalShow(true);
                  }}
                >
                  {"Add Prescription"}
                </Button>

                <Modal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                      Add Prescription
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <TextField
                      type="text"
                      label="Medicine"
                      value={medicine}
                      onChange={(e) => setMedicine(e.target.value)}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                    />
                    <TextField
                      type="text"
                      label="Dosage"
                      value={dosage}
                      onChange={(e) => setDosage(e.target.value)}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                    />
                    <TextField
                      type="text"
                      label="Frequency"
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value)}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                    />
                    <TextField
                      type="number"
                      label="Duration (in days)"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                    />
                    <button
                      className="btn btn-primary"
                      onClick={handleprescriptionSubmit}
                    >
                      Add Prescription
                    </button>
                  </Modal.Body>
                </Modal>

                <button
                  type="submit"
                  className="button"
                  style={{
                    marginTop: "2rem",
                    width: "100%",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                  }}
                // onClick={handleRequestConsent}
                >
                  Submit
                </button>
              </div>{" "}
            </form>

            <div className="mt-2 flex justify-end pl-20 gap-5 pr-20 mb-8">
              {/* <PatientHistoryPopup
                type="button"
                className="button"
                title="Patient History"
                onClose={() => setShowPopup(false)}
                patientHistory={patientHistory}
                style={{
                  marginTop: "1rem",
                  width: "100%",
                  paddingTop: "30px",
                  paddingBottom: "30px",
                }}
              /> */}
              <PatientHistoryPopup
                type="button"
                className="button"
                title="Patient History"
                onClose={() => setShowPopup(false)}
                patientHistory={patientHistory}
                style={{
                  marginTop: "1rem",
                  width: "100%",
                  paddingTop: "30px",
                  paddingBottom: "30px",
                  // Increase padding to make the button thicker
                  padding: "15px 20px", // Adjust the values as needed
                }}
              />
{/* 
                <Button
                  className="button "
                  style={{
                    marginTop: "2rem",
                    width: "100%",
                    height: "10%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                  }}
                  onClick={() => {
                    setModalShow(true);
                  }}
                >
                  {"Request Consent"}
                </Button>

                <Modal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Request Consent
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <TextField
                      type="text"
                      label="Purpose"
                      value={medicine}
                      onChange={(e) => setMedicine(e.target.value)}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                    />
                    <TextField
                      type="text"
                      label="Patient Abha ID"
                      value={dosage}
                      onChange={(e) => setDosage(e.target.value)}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                    />
                    <TextField
                      type="text"
                      label="HI Types"
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value)}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                    />
                    <TextField
                      type="date"
                      label="From"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              max: "2000-12-31",
              min: "1900-01-01",
            }}
                    />
                    <TextField
                      type="date"
                      label="To"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              max: "2000-12-31",
              min: "1900-01-01",
            }}
                    />
                    <TextField
                      type="date"
                      label="Data Erase At"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
              shrink: true,
            }}
                      inputProps={{
              max: "2000-12-31",
              min: "1900-01-01",
            }}
                    />
                    <button
                      className="btn btn-primary"
                      onClick={handleprescriptionSubmit}
                    >
                      Request Consent
                    </button>
                  </Modal.Body>
                </Modal> */}


                <Button
        className="button "
        style={{
          marginTop: "2rem",
          width: "100%",
          height: "10%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "10px",
          paddingBottom: "10px",
        }}
        onClick={() => {
          setModalShow(true);
        }}
      >
        {"Request Consent"}
      </Button>

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Request Consent
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Select
            value={selectedPurpose}
            onChange={handlePurposeChange}
            fullWidth
            margin="normal"
            variant="outlined"
            displayEmpty
          >
            <MenuItem value="" disabled>
              Select Purpose
            </MenuItem>
            {purposes.map((purpose) => (
              <MenuItem key={purpose.code} value={purpose.code}>
                {purpose.display}
              </MenuItem>
            ))}
          </Select>
          <TextField
            type="text"
            label="Patient Abha ID"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            type="text"
            label="HI Types"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            type="date"
            label="From"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              max: "2000-12-31",
              min: "1900-01-01",
            }}
          />
          <TextField
            type="date"
            label="To"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              max: "2000-12-31",
              min: "1900-01-01",
            }}
          />
          <TextField
            type="date"
            label="Data Erase At"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              max: "2000-12-31",
              min: "1900-01-01",
            }}
          />
          <button
            className="btn btn-primary"
            onClick={handleprescriptionSubmit}
          >
            Request Consent
          </button>
        </Modal.Body>
      </Modal>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CNForm;
