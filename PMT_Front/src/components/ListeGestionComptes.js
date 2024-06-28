// Home.js
import React, {useState, useEffect} from 'react';
import "../css styling/GestionComptes.css";
import { faSearch, faEdit, faClose, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import axios from '../axios'; 
import EditFormG from './PopUps/EditFormG';

const ListeGestionComptes = () => {





  //the integration with the backend:
  let [users, setUsers] = useState([]);
  const [filteredData, setFilteredData] = useState(users);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setFilteredData(users);
  }, [users]);
  
  const fetchUsers = async () => {
    try {
      const response = await axios.get('/users');
      const fetchedUsers = response.data.users;
      setUsers(fetchedUsers); // Update the state with fetched data

      console.log(' employeesFetch:',fetchedUsers);
      console.log(' employees2:',users);
    } catch (error) {
      console.log('Error fetching users:', error);
    }
  };

  
  //for the search functionality:
  const [searchTerm, setSearchTerm] = useState('');
  
  //for the pagination:
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);  // Number of items per page, and the default value is 5

  const handleSearch = (event) => {
    console.log('handleSearch called');
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    setCurrentPage(1);

    const filtered = users.filter((item) => {
      const searchString = searchTerm.toLowerCase();
      return (
        
        item.matricule?.toLowerCase().includes(searchString) ||
        item.nom?.toLowerCase().includes(searchString) ||
        item.prenom?.toLowerCase().includes(searchString)
       
        );
    });
    console.log('filtered:', filtered);
    setFilteredData(filtered);
  };


  //for the pagination functionality: 
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem); // Change this line

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  

  //the delete functionality:
  const handleDelete = async (matricule) => {
    try {
      const response = await axios.delete(`/supprimerUser/${matricule}`); // Assuming your API endpoint for deleting a user is /users/:id
      fetchUsers();
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.log('Error deleting user:', error);
    }
  };
  
  

  //the confirmation before executing the deletion:
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [matriculeToDelete, setMatriculeToDelete] = useState('');

  const openDeleteConfirmation = (matricule) => {
    setMatriculeToDelete(matricule);
    setShowDeleteConfirmation(true);
  };



  //for the edit functionality:
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleIconClick = (item) => {
    setPopupOpen(true);
    setSelectedUser(item);
  };
  //to close the edit window:
  const handlePopupClose = () => {
    setPopupOpen(false);
  };
  







   return (
    <div className="gestion-comptes-container">
      <div className="search-download-container">
      <div className="search-input-container">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      </div>
      
        <div className="scrollable-container">
        <div className="table-container">
          <table className="data-table">            
              <thead >
                <tr>
                <th style={{ width: '5%' }}>N°</th>
                <th style={{ width: '15%' }}>Matricule</th>
                  <th style={{ width: '20%' }}>Nom</th>
                  <th style={{ width: '20%' }}>Prénom</th>
                  <th className='form-action' style={{ width: '5%' }}>Action</th>
                </tr>
              </thead>
        
              <tbody>
                {/*<p>valeur de currentData: {currentData}</p>*/}
                {currentData.map((item, index) => (
                  <tr key={item.id}>
                    <td style={{ width: '10%' }}>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                     
                    <td style={{ width: '15%' }}>{item.matricule}</td>
                    <td style={{ width: '20%' }}>{item.nom} </td>                   
                    <td style={{ width: '20%' }}>{item.prenom}</td>                  
                    <td style={{ width: '5%' }}>
                      <FontAwesomeIcon
                         icon={faTrash}
                         style={{ cursor: 'pointer', color: '#ff0000' }}
                         onClick={() => openDeleteConfirmation(item.matricule)}
                      /> <span>  </span> <span>  </span>
                      <FontAwesomeIcon
                         icon={faEdit}
                         style={{ cursor: 'pointer', color: '#f48220' }}
                         onClick={() => handleIconClick(item)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
          </table>
          </div>
        </div>
        <div className="pagin-container">
            {/*Pagination*/}
            <div className="pagination">
              <ul>
                {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, index) => (
                  <li
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={currentPage === index + 1 ? 'active' : ''}
                  >
                    {index + 1}
                  </li>
                ))}
              </ul>
            </div>
            {/*changing the number of items displayed per page*/}
            <div className="items-per-page">
              
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={(event) => setItemsPerPage(Number(event.target.value))}
              >
                <option value={100}>5</option>
                <option value={1000}>10</option>
                <option value={10000}>15</option>
                {/* Add more options as needed */}
              </select>
            </div>
        </div>

       {/* Delete Confirmation Popup */}
        {showDeleteConfirmation && (
          <div className="confirmation-popup">
            <p>Voulez-vous vraiement supprimer cet utilisateur, lors de la suppression ce dernier perdera son droit d'accés à cette application ?</p>
            <button onClick={() => handleDelete(matriculeToDelete)}>Confirmer</button>
            <button onClick={() => setShowDeleteConfirmation(false)}>Annuler</button>
          </div>
        )}

        {/* the Edit Functionality*/}
        <div>
          {isPopupOpen && (
            <div>
              <div className="overlay" onClick={handlePopupClose} />
              <div className="popup-container">
                <div className="popup">
                  <div className="popup-header">
                    <button className="close-button" onClick={handlePopupClose}>
                      <FontAwesomeIcon icon={faClose}  />
                    </button>
                  </div>
                  <div className="popup-content-scrollable">
                    <EditFormG onClose={handlePopupClose} selectedUser={selectedUser} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        

    </div>
  );
};

export default ListeGestionComptes;