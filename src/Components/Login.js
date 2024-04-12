import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/loginPage.jpg";
import toast from "react-hot-toast";

const LoginForm = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const lowercaseRole = role.toLowerCase();
      const response = await axios.post(
        `http://localhost:9191/login/${lowercaseRole}`,
        {
          email: email,
          password: password,
        }
      );
      const responseData = response.data;
      const token = responseData.token;
      console.log("User Logged In:", responseData);

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("loggedIn", "true");

      let DetailsResponse;
      if (role === "ADMIN") {
        DetailsResponse = await axios.get(
          "http://localhost:9191/admin/adminDetails",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else if (role === "DOCTOR") {
        const formData = {};

        DetailsResponse = await axios.post(
          "http://localhost:9191/doctor/doctorDetails",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else if (role === "Receptionist") {
        const formData = {};

        DetailsResponse = await axios.post(
          "http://localhost:9191/receptionist/receptionistDetails",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      const Name = DetailsResponse.data.name;
      console.log("Name:", Name);

      localStorage.setItem("Name", Name);

      if (role === "DOCTOR") {
        navigate("/doctor");
      } else if (role === "Receptionist") {
        navigate("/receptionist");
      } else if (role === "ADMIN") {
        navigate("/admin");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Incorrect credentials.", {
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  return (
    <div className="container-fluid main-background">
      <div className="container background d-flex align-items-center">
        <div className="login-image">
          <img src={loginImage} alt="login" />
        </div>
        <div className="container glass-background">
          <label className="text-login fw-bold text-center">
            LOGIN DETAILS
          </label>
          <div className="login-form mx-5">
            {/* <form className="" onSubmit={handleSubmit}>
              <div>
                <TextField
                  id="email"
                  label="Email"
                  variant="outlined"
                  size="medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ marginBottom: "2rem", width: "100%" }}
                />
                <TextField
                  id="password"
                  label="Password"
                  variant="outlined"
                  size="medium"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ marginBottom: "2rem", width: "100%" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          onMouseDown={(e) => e.preventDefault()}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <TextField
                  id="role"
                  select
                  label="Role"
                  variant="outlined"
                  size="medium"
                  value={role}
                  onChange={handleRoleChange}
                  style={{ marginBottom: "2rem", width: "100%" }}
                >
                  <MenuItem value="ADMIN">Admin</MenuItem>
                  <MenuItem value="Receptionist">Receptionist</MenuItem>
                  <MenuItem value="DOCTOR">Doctor</MenuItem>
                </TextField>
              </div>
              <div>
                {loading ? (
                  <div style={{ height: '20%', display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                    <div class="loader"></div>
                  </div>
                ) : <button
                  type="submit"
                  className="button"
                  // className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  // style={{ marginTop: '2rem', width: "100%", height: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  style={{ height: "fit-content" }}

                >
                  Login
                </button>}
              </div>
            </form> */}

            <form className="" onSubmit={handleSubmit}>
              <div>
                <TextField
                  id="email"
                  label="Email"
                  variant="outlined"
                  size="medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ marginBottom: "2rem", width: "100%" }}
                />
                <TextField
                  id="password"
                  label="Password"
                  variant="outlined"
                  size="medium"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ marginBottom: "2rem", width: "100%" }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          onMouseDown={(e) => e.preventDefault()}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  id="role"
                  select
                  label="Role"
                  variant="outlined"
                  size="medium"
                  value={role}
                  onChange={handleRoleChange}
                  style={{ marginBottom: "2rem", width: "100%" }}
                >
                  <MenuItem value="ADMIN">Admin</MenuItem>
                  <MenuItem value="Receptionist">Receptionist</MenuItem>
                  <MenuItem value="DOCTOR">Doctor</MenuItem>
                </TextField>
              </div>
              <br></br>
              <div className="flex justify-center">
                {" "}
                {/* Add flex properties to center the button */}
                {loading ? (
                  <div
                    style={{
                      height: "20%",
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "1rem",
                    }}
                  >
                    <div class="loader"></div>
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="button"
                    style={{
                      height: "fit-content",
                      padding: "20px",
                      color: "white", // Set default font color to white
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "black";
                    }} // Change font color to black on hover
                    onMouseLeave={(e) => {
                      e.target.style.color = "white";
                    }} // Change font color back to white when not hovered
                  >
                    Login
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
