
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios'; // Import axios for making HTTP requests
import TextField from "@mui/material/TextField";
// import admin from "../assets/AdminPage.jpg";
import receptionistImage from '../assets/ReceptionistPage.png';


export const AdminChangeReceptionistPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const staff = location.state?.staff; // Using optional chaining to handle null value
  const email = staff?.email
  // const [email, setEmail] = useState(""); // State for email input field
  const [newPassword, setNewPassword] = useState(""); // State for new password input field
  const [error, setError] = useState(null); // State to store error message
  const [success, setSuccess] = useState(false); // State to indicate successful password change



//   // const [formData, setFormData] = useState({
//   //   email: email,
//   //   newpassword: newPassword
//   // });

useEffect(() => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  if (!token) {
    // Redirect to login page if token doesn't exist
    navigate("/");
  }
  if (role !== "ADMIN") {
    navigate("/");
    localStorage.clear();
  }
}, []);


  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData = { 
        email: email,
        newPassword: newPassword
       };
       console.log('formdata', formData);
      // Send email and new password to backend
      const response = await axios.post(
        "http://localhost:9191/receptionist/changePassword",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuccess(true); // Set success state to true upon successful password change
      // Clear form fields
      // setEmail("");
      // setNewPassword("");
    } catch (error) {
      setError(error.response.data.message); // Set error state if password change fails
    }
  };

  return (
    <div>
      <div className="flex flex-wrap justify-center items-center">
        <div className="flex justify-center items-center">
          <div className="image-container">
            <img src={receptionistImage} className="admin-image" />
            <div className="dashboard-name-receptionist" style={{ fontSize: "xx-large" }}>
              CHANGE PASSWORD
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center mt-20 pt-10">
          <div className="container glass-background login-cred">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: "2rem",
              }}
            >
              <div className="flex">
                <label className="text-login fw-bold text-center ">
                  CHANGE <br></br> PASSWORD <br></br> <br></br>
                </label>
              </div>
              <form onSubmit={handleChangePassword}>
                <div>
                  {/* <label htmlFor="newPassword">New P</label> */}
                  <TextField
                    type="password"
                    id="newPassword"
                    label="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)} // Update new password state on change
                  />
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}{" "}
                {/* Display error message if present */}
                {success && (
                  <p style={{ color: "green" }}>
                    Password changed successfully!
                  </p>
                )}{" "}
                {/* Display success message if password change is successful */}
                <button
                  type="submit"
                  className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              style={{marginTop: '2rem', width: "100%", height: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                >
                  Change Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};




















// <h1>Change Password</h1>
//       <form onSubmit={handleChangePassword}>
//         {/* <div>
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)} // Update email state on change
//           />
//         </div> */}
//         <div>
//           <label htmlFor="newPassword">New Password:</label>
//           <input
//             type="password"
//             id="newPassword"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)} // Update new password state on change
//           />
//         </div>
//         {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message if present */}
//         {success && <p style={{ color: "green" }}>Password changed successfully!</p>} {/* Display success message if password change is successful */}
//         <button type="submit">Change Password</button>
//       </form>










// // import React, { useState } from "react";
// // import axios from "axios";

// // export const AdminPasswordChange = () => {
// //   const [oldPassword, setOldPassword] = useState("");
// //   const [newPassword, setNewPassword] = useState("");
// //   const [error, setError] = useState(null);
// //   const [success, setSuccess] = useState(false);

// //   const handleChangePassword = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const token = localStorage.getItem("token");
// //       const response = await axios.post(
// //         "http://localhost:9191/admin/changePassword",
// //         {
// //           oldPassword: oldPassword,
// //           newPassword: newPassword,
// //         },
// //         {
// //           headers: { Authorization: `Bearer ${token}` },
// //         }
// //       );
// //       setSuccess(true);
// //       // Clear form fields
// //       setOldPassword("");
// //       setNewPassword("");
// //     } catch (error) {
// //       setError(error.response.data.message);
// //     }
// //   };

// //   return (
// //     <div>
// //       <h1>Change Password</h1>
// //       <form onSubmit={handleChangePassword}>
// //         <div>
// //           <label htmlFor="oldPassword">Old Password:</label>
// //           <input
// //             type="password"
// //             id="oldPassword"
// //             value={oldPassword}
// //             onChange={(e) => setOldPassword(e.target.value)}
// //           />
// //         </div>
// //         <div>
// //           <label htmlFor="newPassword">New Password:</label>
// //           <input
// //             type="password"
// //             id="newPassword"
// //             value={newPassword}
// //             onChange={(e) => setNewPassword(e.target.value)}
// //           />
// //         </div>
// //         {error && <p style={{ color: "red" }}>{error}</p>}
// //         {success && <p style={{ color: "green" }}>Password changed successfully!</p>}
// //         <button type="submit">Change Password</button>
// //       </form>
// //     </div>
// //   );
// // };





// import React from 'react'

// export const AdminChangeReceptionistPassword = () => {
//   return (
//     <div>AdminChangeReceptionistPassword</div>
//   )
// }
