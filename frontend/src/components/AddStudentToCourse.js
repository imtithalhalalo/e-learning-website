import { useState, useEffect } from "react";
import axios from 'axios'

const AddStudentToCourse = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [courseId, setCourseId] = useState('');
    const [courses, setCourses ] = useState([])
    const [user_type, setUserType] = useState('student');
    const getCourses = async () => {
        try {
              const res = await axios.get("http://127.0.0.1:8000/api/v0.1/retrievecourses")
              
              setCourses(res.data);  // set State
        
        } catch (err) {
          console.error(err.message);
        }
      };
      const addStudentToCourse = async (e) => {
        e.preventDefault();
        if (!name || !email) {
          alert("Fill All Fields");
          return;
        }
        setUserType('student')
        
        setName("");
        setEmail("");
        const data = {
            email: email,
            course_id: courseId
        }
        console.log(data)
        try {
            await axios.post("http://127.0.0.1:8000/api/v0.1/enrollstudent", data,
            { headers: {'Authorization': `Bearer ${localStorage.getItem(`token`)}`}}).then(response=>{
               console.log(response);
            });
    
            console.log('success')  
        } catch (err) {
            console.error(err.message);
        }
        
    }
    useEffect(()=>{
        getCourses()
    },[])  
    return (
      <main className="container-add">
        <form className="add-form" onSubmit={addStudentToCourse}>
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