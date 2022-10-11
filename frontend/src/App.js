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
import CreateAssignment from './components/CreateAssignment';
import CreateAnnouncement from './components/CreateAnnouncement';
import ViewCourses from './components/ViewCourses';
import ViewAssignments from './components/ViewAssignments';
import SubmitAssignment from './components/SubmitAssignment';

function App() {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);

  const register = async (user) => {
    const data = {
      name: user.name,
      email: user.email,
      password: user.password,
      user_type: user.user_type
    }

    await axios.post("http://127.0.0.1:8000/api/v0.1/register", data).then(response => {
      const res = response.data;
      setUsers([...users, res]);
    });

    window.location.pathname = '/login';
  };

  const login = async (user) => {
    const data = {
      email: user.email,
      password: user.password
    }

    await axios.post("http://127.0.0.1:8000/api/v0.1/login", data).then(response => {
      localStorage.setItem("token", response.data.authorisation.token);
      if (response.data.user.user_type === 'admin')
        window.location.pathname = '/admin_add_person';
      else if (response.data.user.user_type === 'instructor')
        window.location.pathname = '/instructor_add_student';
      else if (response.data.user.user_type === 'student')
        window.location.pathname = '/student_view_courses';

    }).catch(() => { alert('Wrong Email and/or password! ') });
  };

  const addPerson = async (user) => {
    const data = {
      name: user.name,
      email: user.email,
      password: '12345',
      user_type: user.user_type
    }
    await axios.post("http://127.0.0.1:8000/api/v0.1/addstudent", data
      , { headers: { 'Authorization': `Bearer ${localStorage.getItem(`token`)}` } }).then(response => {
        const res = response.data;
        setUsers([...users, res]);
        alert('Added Successfully')
      });
  };

  const addCourse = async (course) => {
    const data = {
      title: course.title,
      desc: course.desc,
      imageExtension: course.imageExtension,
      encryptedImage: course.encryptedImage
    }

    await axios.post("http://127.0.0.1:8000/api/v0.1/addcourse", data
      , { headers: { 'Authorization': `Bearer ${localStorage.getItem(`token`)}` } }).then(response => {
        const res = response.data;
        setCourses([...courses, res]);
        alert('Course Added Successfully! ')
      });


  };

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register onAdd={register} />} />
        <Route path="/login" element={<Login onAdd={login} />} />
        <Route path="/admin_add_person" element={
          <>
            <Navbar User="Admin" text1={"Add Student Or Instructor"} text2={"Add Course"} text3={""} text4={""}
              path1="/admin_add_person" path2="/admin_add_course" path3="" path4=""
            />
            <AddPerson onAdd={addPerson} />
          </>

        } />
        <Route path="/admin_add_course" element={
          <>
            <>
              <Navbar User="Admin" text1={"Add Student Or Instructor"} text2={"Add Course"} text3={""} text4={""}
                path1="/admin_add_person" path2="/admin_add_course" path3="" path4=""
              />

            </>
            <AddCourse onAdd={addCourse} />
            {(
              <Courses
                courses={courses}
              />
            )}

          </>

        } />

        <Route path="/instructor_add_student" element={
          <>
            <Navbar User="Instructor" text1={"Add Student "} text2={"Create Assignment"} text3={"Create Announcement"} text4={"Add Student To Course "}
              path1="/instructor_add_student" path2="/instructor_create_assignment" path3="/instructor_create_announcement" path4={"/instructor_add_student_to_course"}
            />
            <AddStudent onAdd={addPerson} />
          </>

        } />


        <Route path="/instructor_create_assignment" element={
          <>
            <Navbar User="Instructor" text1={"Add Student "} text2={"Create Assignment"} text3={"Create Announcement"} text4={"Add Student To Course "}
              path1="/instructor_add_student" path2="/instructor_create_assignment" path3="/instructor_create_announcement" path4={"/instructor_add_student_to_course"}
            />
            <CreateAssignment />
          </>

        } />

        <Route path="/instructor_create_announcement" element={
          <>
            <Navbar User="Instructor" text1={"Add Student "} text2={"Create Assignment"} text3={"Create Announcement"} text4={"Add Student To Course "}
              path1="/instructor_add_student" path2="/instructor_create_assignment" path3="/instructor_create_announcement" path4={"/instructor_add_student_to_course"}
            />
            <CreateAnnouncement />

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


        <Route path="/student_view_courses" element={
          <>
            <Navbar User="Student" text1={"View Courses"} text2={"View All Assignments"} text3={""} text4={""}
              path1="/student_view_courses" path2="/student_view_assignments" path3="" path4=""
            />
            <ViewCourses />

          </>

        } />

        <Route path="/student_view_assignments" element={
          <>
            <Navbar User="Student" text1={"View Courses"} text2={"View All Assignments"} text3={""} text4={""}
              path1="/student_view_courses" path2="/student_view_assignments" path3="" path4=""
            />
            <ViewAssignments />

          </>

        } />

        <Route path="/student_submit_assignments" element={
          <>
            <Navbar User="Student" text1={"View Courses"} text2={"View All Assignments"} text3={""} text4={""}
              path1="/student_view_courses" path2="/student_view_assignments" path3="" path4=""
            />
            <SubmitAssignment />

          </>

        } />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
