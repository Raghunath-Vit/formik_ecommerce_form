import axios from "axios";
import React, { useEffect, useState } from "react";

const Userdetails = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/users")
      .then((response) => {
        setUsers(response.data.users);
        console.log(response);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  return (
    <div className="admin-page">
      <div className="user-list">
        {users?.length > 0 ? (
          users.map((user) => (
            <div key={user._id} className="user-item">
              <h2 className="user-name">{user?.displayName}</h2>
              <p className="user-email">{user?.email}</p>
              <p className="user-username">{user?.username}</p>
            </div>
          ))
        ) : (
          <p className="no-users">No users available.</p>
        )}
      </div>
    </div>
  );
};

export default Userdetails;
