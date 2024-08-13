import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function AddUsers() {
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    function fetchRoles() {
      axios
        .get("http://localhost:3000/api/v1/roles")
        .then((response) => {
          console.log(response.data);
          if (response.data && Array.isArray(response.data.roles)) {
            setRoles(response.data.roles);
          } else {
            console.error("Unexpected response format:", response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching roles:", error);
        });
    }
    fetchRoles();
  }, []);

  const validationSchema = Yup.object({
    displayName: Yup.string().required("Display Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
    status: Yup.string().required("Status is required"),
    role: Yup.string().required("Role is required"),
  });

  function handleSubmit(values) {
    axios
      .post("http://localhost:3000/api/v1/users", values)
      .then((response) => {
        console.log(response);
        navigate("/ShowUsers");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="form-container">
      <h2>Add User</h2>
      <Formik
        initialValues={{
          displayName: "",
          email: "",
          username: "",
          password: "",
          status: "",
          role: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <div>
              <Field
                type="text"
                name="displayName"
                placeholder="Enter Display Name"
              />
              <ErrorMessage name="displayName" component="div" />
            </div>
            <div>
              <Field type="email" name="email" placeholder="Enter Email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <Field type="text" name="username" placeholder="Enter Username" />
              <ErrorMessage name="username" component="div" />
            </div>
            <div>
              <Field as="select" name="role">
                <option value="">Select a role</option>
                {roles.map((role) => (
                  <option key={role._id} value={role._id}>
                    {role.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="role" component="div" />
            </div>
            <div>
              <Field
                type="password"
                name="password"
                placeholder="Enter Password"
              />
              <ErrorMessage name="password" component="div" />
            </div>
            <div>
              <Field as="select" name="status">
                <option value="">Select Status</option>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </Field>
              <ErrorMessage name="status" component="div" />
            </div>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddUsers;
