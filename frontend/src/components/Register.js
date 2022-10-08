import { useRef, useState, useEffect } from "react";

const Register = ({ onAdd }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    return (
      <main className="container">
        <form className="add-form">
        <h2>Sign Up</h2>
          <div className="form-control">
            <label>Name</label>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-control">
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-control">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input type={"submit"} value="Sign Up" className="btn btn-block" />
        </form>
    </main>
    )
}

export default Register