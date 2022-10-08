import './App.css';
import Register from './components/Register';

import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
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

  return (

      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register onAdd={ register }/>} />
        </Routes>
      </BrowserRouter>
      
  );
}

export default App;
