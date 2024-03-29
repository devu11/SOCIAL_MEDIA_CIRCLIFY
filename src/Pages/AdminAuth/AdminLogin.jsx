import React, { useState ,useEffect} from "react";
import Logo from "../../img/logo.png";
import "../Auth/Auth.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { adminLogIn } from "../../actions/AdminAction.js";
import'./AdminLogin.css'


function AdminLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  



  const [formData, setFormData] = useState({
    username: 'admin@gmail.com',
    password: 'admin123',
  });


  const [errors, setErrors] = useState({});
  

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const validateForm = () => {
    const errors = {};

    
    if (!formData.username || formData.username !== 'admin@gmail.com') {
      errors.username = "Invalid username";
    }

    if (!formData.password) {
      errors.password = "Password cannot be empty";
    } else if (formData.password !== 'admin123') {
      errors.password = "Invalid password";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };


  const handleLogin = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await dispatch(adminLogIn(formData));
        
      } catch (error) {
        console.log(error);
        
        setErrors({ ...errors, login: "Invalid credentials. Please try again." });
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('adminToken');

    if (token) {
    
      navigate('/adminHome');
    }
  }, [navigate]);
  
  return (
    <div className="Auth">
      <div className="auth-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>Circlify</h1>
          <h6>Explore the ideas throughout the World</h6>
        </div>
      </div>
    <div className="auth-right">
      
      <form onSubmit={handleLogin}>
      <h2>Admin Login</h2>
        <div>
        <input
        className="infoInput"
          type="text"
          placeholder="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
        {errors.username && (
              <p className="errortext" style={{ color: "red" }}>{errors.username}</p>
            )}
        </div>
      
        
        <div style={{ marginTop: "10px" }}>
        <input
        className="infoInput"
          type="password"
          placeholder="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
         {errors.password && (
              <p className="errortext" style={{ color: "red" }}>{errors.password}</p>
            )}

        </div>
        <div style={{ marginTop: "20px" }}>
        <button type="submit" className="button infoButton" >
         Log In
        </button>
        </div>
       
      </form>
    </div>
    </div>
  );
}
export default AdminLogin;
