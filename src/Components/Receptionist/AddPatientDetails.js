  // import React, { useState } from 'react';
  // import axios from 'axios';
  // import { useLocation, useNavigate } from 'react-router-dom';
  // import TextField from "@mui/material/TextField";
  // import patientImage from '../../assets/PatientPage.png';
  // import toast from 'react-hot-toast';

  // export const AddPatientDetails = () => {
  //     const location = useLocation();
  //     const navigate = useNavigate();
  //     const [loading, setLoading] = useState(false);
    
  //     const defaultValue = location.state;
  //     console.log('Location State:', defaultValue);
    
  //     const [formData, setFormData] = useState({
  //       name: `${defaultValue.firstName} ${defaultValue.lastName}`,
  //       mobileNo: defaultValue.mobile,
  //       dob: `${defaultValue.yearOfBirth}-${defaultValue.monthOfBirth}-${defaultValue.dayOfBirth}`,
  //       gender: defaultValue.gender,
  //       bloodGroup: "",
  //       address: "",
  //       abhaId: defaultValue.healthIdNumber
  //     });
    
  //     const handleChange = (e) => {
  //       const { name, value } = e.target;
  //       setFormData({ ...formData, [name]: value });
  //     };
    
  //     const handleSubmit = async (e) => {
  //       e.preventDefault();
  //       setLoading(true);
  //       try {
  //         const token = localStorage.getItem("token");
  //         console.log("Formdata", formData);
  //         const response = await axios.post(
  //           "http://localhost:9191/receptionist/addPatient",
  //           formData,
  //           {
  //             headers: { Authorization: `Bearer ${token}` },
  //           }
  //         );
  //         console.log('Response:', response.data);
  //         toast.success('Patient Added Successfully');
  //         setTimeout(() => {
  //           navigate('/receptionist/add-appointment');
  //         }, 2000);
  //       } catch (error) {
  //         toast.error('Error in Adding Patient');
  //         console.error('Error:', error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
    
  //     return (
  //       <div className="h-full flex justify-center items-center ">
  //         <div className="flex admin-dashboard justify-evenly items-center  border-amber-300 border-solid ">
  //           <div className="image-container">
  //             <img src={patientImage} className="admin-image" alt='patientImage' />
  //             <div className="dashboard-name-patient" >ADD PATIENT</div>
  //           </div>
  //           <div className="container glass-background mt-5">
  //             <label className="text-login fw-bold text-center" style={{ marginTop: '1px' }}>
  //               Enter Patient Details
  //             </label>
  //             <TextField
  //               name="name"
  //               label="Name"
  //               value={formData.name}
  //               onChange={handleChange}
  //               style={{ marginBottom: "1rem", width: "78%" }}
  //               required
  //             />
  //             <div style={{ display: "flex", justifyContent: "space-around", gap: "2rem" }}>
  //               <TextField
  //                 name="mobileNo"
  //                 label="Mobile Number"
  //                 value={formData.mobileNo}
  //                 onChange={handleChange}
  //                 style={{ marginBottom: "1rem", width: "50%" }}
  //                 required
  //               />
  //               <TextField
  //                 name="dob"
  //                 label="Date of Birth"
  //                 // type="date"
  //                 value={formData.dob}
  //                 onChange={handleChange}
  //                 style={{ marginBottom: "1rem", width: "50%" }}
  //                 required
  //                 InputLabelProps={{
  //                   shrink: true,
  //                 }}
  //               />
  //             </div>
  //             <div style={{ display: "flex", justifyContent: "space-around", gap: "2rem" }}>
  //               <TextField
  //                 name="gender"
  //                 label="Gender"
  //                 value={formData.gender}
  //                 onChange={handleChange}
  //                 style={{ marginBottom: "1rem", width: "50%" }}
  //                 required
  //               />
  //               <TextField
  //                 name="bloodGroup"
  //                 label="Blood Group"
  //                 value={formData.bloodGroup}
  //                 onChange={handleChange}
  //                 style={{ marginBottom: "1rem", width: "50%" }}
  //                 required
  //               />
  //             </div>
  //             <TextField
  //               name="address"
  //               label="Address"
  //               value={formData.address}
  //               onChange={handleChange}
  //               style={{ marginBottom: "1rem", width: "78%" }}
  //               required
  //             />
  //             <TextField
  //               name="abhaId"
  //               label="Abha ID"
  //               value={formData.abhaId}
  //               readOnly
  //               onChange={handleChange}
  //               style={{ marginBottom: "1rem", width: "78%" }}
  //               required
  //             />
  //             {loading ? (
  //               <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
  //                 <div class="loader"></div>
  //               </div>
  //             ) : (
  //             <button
  //               type="submit"
  //               className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
  //               style={{ marginTop: '2rem', width: "78%", height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
  //               onClick={handleSubmit}>Submit</button>
  //             )}
  //           </div>
  //         </div>
  //       </div>
  //     );
  // }






































