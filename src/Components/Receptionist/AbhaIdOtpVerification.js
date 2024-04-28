import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import patientImage from "../../assets/PatientPage.png";
import { Progressbar } from "./Progressbar";
import { toast } from "react-hot-toast";

export const AbhaIdOtpVerification = () => {
  const [abdmOtp, setAbdmOtp] = useState("");
  // const [transactionId, setTransactionId] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [patientInfo, setPatientInfo] = useState({
    name: "",
    mobileNo: "",
    dob: "",
    gender: "",
    bloodGroup: "", // You may fetch this information if available
    address: "", //patientData.abhaAddress, // Assuming this is the patient's address
    abhaId: "", //patientData.abhaNumber
  });

 
  const fetchTransactionId = async () => {
    try {
      // Implement the logic to fetch the transaction ID here
      // For example:
      axios.defaults.withCredentials = true;
      const response = await axios.get(
        "http://localhost:9191/getTransactionId"
      );
      // Extract transaction ID from the response
      const transId = response.data.transactionId;
      // console.log("Transaction ID:", transactionId);
      return transId; // Return the transaction ID
    } catch (error) {
      console.error("Error fetching transaction ID:", error);
      throw error; // Throw the error to be caught by the caller
    }
  };

  const fetchPatientData = async () => {
    try {
      const abhaAdd = localStorage.getItem("abhaAddress");
      const token = localStorage.getItem("token");
      const formData = {
        abhaId: abhaAdd,
      };
      // let patientData = "";
      // console.log("Form Data in add Patient form:", formData);
      axios.defaults.withCredentials = true;
      // setTimeout(async () => {
      const response = await axios.post(
        "http://localhost:9191/receptionist/patientDetails",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const patientData = response.data;
      // console.log("Patient Data:", patientData);

      return patientData;
      // console.log(patientData);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    } finally {
      // console.log("Patient Info:", patientInfo);
      // setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!abdmOtp.trim()) {
      toast.error("Abha Address field is empty");
      setLoading(false);
      return;
    }
    try {
      const token = localStorage.getItem("token");
      let transactionIdAttempt = 0;
      let transactionId = "";

      // Retry logic to fetch transaction ID
      while (transactionId === "" && transactionIdAttempt < 5) {
        // You can adjust the number of attempts as needed
        try {
          // Attempt to fetch transaction ID
          transactionId = await fetchTransactionId();
        } catch (error) {
          console.error("Error fetching transaction ID:", error);
        }
        // Increase attempt count
        transactionIdAttempt++;
        // Delay before next attempt (5000 milliseconds = 5 seconds)
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }

      // If transaction ID is still empty after retries, display error
      if (transactionId === "") {
        setLoading(false);
        toast.error("Unable to fetch transaction ID after multiple attempts.");
        throw new Error(
          "Unable to fetch transaction ID after multiple attempts."
        );
      }

      // Proceed with form submission
      const formData = {
        txnId: transactionId,
        otp: abdmOtp,
      };
      // setTransactionId(transactionId);
      console.log("FormData:", formData);
      axios.defaults.withCredentials = true;
      const response = await axios.post(
        "http://localhost:9191/receptionist/verificationAbhaAddressOtp",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Response:", response.data);
      // navigate('/receptionist/add-patient');
    } catch (error) {
      toast.error("Invalid OTP, Please try again!");
      console.error("Error:", error);
      return;
    } finally {
      setLoading(false);
    }

    // fetchPatientData();
    try {
      // const token = localStorage.getItem("token");
      let fetchPatientAttempt = 0;
      let response = "";

      while (response === "" && fetchPatientAttempt < 5) {
        try {
          // Attempt to fetch transaction ID
          response = await fetchPatientData();
          // console.log("Response:", response);
        } catch (error) {
          console.error("Error fetching patient details:", error);
        }
        fetchPatientAttempt++;
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }

      // If transaction ID is still empty after retries, display error
      if (response === "") {
        setLoading(false);
        toast.error("Unable to fetch patient data after multiple attempts.");
        throw new Error(
          "Unable to fetch patient data after multiple attempts."
        );
      } 
      // else if(transactionId === "") {
      //   setLoading(false);
      //   toast.error("Unable to fetch transaction ID after multiple attempts.");
      //   throw new Error(
      //     "Unable to fetch transaction ID after multiple attempts."
      //   );
      // }
      else {
        navigate("/receptionist/add-patient", {
          state: { patientInfo: response },
        });
      }
    } catch (error) {
      console.error("Error Submitting:", error);
    }
  };

  return (
    <div>
      <Progressbar step={2} />
      <div className="h-full flex justify-center items-center progPageMargin">
        <div className="flex admin-dashboard justify-evenly items-center  border-amber-300 border-solid ">
          <div className="image-container">
            <img src={patientImage} className="admin-image" alt="patientImage" />
            <div className="dashboard-name-patient">ABHA VRIFICATION</div>
          </div>
          <div className="container glass-background mt-5">
            <label className="text-login fw-bold text-center">
              Enter <br /> OTP
            </label>
            <TextField
              id="abdmOtp"
              label="Abdm Otp"
              value={abdmOtp}
              onChange={(e) => setAbdmOtp(e.target.value)}
              required
              style={{ marginBottom: "2rem", width: "50%" }}
            />
            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "1rem",
                }}
              >
                <div className="loader"></div>
              </div>
            ) : (
              <button
                type="submit"
                className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                style={{
                  marginTop: "2rem",
                  width: "50%",
                  height: "10%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onClick={handleSubmit}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
