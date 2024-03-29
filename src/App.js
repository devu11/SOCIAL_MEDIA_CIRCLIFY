import React from "react";
import "./App.css";
import Home from "./Pages/HomePage/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./Pages/Auth/Auth";
import { useSelector } from "react-redux";
import Profile from "./Pages/ProfilePage/Profile";
import AdminLogin from "./Pages/AdminAuth/AdminLogin";
import AdminHome from "./Pages/HomePage/AdminHome";
import AdminUserManagement from "./components/Admin/AdminUserManagement/AdminUserManagement";
import Chat from "./Pages/Chat/Chat";
import Otp from "./Pages/Otp/Otp";
import Notifications from "./Pages/Notifications.jsx/Notifications";



function App() {
  const user = useSelector((state) => state.authReducer.authData);

  return (
    <div className="App">
      <div className="blur" style={{ top: "-18%", right: "0" }}>
        {" "}
      </div>
      <div className="blur" style={{ top: "36%", left: "-8rem" }}>
        {" "}
      </div>

      <Routes>
     
        <Route
          path="/"
          element={user ? <Navigate to="home" /> : <Navigate to="auth" />}
        />
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="../auth" />}
        />

        <Route
          path="/auth"
          element={user ? <Navigate to="../home" /> : <Auth />}
        />
        <Route path="/profile/:id" element={user? <Profile/> : <Navigate to='../auth'/>} />

        <Route path="/adminLogin" element={<AdminLogin />} />

        <Route path="/adminHome" element={<AdminHome />} />

        <Route path="/admin_UserManagement" element={<AdminUserManagement/>}/>
          
          <Route path="/chat" element={user? <Chat/> : <Navigate to="../auth"/>}/>




<Route path="/otp/:username" element={user? <Otp/> : <Navigate to="auth" />}/>

{/* <Route path="/notification" element={<Notifications/>}/> */}


      </Routes>
    </div>
  );
}
export default App;
