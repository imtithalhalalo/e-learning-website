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
          <h2>Add Student </h2>
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