//   import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useLocation, useNavigate } from 'react-router-dom';
// import TextField from "@mui/material/TextField";
// import patientImage from '../../assets/PatientPage.png';
// import toast from 'react-hot-toast';

// export const AddPatientDetails = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);
//     const [patientInfo, setPatientInfo] = useState({
//         name: "",
//         mobileNo: "",
//         dob: "",
//         gender: "",
//         bloodGroup: "",
//         address: "",
//         abhaId: ""
//     });

//     useEffect(() => {
//         fetchPatientData();
//     }, []);

    

//     const fetchPatientData = async () => {
//     try {
//         const response = await axios.get("http://localhost:9191/getPatientInfo");
//         const patientData = response.data;
//         setPatientInfo({
//             name: patientData.name,
//             mobileNo: patientData.mobileNumber,
//             dob: patientData.dateOfBirth,
//             gender: patientData.gender,
//             bloodGroup: "", // You may fetch this information if available
//             address: patientData.abhaAddress, // Assuming this is the patient's address
//             abhaId: patientData.abhaNumber
//         });
//     } catch (error) {
//         console.error('Error fetching patient data:', error);
//     }
// };


//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             const token = localStorage.getItem("token");
//             const response = await axios.post(
//                 "http://localhost:9191/receptionist/addPatient",
//                 patientInfo,
//                 {
//                     headers: { Authorization: `Bearer ${token}` },
//                 }
//             );
//             console.log('Response:', response.data);
//             toast.success('Patient Added Successfully');
//             setTimeout(() => {
//                 navigate('/receptionist/add-appointment');
//             }, 2000);
//         } catch (error) {
//             toast.error('Error in Adding Patient');
//             console.error('Error:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="h-full flex justify-center items-center ">
//             <div className="flex admin-dashboard justify-evenly items-center  border-amber-300 border-solid ">
//                 <div className="image-container">
//                     <img src={patientImage} className="admin-image" alt='patientImage' />
//                     <div className="dashboard-name-patient" >ADD PATIENT</div>
//                 </div>
//                 <div className="container glass-background mt-5">
//                     <form onSubmit={handleSubmit}>
//                         <label className="text-login fw-bold text-center" style={{ marginTop: '1px' }}>
//                             Enter Patient Details
//                         </label>
//                         <TextField
//                             name="name"
//                             label="Name"
//                             value={patientInfo.name}
//                             onChange={handleChange}
//                             style={{ marginBottom: "1rem", width: "78%" }}
//                             required
//                         />
//                         {/* Other input fields */}
//                         <button
//                             type="submit"
//                             className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
//                             style={{ marginTop: '2rem', width: "78%", height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
//                         >
//                             {loading ? 'Submitting...' : 'Submit'}
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useLocation, useNavigate } from 'react-router-dom';
// import TextField from "@mui/material/TextField";
// import patientImage from '../../assets/PatientPage.png';
// import toast from 'react-hot-toast';

// export const AddPatientDetails = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);
//     const [patientInfo, setPatientInfo] = useState({
//         name: "",
//         mobileNo: "",
//         dob: "",
//         gender: "",
//         bloodGroup: "",
//         address: "",
//         abhaId: ""
//     });

//     useEffect(() => {
//         fetchPatientData();
//     }, []);

