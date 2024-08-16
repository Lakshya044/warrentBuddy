// "use client" ;
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [aadharnumber, setAadharnumber] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [profile, setProfile] = useState(0);

  const navigate = useNavigate();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  
  const handleAadharnumberChange = (event) => {
    setAadharnumber(event.target.value);
  };

  const handleProfileChange = (event) => {
    setProfile(event.target.value);
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let url = "";
    switch (profile) {
      case 0:
        url = "http://localhost:5000/admin/login";
        break;
      case 1:
        url = "http://localhost:5000/user/login";
        break;
      case 2:
        url = "http://localhost:5000/police/login";
        break;
      default:
        alert("Please select a valid profile.");
        return;
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          AadharNo: aadharnumber,
          password: password,
        }),
      });

      const res = await response.json();

      if (res.statusCode === 201) {
        profileChange();
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred while logging in. Please try again later.");
    }
  };

  const profileChange = () => {
    if (profile === 0) {
      navigate("/loginJudge");
    } else if (profile === 1) {
      navigate("/loginClient");
    } else {
      navigate("/loginPolice");
    }
  };

  return (
    <>
      <Upper_Navbar />
      <div className="container">
        <div className="row justify-content-center align-items-center vh-100">
          <div className="col-md-1 text-center company__info" style={{ backgroundColor: "white" }}>
            <img
              src="/preamble.jpg"
              width="70"
              height="70"
              className="d-inline-block align-top mr-2"
              alt="Preamble"
            />
          </div>
          <div className="col-md-8 col-xs-12 col-sm-12 login_form">
            <div className="container-fluid">
              <div className="row">
                <h2>Sign In</h2>
              </div>
              <div className="row">
                <form onSubmit={handleSubmit} className="form-group">
                  <div className="row">
                    <input
                      type="text"
                      name="aadharNo"
                      id="aadharNo"
                      className="form__input"
                      placeholder="Aadhar Card"
                      value={aadharnumber}
                      onChange={handleAadharnumberChange}
                      required
                    />
                  </div>
                  <div className="row">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="form__input"
                      placeholder="Password"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>

                  <div className="m-3">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={handleProfileChange}
                      value={profile}
                    >
                      <option value={0}>Judge</option>
                      <option value={1}>Client</option>
                      <option value={2}>Police</option>
                    </select>
                  </div>

                  <div className="row">
                    <input
                      type="checkbox"
                      name="remember_me"
                      id="remember_me"
                      className=""
                      checked={rememberMe}
                      onChange={handleRememberMeChange}
                    />
                    <label htmlFor="remember_me">Remember Me!</label>
                  </div>

                  <div className="row">
                    <input type="submit" value="Submit" className="btnLogin" />
                  </div>
                </form>
              </div>
              <div className="row">
                <p>
                  Don't have an account? <a href="/signup">Sign Up</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LoginForm;
