import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { useNavigate } from "react-router-dom";

export const AAForm = ({ email }) => {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    mobileNo: "",
    email: email,
    role: "ADMIN",
  });

  const handleTextFieldChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleChangeGender = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      // Log formData before sending it to the backend
      console.log("Form Data:", formData);

      const response = await axios.post(
        "http://localhost:9191/admin/addAdmin",
        formData,
        { headers: headers }
      );
      console.log("Response from backend:", response.data);
      alert("Doctor added successfully");
      navigate("/admin");
      // Optionally handle success response
    } catch (error) {
      console.error("Error:", error);
      // Optionally handle error
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: '2rem' }}
    >
      <div className="flex">
      <label className="text-login fw-bold text-center ">
          ADD ADMIN <br></br> DETAILS
        </label>
      </div>
      <form style={{ width: "80%", marginTop: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            size="medium"
            style={{ marginBottom: "2rem", width: "100%" }}
            onChange={handleTextFieldChange}
          />
        </div>

        <FormControl fullWidth>
          <InputLabel>Gender</InputLabel>
          <Select
            value={formData.gender}
            name="gender"
            labelId="gender-label"
            id="gender"
            label="Gender"
            size="medium"
            style={{ marginBottom: "2rem", width: "100%" }}
            onChange={handleChangeGender}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>

        <TextField
          id="dob"
          label="Date of Birth"
          type="date"
          variant="outlined"
          size="medium"
          style={{ marginBottom: "2rem", width: "100%" }}
          value={formData.dob}
          onChange={handleTextFieldChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="mobileNo"
          label="MobileNo"
          variant="outlined"
          size="medium"
          style={{ marginBottom: "2rem", width: "100%" }}
          onChange={handleTextFieldChange}
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="button w-full text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          style={{marginBottom: '-100px', marginTop: '1rem', width: "100%", height: '12%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
        >
          Register
        </button>
      </form>
    </div>
  );
};
