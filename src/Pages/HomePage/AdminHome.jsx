import React,{useEffect} from "react";
import './AdminHome.css'
import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux';
import AdminSidebar from "../../components/Admin/Adminsidebar/AdminSidebar";
import AdminUserManagement from "../../components/Admin/AdminUserManagement/AdminUserManagement";
import { adminLogOut } from "../../actions/AdminAction";
import { getUser } from "../../api/UserRequest";

function AdminHome(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const handleLogout =()=>{
        dispatch(adminLogOut())
        navigate('/adminLogin')
    }
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await getUser('adminId'); 
           
          } catch (error) {
            if (error.message === 'Unauthorized') {
              navigate('/auth'); 
            }
          }
        };
    
        fetchData();
     }, [navigate]);

    
    return(
        <div className="adminHome">
            <AdminSidebar/>
            

            <h3>Welcome Admin</h3>
            <button className="logoutBtn" onClick={handleLogout}>
          Log Out
        </button>
        </div>
    )
}
export default AdminHome;
