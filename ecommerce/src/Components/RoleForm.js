import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { addRoleSchema } from '../schemas';
import './RoleForm.css';

const RoleForm = () => {

  const { values, touched, errors, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      name: '',
      status: true,
    },
    validationSchema: addRoleSchema,
    onSubmit: async (values, actions) => {
      try {
        const response = await axios.post('http://localhost:3000/api/v1/roles', values);
        console.log('Role added:', response.data);
        actions.resetForm();
        alert("Role is Added");
        
      } catch (error) {
        console.error('Error adding role:', error);
      }
    },
  });

  const handleStatusChange = (event) => {
    const isChecked = event.target.checked;
    setFieldValue('status', isChecked);
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
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {errors.name && touched.name ? <p>{errors.name}</p> : null}
        </div>
        <div className='flexadd'>
          <label htmlFor="status">Status:</label>
          <input
            type="checkbox"
            id="status"
            name="status"
            checked={values.status}
            onChange={handleStatusChange}
            onBlur={handleBlur}
          />
          {errors.status && touched.status ? <p>{errors.status}</p> : null}
          <span className={values.status ? 'status-active' : 'status-inactive'}>
            {values.status ? 'Active' : 'Inactive'}
          </span>
        </div>
        <button type="submit" className='btss'>Add Role</button>
      </form>
    </div>
  );
};

export default RoleForm;
