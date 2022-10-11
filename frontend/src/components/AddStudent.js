import { useState } from "react";

const AddStudent = ({ onAdd }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [user_type, setUserType] = useState('student');
    const onSubmit = (e) => {
        e.preventDefault();
        if (!name || !email) {
          alert("Fill All Fields");
          return;
        }
        setUserType('student')
        onAdd({ name, email, user_type });
    
        setName("");
        setEmail("");
    };
    return (
      <main className="container-add">
        <form className="add-form" onSubmit={onSubmit}>
        <div className="bar-2">
          <h2>Add Student </h2>
          <img src={process.env.PUBLIC_URL+"images/user.png"} alt=""
            width="28px"
            height="28px"/>
        </div>
          
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

          <input type={"submit"} value="Add" className="btn btn-block" />
        </form>
    </main>
    )
}

export default AddStudent