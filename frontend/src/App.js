import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/Navbar';
import AddPerson from './components/AddPerson';
import AddCourse from './components/AddCourse';
import Courses from './components/Courses';
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';
import AddStudent from './components/AddStudent';
import AddStudentToCourse from './components/AddStudentToCourse';

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
        }else if (response.data.user.user_type === 'instructor') {
          localStorage.setItem("token", response.data.authorisation.token);
          window.location.pathname = '/instructor_add_student';
        }
    });
  };

  const addPerson = async (user) => {
    // console.log(user.name, user.email, user.user_type)
    const data ={
      name: user.name,
      email: user.email,
      password: '12345',
      user_type: user.user_type
    }
    if (user.user_type === 'student'){
      await axios.post("http://127.0.0.1:8000/api/v0.1/addstudent", data
      , { headers: {'Authorization': `Bearer ${localStorage.getItem(`token`)}`}}).then(response=>{
          const res = response.data;
          setUsers([...users, res]);
      });
    }else if (user.user_type === 'instructor') {
      await axios.post("http://127.0.0.1:8000/api/v0.1/addinstructor", data
      , { headers: {'Authorization': `Bearer ${localStorage.getItem(`token`)}`}}).then(response=>{
          const res = response.data;
          setUsers([...users, res]);
      });
    }
    

  };

  const addCourse = async (course) => {
    // console.log(course.title, course.desc, course.imageExtension, course.encryptedImage)
    const data ={
      title: course.title,
      desc: course.desc,
      imageExtension: course.imageExtension,
      encryptedImage: course.encryptedImage
    }
    
    await axios.post("http://127.0.0.1:8000/api/v0.1/addcourse", data
    , { headers: {'Authorization': `Bearer ${localStorage.getItem(`token`)}`}}).then(response=>{
        const res = response.data;
        setCourses([...courses, res]);
    });
    

  };

  const addStudentToCourse = async (course) => {
    const data ={
      course_id: course._id,
      
    }
    
    await axios.post("http://127.0.0.1:8000/api/v0.1/addcourse", data
    , { headers: {'Authorization': `Bearer ${localStorage.getItem(`token`)}`}}).then(response=>{
        const res = response.data;
        setCourses([...courses, res]);
    });
  }
  return (

      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register onAdd={ register }/>} />
          <Route path="/login" element={<Login onAdd={ login }/>} />
          <Route path="/admin_add_person" element={
            <>
              <Navbar User="Admin" text1={"Add Student Or Instructor"} text2={"Add Course"} text3={""}
                path1="/admin_add_person" path2="/admin_add_course" path3=""
              />
              <AddPerson onAdd={ addPerson }/>
            </>
          
          } />
          <Route path="/admin_add_course" element={
            <>
            <>
              <Navbar User="Admin" text1={"Add Student Or Instructor"} text2={"Add Course"} text3={""}
                path1="/admin_add_person" path2="/admin_add_course" path3=""
              />
              
            </>
            <AddCourse onAdd={ addCourse }/>
            {(
                  <Courses
                    courses={ courses }
                  />
                )}
              
            </>
          
          } />

          <Route path="/instructor_add_student" element={
            <>
              <Navbar User="Instructor" text1={"Add Student "} text2={"Create Assignment"} text3={"Create Announcement"} text4={"Add Student To Course "}
                path1="/instructor_add_student" path2="/instructor_create_assignment" path3="/instructor_create_announcement" path4={"/instructor_add_student_to_course"}
              />
              <AddStudent onAdd={ addPerson }/>
            </>
          
          } />

          <Route path="/instructor_add_student_to_course" element={
            <>
              <Navbar User="Instructor" text1={"Add Student "} text4={"Add Student To Course "} text2={"Create Assignment"} text3={"Create Announcement"}
                path1="/instructor_add_student" path2="/instructor_create_assignment" path3="/instructor_create_announcement" path4={"/instructor_add_student_to_course"}
              />
              <AddStudentToCourse />
            </>
          
          } />
        </Routes>
      </BrowserRouter>
      
  );
}

export default App;
