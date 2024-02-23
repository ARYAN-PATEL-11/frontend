  import React, {useState} from 'react'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';

export const ASForm = () => {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    role: '', // Add role to formData state
    address: '',
    dob: '',
    phone: ''
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };


  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
  
    try {
      // Log formData before sending it to the backend
      console.log('Form Data:', formData);
  
      // Send formData to the backend
      const response = await axios.post('/api/add-staff', formData);
      console.log('Response from backend:', response.data);
      // Optionally handle success response
    } catch (error) {
      console.error('Error:', error);
      // Optionally handle error
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className='flex'>
        <div>------------------------</div>
        <h2 > ENTER DETAILS </h2>
        <div>------------------------</div>
      </div>
      <form style={{ width: '50%', marginTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <TextField
            id="first-name"
            label="First name"
            variant="outlined"
            size="small"
            style={{ marginBottom: '2rem', width: '48%' }}
            onChange={handleChange}
          />
          <TextField
            id="last-name"
            label="Last name"
            variant="outlined"
            size="small"
            style={{ marginBottom: '2rem', width: '48%' }}
            onChange={handleChange}
          />
        </div>
        <TextField
          id="gender"
          select
          label="Gender"
          variant="outlined"
          size="small"
          style={{ marginBottom: '2rem', width: '100%' }}
          onChange={handleChange}
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </TextField>
        <TextField
          id="role"
          select
          label="Role"
          variant="outlined"
          size="small"
          style={{ marginBottom: '2rem', width: '100%' }}
          onChange={handleChange} // Move onChange handler here
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="receptionist">Receptionist</MenuItem>
          <MenuItem value="labTechnician">Lab Technician</MenuItem>
        </TextField>
        <TextField
          id="address"
          label="Address"
          variant="outlined"
          size="small"
          style={{ marginBottom: '2rem', width: '100%' }}
          onChange={handleChange}
        />
        <TextField
          id="dob"
          label="Date of Birth"
          variant="outlined"
          size="small"
          style={{ marginBottom: '2rem', width: '100%' }}
          onChange={handleChange}
        />
        <TextField
          id="phone"
          label="Phone"
          variant="outlined"
          size="small"
          style={{ marginBottom: '2rem', width: '100%' }}
          onChange={handleChange}
        />
        <button type="button" onClick={handleSubmit} className="w-full text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Register</button>
      </form>
    </div>
  );
}