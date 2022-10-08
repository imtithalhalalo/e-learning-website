import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/Navbar';

import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const register = async (user) => {
    const data ={
      name: user.name,
      email: user.email,
      password: user.password,
      user_type: user.user_type
    }

    await axios.post("http://127.0.0.1:8000/api/v0.1/register", data).then(response=>{
        const res = response.data;
        setUsers([...users, res]);
    });
    
    window.location.pathname = '/login';
  };

  const login = async (user) => {
    const data ={
      email: user.email,
      password: user.password
    }

    await axios.post("http://127.0.0.1:8000/api/v0.1/login", data).then(response=>{
        if(response.data.user.user_type === 'admin') {
          localStorage.setItem("token", response.data.authorisation.token);
          window.location.pathname = '/admin_add_person';
        }
    });
  };

  return (

      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register onAdd={ register }/>} />
          <Route path="/login" element={<Login onAdd={ login }/>} />
          <Route path="/admin_add_person" element={
            <>
              <Navbar />
              
            </>
          
          } />
          <Route path="/admin_add_course" element={
            <>
              <Navbar />
              
            </>
          
          } />
        </Routes>
      </BrowserRouter>
      
  );
}

export default App;
