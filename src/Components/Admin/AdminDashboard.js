import React from "react";
import { useState, useEffect } from "react";
import admin from "../../assets/AdminPage.jpg";
import { useNavigate, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const AdminDashboard = () => {
  const adminName = localStorage.getItem("Name");
  let navigate = useNavigate();
  const location = useLocation();

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

    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn === "true") {
      toast.success(`Welcome, ${adminName}`, { duration: 3000 });
      localStorage.removeItem("loggedIn");
    }
  }, []);

  const determineFontSize = () => {
    if (adminName && adminName.length > 14) {
      return "2rem";
    }
    return "3rem";
  };
  return (
    <div>
      <div className="h-full flex justify-center items-center ">
        <div className="flex admin-dashboard justify-evenly items-center gap-40 border-amber-300 border-solid ">
          <div className="image-container">
            <img src={admin} className="admin-image" />
            <div
              className="dashboard-name"
              style={{ fontSize: determineFontSize() }}
            >
              {adminName}
            </div>
          </div>
          <div className="flex flex-col gap-5 ">
            <NavLink
              to="/admin/add-doctor"
              className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              ADD DOCTOR
            </NavLink>
            <NavLink
              to="/admin/add-admin"
              className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              ADD ADMIN
            </NavLink>
            <NavLink
              to="/admin/add-staff"
              className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              ADD RECEPTIONIST
            </NavLink>
            <NavLink
              to="/admin/view-doctor-info"
              className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              VIEW DOCTOR LIST
            </NavLink>
            <NavLink
              to="/admin/view-receptionist-info"
              className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              VIEW RECEPTIONIST LIST
            </NavLink>
            <NavLink
              to="/admin/view-admin-info"
              className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              VIEW ADMIN LIST
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;
