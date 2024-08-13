import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import './RoleForm.css'

const RoleForm = () => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState(true); 
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/v1/roles', { name, status });
      console.log('Role added:', response.data);
      setName('');
      setStatus(true);
      alert("Role is Added")
    } catch (error) {
      console.error('Error adding role:', error);
    }
  };
  return (
    <div className='outering'>
      <h2 className='hesdingh1'>Add New Role</h2>
      <form onSubmit={handleSubmit}>
        <div className='flexadd'>
          <label htmlFor="name">Role Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className='flexadd'>
          <label htmlFor="status">Status:</label>
          <input
            type="checkbox"
            id="status"
            checked={status}
            onChange={() => setStatus(!status)}
          />
           <span className={status ? 'status-active' : 'status-inactive'}>
            {status ? 'Active' : 'Inactive'}
          </span>
        </div>
        <button type="submit" className='btss'>Add Role</button>
      </form>
    </div>
  );
};

export default RoleForm;