import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewAdmin = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token) {
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
        const response = await axios.get(
          "http://localhost:9191/admin/staffList",
          {
            headers: headers,
          }
        );
        const admins = response.data.filter((staff) => staff.role === "ADMIN");
        setStaff(admins);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching staff:", error);
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  return (
    <div className="container mt-10">
      <h2 className="list-heading">Admins List</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">E-mail</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((staff) => (
              <tr>
                <td>{staff.name}</td>
                <td>{staff.email}</td>
                <td>{staff.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewAdmin;