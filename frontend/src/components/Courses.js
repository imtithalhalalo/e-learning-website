import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Button from './Button';

const Courses = () => {
  const [ courses, setCourses ] = useState([])
  const [ instructors, setInstructors ] = useState([])
  const [ instructorId, setInstructorId ] = useState([])
  const [ courseName, setCourseName ] = useState([])
const getCourses = async () => {
  try {
        const res = await axios.get("http://127.0.0.1:8000/api/v0.1/retrievecourses")
        
        setCourses(res.data);  // set State
  
  } catch (err) {
    console.error(err.message);
  }
};

const getInstructors = async () => {
    try {
  const res = await axios.get("http://127.0.0.1:8000/api/v0.1/getinstructors")
      
      setInstructors(res.data);  // set State
    
    } catch (err) {
      console.error(err.message);
    }
  };
const assignInstructor = async () => {
    const data = {
        id: instructorId,
        title: courseName
    }
    console.log(data)
    // console.log(instructorId);
    // console.log(courseName);
    try {
        await axios.post("http://127.0.0.1:8000/api/v0.1/assigninstructor", data,
        { headers: {'Authorization': `Bearer ${localStorage.getItem(`token`)}`}}).then(response=>{
           console.log(response);
        });

        console.log('success')  
    } catch (err) {
        console.error(err.message);
    }
    
}
  useEffect(()=>{
    getInstructors()
    getCourses()
  },[])  
return (
    <main className="container-add bg-white">
     <h2>Courses</h2>
     <ul >
       {courses.map(course=>(
        
         <li className="boxes" key={course._id}>
         <div className='box'>
         <h4>{course.title} </h4>
         <Button btn="btn-2" text={"Assign Instructor"} onClick={ assignInstructor }/>
         </div>
         
         <div className="form-control">
            
                <select className="choose" name="user_type" onChange={
                    (e) => {setInstructorId(e.target.value);
                    setCourseName(course.title);
                }}>
                {instructors.map(instructor => (
                    <option value={instructor._id}>{instructor.name}</option>
                ))}
                </select>
            
            
          </div>
         </li>
       ))}
     </ul>
    </main>
  );
}
export default Courses;