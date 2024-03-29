

import React from 'react';
import './Adminsidebar.css'
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div className="sidebar">
      <h2>Admin Dashboard</h2>
      <ul>
        <li>
          <Link to="/adminHome">Dashboard</Link>
        </li>
        <li>
          <Link to="/admin_UserManagement">User Management</Link>
        </li>
        
      </ul>
    </div>
  );
};

export default AdminSidebar;
