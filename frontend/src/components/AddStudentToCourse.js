import { useState } from "react";

const AddStudentToCourse = ({ onAdd }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [courseId, setCourseId] = useState('');
    const [courseTitle, setCourseTitle] = useState('');
    const [ courses, setCourses ] = useState([])
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

          <div className="form-control">
            <label>Choose Course</label>
            <select className="choose" name="user_type" onChange={
                    (e) => {setCourseId(e.target.value);
                }}>
                {courses.map(course => (
                    <option value={course._id}>{course.title}</option>
                ))}
                </select>
          </div>

          <input type={"submit"} value="Add" className="btn btn-block" />
        </form>
    </main>
    )
}

export default AddStudentToCourse