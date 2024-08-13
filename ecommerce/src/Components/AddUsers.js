import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import "./Users.css";

function AddUsers() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  //const [role,setRole] = useState("");
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const navigate = useNavigate();

  // useEffect(() => { const fetchRoles = async () => {
  //     try { const response = await axios.get('http://localhost:3000/api/v1/roles');
  //         console.log(response.data);
  //          setRoles(response.data.roles);
  //     }
  //     catch (error) { console.error('Error fetching roles:', error);
  //          } };
  //     fetchRoles(); }, []);
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/roles");
        console.log(response.data);
        if (response.data && Array.isArray(response.data.roles)) {
          setRoles(response.data.roles);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    fetchRoles();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const newUser = {
      displayName,
      email,
      username,
      //   role: selectedRole,
      password,
      status,
    };
    axios
      .post("http://localhost:3000/api/v1/users", newUser)
      .then((response) => {
        // console.log(response);
        navigate("/ShowUsers");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="form-container">
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Enter Display Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
          required
        />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter Username"
          required
        />
        {/* <select
          id="role"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          required
        >
          <option value="">Select a role</option>
          {roles.map((role) => (
            <option key={role._id} value={role._id}>
              {role.name}
            </option>
          ))}
        </select> */}

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
          required
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="">Select Status</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddUsers;
