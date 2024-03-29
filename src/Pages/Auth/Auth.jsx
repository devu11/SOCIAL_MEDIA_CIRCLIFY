import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import { GoogleLogin } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { logIn, signUp } from "../../actions/AuthAction";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from "axios";


function Auth() {
  const [isSignUp, setIsSingnUp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);

  const loading = useSelector((state) => state.authReducer.loading);
  console.log(loading);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpass: "",
  });

  const [confirmPass, setConfirmPass] = useState(true);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    // no need to make handle change for every inputs
    setData({ ...data, [e.target.name]: e.target.value });
    if (e.target.name === "password" && isSignUp) {
      setConfirmPass(data.confirmpass === e.target.value);
    }
  };

  // validation form
  const validateForm = () => {
    const errors = {};

    if (!data.username) {
      errors.username = "Username cannot be empty";
    }

    if (!data.password) {
      errors.password = "Password cannot be empty";
    } else if (!isStrongPassword(data.password)) {
      errors.password = "Password must be strong";
    }

    if (isSignUp) {
      if (!data.firstname) {
        errors.firstname = "First Name cannot be empty";
      } else if (containsNumbers(data.firstname)) {
        errors.firstname = "First Name cannot contain numbers";
      }

      if (!data.lastname) {
        errors.lastname = "Last Name cannot be empty";
      } else if (containsNumbers(data.lastname)) {
        errors.lastname = "Last Name cannot contain numbers";
      }
      if (data.password !== data.confirmpass) {
        errors.confirmpass = "Passwords do not match";
      }
      if (!data.confirmpass) {
        errors.confirmpass = "Confirm Password cannot be empty";
      }
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isStrongPassword = (password) => {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const containsNumbers = (text) => {
    return /\d/.test(text);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
   
    if (validateForm()) {
       try {
         if (isSignUp) {
           await dispatch(signUp(data));
           navigate(`/otp/${data.username}`); 
         } else {
           const response = await dispatch(logIn(data));
           console.log(response, "res");
           if (response?.data?.message === "User is Blocked") {
             setLoginError("User Blocked. You are not allowed to log in.");
           } else {
             navigate("/home");
           }
         }
       } catch (error) {
         console.error("Error during login:", error);
         setLoginError("An error occurred during login. Please try again.");
       }
    }
   };
   



  const handleGoogleSignInSuccess = async (googleData) => {
    try {
      const tokenId = googleData.tokenId;
      const response = await axios.post("http://localhost:3001/auth/googleSignIn", { tokenId });
      console.log(response.data);
      navigate("/home");
      Swal.fire({
        icon: 'success',
        title: 'Successfully logged in!',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      setLoginError("An error occurred during sign-in. Please try again.");
    }
  };

  const handleGoogleSignInFailure = (error) => {
    console.error("Google Sign-In failed:", error);
    if (error.error === "popup_closed_by_user") {
      setLoginError("Google Sign-In canceled. Please try again.");
    } else {
      setLoginError("Google Sign-In failed. Please try again later.");
    }
  };


  const resetForm = () => {
    setConfirmPass(true);
    setData({
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirmpass: "",
    });
    setErrors({});
  };

  return (
    <div className="Auth">
      {/* left side Logo */}
      <div className="auth-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>Circlify</h1>
          <h6>Explore the ideas throughout the World</h6>
        </div>
      </div>

      {/* right side register and login */}

      <div className="auth-right">
        <form className="infoForm authForm" onSubmit={handlesubmit}>
          <h3>{isSignUp ? "Sign Up" : "Log In"}</h3>

          {isSignUp && (
            <div>
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  className="infoInput"
                  name="firstname"
                  onChange={handleChange}
                  value={data.firstname}
                />
                {errors.firstname && (
                  <p className="firstnametext" style={{ color: "red" }}>
                    {errors.firstname}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="infoInput"
                  name="lastname"
                  onChange={handleChange}
                  value={data.lastname}
                />
                {errors.lastname && (
                  <p className="firstnametext " style={{ color: "red" }}>
                    {errors.lastname}
                  </p>
                )}
              </div>
            </div>
          )}

          <div>
            <div>
              <input
                type="email"
                placeholder="Email"
                name="username"
                className="infoInput"
                onChange={handleChange}
                value={data.username}
              />
              {errors.username && (
                <p className="usernametext " style={{ color: "red" }}>
                  {errors.username}
                </p>
              )}
            </div>
          </div>
          <div>
            <div>
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="infoInput"
                onChange={handleChange}
                value={data.password}
              />

              {errors.password && (
                <p className="passwordtext" style={{ color: "red" }}>
                  {errors.password}
                </p>
              )}
            </div>
            <div>
              {isSignUp && (
                <div>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    name="confirmpass"
                    className="infoInput "
                    onChange={handleChange}
                    value={data.confirmpass}
                  />
                  {errors.confirmpass && (
                    <p className="passwordtext mt-" style={{ color: "red" }}>
                      {errors.confirmpass}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
          {/* <span
            style={{
              display: confirmPass ? "none" : "block",
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
            }}
          >
            * Confirm Password is not same
          </span> */}
          <div>
            <span
              style={{ fontSize: "15px", cursor: "pointer" }}
              onClick={() => {
                setIsSingnUp((prev) => !prev);
                resetForm();
              }}
            >
              {isSignUp
                ? "Already have an account. Login!"
                : "Dont have account? SignUp"}
            </span>
          </div>

          <button
            className="button infoButton"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : isSignUp ? "Signup" : "Login"}
          </button>

          <GoogleLogin
  clientId="463018507929-f58al925caana4fdnt17cur5fnvflnnq.apps.googleusercontent.com"
  onSuccess={handleGoogleSignInSuccess}
  onFailure={handleGoogleSignInFailure}
  cookiePolicy="single_host_origin"
  buttonText="Sign in with Google"
  render={renderProps => (
    <button
      onClick={renderProps.onClick}
      disabled={renderProps.disabled}
      style={{
        width: "190px", 
        height:"50px",
        marginRight:"25px",
        backgroundColor: "navy", 
        color: "white", 
        border: "none", 
        padding: "10px", 
        borderRadius: "9px", 
        cursor: "pointer", 
        fontSize: "16px", 
        fontWeight: "bold",
      }}
    >
      Sign in with Google
    </button>
  )}
/>

        </form>
      </div>
    </div>
  );
}

export default Auth;