//     const fetchPatientData = async () => {
//         try {
//             const response = await axios.get("http://localhost:9191/getPatientInfo");
//             const patientData = response.data;
//             setPatientInfo({
//                 name: patientData.name,
//                 mobileNo: patientData.mobileNumber,
//                 dob: patientData.dateOfBirth,
//                 gender: patientData.gender,
//                 bloodGroup: "", // You may fetch this information if available
//                 address: "",//patientData.abhaAddress, // Assuming this is the patient's address
//                 abhaId: patientData.abhaNumber
//             });
//             console.log(patientData);
//         } catch (error) {
//             console.error('Error fetching patient data:', error);
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setPatientInfo({ ...patientInfo, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             const token = localStorage.getItem("token");
//             const response = await axios.post(
//                 "http://localhost:9191/receptionist/addPatient",
//                 patientInfo,
//                 {
//                     headers: { Authorization: `Bearer ${token}` },
//                 }
//             );
//             console.log('Response:', response.data);
//             toast.success('Patient Added Successfully');
//             setTimeout(() => {
//                 navigate('/receptionist/add-appointment');
//             }, 2000);
//         } catch (error) {
//             toast.error('Error in Adding Patient');
//             console.error('Error:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="h-full flex justify-center items-center ">
//             <div className="flex admin-dashboard justify-evenly items-center  border-amber-300 border-solid ">
//                 <div className="image-container">
//                     <img src={patientImage} className="admin-image" alt='patientImage' />
//                     <div className="dashboard-name-patient" >ADD PATIENT</div>
//                 </div>
//                 <div className="container glass-background mt-5">
//                     <form onSubmit={handleSubmit}>
//                         <label className="text-login fw-bold text-center" style={{ marginTop: '1px' }}>
//                             Enter Patient Details
//                         </label>
//                         <TextField
//                             name="name"
//                             label="Name"
//                             value={patientInfo.name}
//                             onChange={handleChange}
//                             style={{ marginBottom: "1rem", width: "78%" }}
//                             readOnly
//                             // required
//                         />
//                         <TextField
//                             name="mobileNo"
//                             label="Mobile Number"
//                             value={patientInfo.mobileNo}
//                             onChange={handleChange}
//                             style={{ marginBottom: "1rem", width: "78%" }}
//                             required
//                         />
//                         <TextField
//                             name="dob"
//                             label="Date of Birth"
//                             value={patientInfo.dob}
//                             onChange={handleChange}
//                             style={{ marginBottom: "1rem", width: "78%" }}
//                             required
//                         />
//                         <TextField
//                             name="gender"
//                             label="Gender"
//                             value={patientInfo.gender}
//                             onChange={handleChange}
//                             style={{ marginBottom: "1rem", width: "78%" }}
//                             required
//                         />
//                         <TextField
//                             name="bloodGroup"
//                             label="Blood Group"
//                             value={patientInfo.bloodGroup}
//                             onChange={handleChange}
//                             style={{ marginBottom: "1rem", width: "78%" }}
//                             required
//                         />
//                         <TextField
//                             name="address"
//                             label="Address"
//                             value={patientInfo.address}
//                             onChange={handleChange}
//                             style={{ marginBottom: "1rem", width: "78%" }}
//                             required
//                         />
//                         <TextField
//                             name="abhaId"
//                             label="Abha ID"
//                             value={patientInfo.abhaId}
//                             onChange={handleChange}
//                             style={{ marginBottom: "1rem", width: "78%" }}
//                             required
//                         />
//                         {/* Other input fields */}
//                         <button
//                             type="submit"
//                             className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
//                             style={{ marginTop: '2rem', width: "78%", height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
//                         >
//                             {loading ? 'Submitting...' : 'Submit'}
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }














// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useLocation, useNavigate } from 'react-router-dom';
// import TextField from "@mui/material/TextField";
// import patientImage from '../../assets/PatientPage.png';
// import toast from 'react-hot-toast';

// export const AddPatientDetails = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);
//     const [patientInfo, setPatientInfo] = useState({
//         name: "",
//         mobileNo: "",
//         dob: "",
//         gender: "",
//         bloodGroup: "",
//         address: "",
//         abhaId: ""
//     });

//     useEffect(() => {
//         fetchPatientData();
//     }, []);

//     const fetchPatientData = async () => {
//         try {
//             const response = await axios.get("http://localhost:9191/getPatientInfo");
//             const patientData = response.data;
//             setPatientInfo({
//                 name: patientData.name,
//                 mobileNo: patientData.mobileNumber,
//                 dob: patientData.dateOfBirth,
//                 gender: patientData.gender,
//                 bloodGroup: "", // You may fetch this information if available
//                 address: "",//patientData.abhaAddress, // Assuming this is the patient's address
//                 abhaId: patientData.abhaAddress//patientData.abhaNumber
//             });
//             console.log(patientData);
//         } catch (error) {
//             console.error('Error fetching patient data:', error);
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setPatientInfo({ ...patientInfo, [name]: value });
//     };

//     // const handleSubmit = async (e) => {
//     //     e.preventDefault();
//     //     setLoading(true);
//     //     try {
//     //         const token = localStorage.getItem("token");
//     //         console.log(patientInfo);
//     //         const response = await axios.post(
//     //             "http://localhost:9191/receptionist/addPatient",
//     //             patientInfo,
//     //             {
//     //                 headers: { Authorization: `Bearer ${token}` },
//     //             }
//     //         );
//     //         console.log('Response:', response.data);
//     //         toast.success('Patient Added Successfully');
//     //         setTimeout(() => {
//     //             navigate('/receptionist/add-appointment');
//     //         }, 2000);
//     //     } catch (error) {
//     //         toast.error('Error in Adding Patient');
//     //         console.error('Error:', error);
//     //     } finally {
//     //         setLoading(false);
//     //     }
//     // };
//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       setLoading(true);
//       try {
//           const token = localStorage.getItem("token");
//           const formData = {
//               abhaAddress: patientInfo.abhaAddress,
//               bloodGroup: patientInfo.bloodGroup,
//               address: patientInfo.address
//           };
//           const response = await axios.post(
//               "http://localhost:9191/receptionist/addPatient",
//               formData,
//               {
//                   headers: { Authorization: `Bearer ${token}` },
//               }
//           );
//           console.log('Response:', response.data);
//           toast.success('Patient Added Successfully');
//           setTimeout(() => {
//               navigate('/receptionist/add-appointment');
//           }, 2000);
//       } catch (error) {
//           toast.error('Error in Adding Patient');
//           console.error('Error:', error);
//       } finally {
//           setLoading(false);
//       }
//   };
  
//     return (
//         <div className="h-full flex justify-center items-center ">
//             <div className="flex admin-dashboard justify-evenly items-center  border-amber-300 border-solid ">
//                 <div className="image-container">
//                     <img src={patientImage} className="admin-image" alt='patientImage' />
//                     <div className="dashboard-name-patient" >ADD PATIENT</div>
//                 </div>
//                 <div className="container glass-background mt-5">
//                     <form onSubmit={handleSubmit}>
//                         <label className="text-login fw-bold text-center" style={{ marginTop: '1px' }}>
//                             Enter Patient Details
//                         </label>
//                         <TextField
//                             name="name"
//                             label="Name"
//                             value={patientInfo.name}
//                             style={{ marginBottom: "1rem", width: "78%" }}
//                             readOnly
//                             disabled
//                         />
//                         <TextField
//                             name="mobileNo"
//                             label="Mobile Number"
//                             value={patientInfo.mobileNo}
//                             style={{ marginBottom: "1rem", width: "78%" }}
//                             readOnly
//                             disabled
//                         />
//                         <TextField
//                             name="dob"
//                             label="Date of Birth"
//                             value={patientInfo.dob}
//                             style={{ marginBottom: "1rem", width: "78%" }}
//                             readOnly
//                             disabled
//                         />
//                         <TextField
//                             name="gender"
//                             label="Gender"
//                             value={patientInfo.gender}
//                             style={{ marginBottom: "1rem", width: "78%" }}
//                             readOnly
//                             disabled
//                         />
//                         <TextField
//                             name="bloodGroup"
//                             label="Blood Group"
//                             value={patientInfo.bloodGroup}
//                             onChange={handleChange}
//                             style={{ marginBottom: "1rem", width: "78%" }}
//                             required
//                             readOnly
//                         />
//                         <TextField
//                             name="address"
//                             label="Address"
//                             value={patientInfo.address}
//                             onChange={handleChange}
//                             style={{ marginBottom: "1rem", width: "78%" }}
//                             required
//                             readOnly
//                         />
//                         <TextField
//                             name="abhaId"
//                             label="Abha ID"
//                             value={patientInfo.abhaId}
//                             style={{ marginBottom: "1rem", width: "78%" }}
//                             required
//                             readOnly
//                             disabled
//                         />
//                         <button
//                             type="submit"
//                             className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
//                             style={{ marginTop: '2rem', width: "78%", height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
//                         >
//                             {loading ? 'Submitting...' : 'Submit'}
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }














