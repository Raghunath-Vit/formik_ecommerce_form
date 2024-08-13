import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function ShowUsers() {
  const [data, setData] = useState([]);
  const [selectUser, setSelectUser] = useState(null);
  const navigate = useNavigate();

  function displayCategory() {
    const url = "http://localhost:3000/api/v1/users";
    axios
      .get(url)
      .then(function (response) {
        setData(response.data.users);
      })
      .catch(function (error) {
        alert("Please try again later.");
        console.error("Error fetching users:", error);
      });
  }

  function UserDetails(userId) {
    const url = `http://localhost:3000/api/v1/users/${userId}`;
    axios
      .get(url)
      .then(function (response) {
        setSelectUser(response.data.user);
        navigate(`/ShowUsers/${userId}`);
      })
      .catch(function (error) {
        alert("Unable to fetch user details.");
        console.error("Error fetching user details:", error);
      });
  }

  function handleDelete(userId) {
    axios
      .delete(`http://localhost:3000/api/v1/users/${userId}`)
      .then(function () {
        displayCategory();
        setSelectUser(null);
        navigate("/ShowUsers");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="container">
      <h1>Show Users</h1>
      <button className="btn" onClick={displayCategory}>
        Load Users
      </button>
      <div className="user-list">
        {data.map(function (user) {
          return (
            <div
              className="user-card"
              key={user._id}
              onClick={function () {
                UserDetails(user._id);
              }}
            >
              <p>
                <b>Email:</b> {user.email}
              </p>
              <p>
                <b>Username:</b> {user.username}
              </p>
              <button
                type="button"
                onClick={function (e) {
                  e.stopPropagation();
                  UserDetails(user._id);
                }}
              >
                View Details
              </button>
            </div>
          );
        })}
      </div>
      {selectUser && (
        <div className="user-details">
          <h2>User Details</h2>
          <p>
            <b>Username:</b> {selectUser.username}
          </p>
          <p>
            <b>Display Name:</b> {selectUser.displayName}
          </p>
          <p>
            <b>Email id:</b> {selectUser.email}
          </p>
          <button
            onClick={function () {
              handleDelete(selectUser._id);
            }}
          >
            User Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default ShowUsers;
