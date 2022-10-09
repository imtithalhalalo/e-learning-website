import React,{useEffect,useState} from 'react'
import axios from 'axios'

const Courses = () => {
  const [ courses, setCourses ] = useState([])
  
const getCourses = async () => {
  try {
    const res = await axios.get("http://127.0.0.1:8000/api/v0.1/retrievecourses")
        
        setCourses(res.data);  // set State
  
  } catch (err) {
    console.error(err.message);
  }
};


  useEffect(()=>{
    
    getCourses()
  },[])  
return (
    <main className="container-add">
     <h2>Courses</h2>
     <ul >
       {courses.map(course=>(
        
         <li className="boxes" key={course._id}>
         <div className='box'>
         <p>{course.title} </p>
         </div>
         </li>
       ))}
     </ul>
    </main>
  );
}
export default Courses;