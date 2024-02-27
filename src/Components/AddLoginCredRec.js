

import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";

const AddLoginCredRec = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "receptionist",
    status: true,
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      console.log("Form Data:", formData);
  
      const response = await axios.post('http://localhost:9191/staff/addLogin',
        formData
      );
      console.log("Response from addLogin backend:", response.data);
  
      onSuccess(formData.email);
  
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div className="flex">
            <div>------------------------</div>
            <h2> Enter Login Credentials </h2>
            <div>------------------------</div>
          </div>
          <form style={{ width: "50%", marginTop: "2rem" }} onSubmit={handleSubmit}>
            <div style={{ marginBottom: "1rem", width: "100%" }}>
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                size="small"
                onChange={handleChange}
                fullWidth
              />
            </div>
            <div style={{ marginBottom: "1rem", width: "100%" }}>
              <TextField
                id="password"
                label="Password"
                variant="outlined"
                size="small"
                type="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
              />
            </div>
            <button type="submit" className="w-full text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              Submit
            </button>
          </form>
        </div>
      );
};

export default AddLoginCredRec;