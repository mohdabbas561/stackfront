import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserList.css'

const UserList = () => {
const [users, setUsers] = useState([]);

useEffect(() => {
const fetchUsers = async () => {
const response = await axios.get('/api/users');
setUsers(response.data);
};
fetchUsers();
}, []);

return (
    <div>
  <h1>Registered Users</h1>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Date of Birth</th>
        <th>Phone Number</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user) => (
        <tr key={user._id}>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.dob}</td>
          <td>{user.number}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    );
    };
    
    export default UserList;