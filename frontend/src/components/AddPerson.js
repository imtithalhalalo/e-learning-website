import { useState } from "react";

const AddPerson = ({ onAdd }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [user_type, setUserType] = useState();
    
    return (
      <main className="container-add">
        <form className="add-form">
          <h2>Add Student or Instructor</h2>
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

            {/* Drop Down to choose student or instructor */}
            <div className="form-control">
            <label>Choose Student or Instructor</label>
            <select className="choose" name="user_type" onChange={(e) => setUserType(e.target.value)}>
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
            </select>
          </div>

          <input type={"submit"} value="Add" className="btn btn-block" />
        </form>
    </main>
    )
}

export default AddPerson