import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import TextField from "@mui/material/TextField";
import patientImage from '../../assets/PatientPage.png';
import toast from 'react-hot-toast';

export const AddPatientDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [patientInfo, setPatientInfo] = useState({
        name: "",
        mobileNo: "",
        dob: "",
        gender: "",
        bloodGroup: "",
        address: "",
        abhaId: ""
    });

    useEffect(() => {
        fetchPatientData();
    }, []);

    const fetchPatientData = async () => {
        try {
            const response = await axios.get("http://localhost:9191/getPatientInfo");
            const patientData = response.data;
            setPatientInfo({
                name: patientData.name,
                mobileNo: patientData.mobileNumber,
                dob: patientData.dateOfBirth,
                gender: patientData.gender,
                bloodGroup: "", // You may fetch this information if available
                address: "",//patientData.abhaAddress, // Assuming this is the patient's address
                abhaId: patientData.abhaAddress//patientData.abhaNumber
            });
            console.log(patientData);
        } catch (error) {
            console.error('Error fetching patient data:', error);
        }
    };

    // Removed handleChange since it's not needed for read-only fields
        const handleChange = (e) => {
        const { name, value } = e.target;
        setPatientInfo({ ...patientInfo, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const formData = {
                abhaAddress: patientInfo.abhaId,
                bloodGroup: patientInfo.bloodGroup,
                address: patientInfo.address
            };
            const response = await axios.post(
                "http://localhost:9191/receptionist/addPatient",
                formData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            console.log('Response:', response.data);
            toast.success('Patient Added Successfully');
            setTimeout(() => {
                navigate('/receptionist/add-appointment');
            }, 2000);
        } catch (error) {
            toast.error('Error in Adding Patient');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };
  
    return (
        <div className="h-full flex justify-center items-center ">
            <div className="flex admin-dashboard justify-evenly items-center  border-amber-300 border-solid ">
                <div className="image-container">
                    <img src={patientImage} className="admin-image" alt='patientImage' />
                    <div className="dashboard-name-patient" >ADD PATIENT</div>
                </div>
                <div className="container glass-background mt-5">
                    <form onSubmit={handleSubmit}>
                        <label className="text-login fw-bold text-center" style={{ marginTop: '1px' }}>
                            Enter Patient Details
                        </label>
                        <TextField
                            name="name"
                            label="Name"
                            value={patientInfo.name}
                            style={{ marginBottom: "1rem", width: "78%" }}
                            readOnly
                            disabled
                        />
                        <TextField
                            name="mobileNo"
                            label="Mobile Number"
                            value={patientInfo.mobileNo}
                            style={{ marginBottom: "1rem", width: "78%" }}
                            readOnly
                            disabled
                        />
                        <TextField
                            name="dob"
                            label="Date of Birth"
                            value={patientInfo.dob}
                            style={{ marginBottom: "1rem", width: "78%" }}
                            readOnly
                            disabled
                        />
                        <TextField
                            name="gender"
                            label="Gender"
                            value={patientInfo.gender}
                            style={{ marginBottom: "1rem", width: "78%" }}
                            readOnly
                            disabled
                        />
                        <TextField
                            name="bloodGroup"
                            label="Blood Group"
                            value={patientInfo.bloodGroup}
                            style={{ marginBottom: "1rem", width: "78%" }}
                            onChange={handleChange}
                            // readOnly
                            // disabled
                        />
                        <TextField
                            name="address"
                            label="Address"
                            value={patientInfo.address}
                            style={{ marginBottom: "1rem", width: "78%" }}
                            onChange={handleChange}
                            // readOnly
                            // disabled
                        />
                        <TextField
                            name="abhaId"
                            label="Abha ID"
                            value={patientInfo.abhaId}
                            style={{ marginBottom: "1rem", width: "78%" }}
                            readOnly
                            disabled
                        />
                        <button
                            type="submit"
                            className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            style={{ marginTop: '2rem', width: "78%", height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
