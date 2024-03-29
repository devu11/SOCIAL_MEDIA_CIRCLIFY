import React, { useEffect, useState } from "react";
import './AdminUserManagement.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../Adminsidebar/AdminSidebar";
import { blockUser, getAllUsers, unblockUser } from '../../../api/AdminRequest.js';


const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <p>{message}</p>
        <div>
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
};




function AdminUserManagement() {
  const [persons, setPersons] = useState([]);
  const [confirmationModal, setConfirmationModal] = useState({
    isOpen: false,
    message: '',
    userId: null,
    blocked: false,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();
const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER


  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const { data } = await getAllUsers();
        
        const filteredPersons = data.filter(person => person.username !== 'admin@gmail.com');

      setPersons(filteredPersons);
        console.log(data)
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchPersons();

    
  }, []);



  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPersons = persons.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);


  const handleToggleBlockUser = async(userId,blocked)=>{
    try{
      setConfirmationModal({
        isOpen: true,
        message: `Are you sure you want to ${blocked ? 'unblock' : 'block'} this user?`,
        userId,
        blocked,
      });
    }catch(error){
      console.log('Error Toggling User Status',error)
    }
  }

  const handleConfirmation = async (confirmed) => {
    try {
      if (confirmed) {
        if (confirmationModal.blocked) {
          await unblockUser(confirmationModal.userId);
        } else {
          await blockUser(confirmationModal.userId);
        }

        const { data } = await getAllUsers();
        const filteredPersons = data.filter(person => person.username !== 'admin@gmail.com');

        setPersons(data);
      }

      
      setConfirmationModal({
        isOpen: false,
        message: '',
        userId: null,
        blocked: false,
      });
    } catch (error) {
      console.log('Error Toggling User Status', error);
    }
  };


  return (
    <div className="user-management">
      <AdminSidebar />

      <div className="container">
        <table className="table" id="userDatatable">
          <thead>
            <tr>
              <th>id</th>
              <th>profile</th>
              <th>username</th>
              {/* <th>status</th> */}
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPersons.map((person, id) => (
              <tr key={id}>
                <td>{id + 1}</td>
                <td><img src={person.coverPicture? serverPublic + person.profilePicture : serverPublic + "defaultProfile.png" } alt="" /></td>
                <td>{person.username}</td>
                {/* <td>{person._id === user?.id ? 'Active' : 'Inactive'}</td> */}
                <div className="actioBtn">
                <button onClick={() => handleToggleBlockUser(person._id, person.blocked)} className={person.blocked ? "unblockbtn" : "blocktbn"} style={{ color: 'white', background: person.blocked ? 'red' : 'rgba(0, 60, 255, 0.584)' }}>
                    {person.blocked ? "Unblock" : "Block"}
                  </button>
                </div>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ConfirmationModal
        isOpen={confirmationModal.isOpen}
        onClose={() => handleConfirmation(false)}
        onConfirm={() => handleConfirmation(true)}
        message={confirmationModal.message}
      />

<div className="pagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(persons.length / itemsPerPage)}>Next</button>
      </div>

    </div>
  );
}

export default AdminUserManagement;
