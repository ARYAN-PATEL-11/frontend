import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewStaff = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();

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

  




  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const fetchStaff = async () => {
      try {
        const response = await axios.get("http://localhost:9191/admin/staffList", {
          headers: headers,
        });
        // Filter the staff list to include only receptionists
        const receptionists = response.data.filter(staff => staff.role === 'Receptionist');
        setStaff(receptionists);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching staff:", error);
        setLoading(false);
      }
    };
  
    fetchStaff();
  }, []);
  
  // const handleActivateDoctor = async (email) => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const headers = {
  //       Authorization: `Bearer ${token}`,
  //     };
  //     await axios.post(
  //       `http://localhost:9191/admin/activateStaff/${email}`,
  //       null,
  //       { headers: headers }
  //     );
  //     // Refresh doctor list after activation
  //     const response = await axios.get(
  //       "http://localhost:9191/admin/staffList",
  //       {
  //         headers: headers,
  //       }
  //     );
  //     const receptionists = response.data.filter(staff => staff.role === 'Receptionist');
  //     setStaff(receptionists);
  //   } catch (error) {
  //     console.error("Error activating doctor:", error);
  //   }
  // };

  // const handleDeactivateDoctor = async (email) => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const headers = {
  //       Authorization: `Bearer ${token}`,
  //     };
  //     await axios.post(
  //       `http://localhost:9191/admin/deactivateStaff/${email}`,
  //       null,
  //       { headers: headers }
  //     );
  //     // Refresh doctor list after deactivation
  //     const response = await axios.get(
  //       "http://localhost:9191/admin/staffList",
  //       {
  //         headers: headers,
  //       }
  //     );
  //     const receptionists = response.data.filter(staff => staff.role === 'Receptionist');
  //     setStaff(receptionists);
  //   } catch (error) {
  //     console.error("Error deactivating doctor:", error);
  //   }
  // };

  const handleViewStaffDetails = async (email) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const formData = { email: email };
      const response = await axios.post(
        "http://localhost:9191/receptionist/receptionistDetails",
        formData,
        { headers: headers }
      );
      // console.log("Staff details:", response.data);
      const staffDetails = response.data;
      // Redirect to staff details page
      navigate("/admin/view-receptionist-details", { state: { staff: staffDetails } });
    }
    catch (error) {
      console.error("Error viewing staff details:", error);
    }
  }
  
  return (
    <div className="container mt-10">
      {/* <h2 className="list-heading">Receptionists List</h2> */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="table table-hover" cellpadding="0" cellspacing="0" border="0">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">E-mail</th>
              <th scope="col">Role</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
         
          <tbody>
            {staff.map((staff) => (
              <tr key={staff.id}>
               
                <td>{staff.name}</td>
                <td>{staff.email}</td>
                <td>{staff.role}</td>
                <td>
                  {
                    <button
                      className="btn btn-outline-info text-black"
                      onClick={() => handleViewStaffDetails(staff.email)}
                    >
                      View Details
                    </button>
                  }
                </td>
              </tr>
            ))}
          </tbody>
    
        </table>
       
      )}
    </div>
  );
};

export default ViewStaff;
