import React, { useState } from "react";
import Logo from "../../img/logo.png";
import { UilSearch } from "@iconscout/react-unicons";
import "./LogoSearch.css";
import User from "../User/User.jsx";
import { getUsersBySearchQuery } from "../../api/UserRequest.js";
import Swal from 'sweetalert2'; // Import SweetAlert2

function LogoSearch() {
 const [searchQuery, setSearchQuery] = useState("");
 const [searchResults, setSearchResults] = useState([]);
 const [showModal, setShowModal] = useState(false);

 const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter a name to search.',
      });
    } else {
      const results = await getUsersBySearchQuery(searchQuery);
      setSearchResults(results);
      setShowModal(true);
    }
 };

 const closeModal = () => {
    setShowModal(false);
 };

 return (
    <div className="LogoSearch">
      <img src={Logo} alt="logo" />
      <div className="Search">
        <input
          type="text"
          placeholder="Search here..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="search-icon" onClick={handleSearch}>
          <UilSearch />
        </div>
      </div>
      {showModal && (
        <div className="SearchResultsModal">
          <div className="ModalContent">
            <h4>Search Result</h4>
            {searchResults.length > 0 ? (
              searchResults.map((user) => (
                <div style={{ marginBottom: '12px' }}>
                 <User key={user._id} person={user} />
                </div>
              ))
            ) : (
              <p>No results found.</p>
            )}
          </div>
          <button className="searchMoadalCloseButton" onClick={closeModal}>X</button>
        </div>
      )}
    </div>
 );
}

export default LogoSearch;
