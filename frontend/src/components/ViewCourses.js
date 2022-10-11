import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const ViewCourses = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();
    const getCoursesEnrolledIn = async () => {
        try {
            await axios.get("http://127.0.0.1:8000/api/v0.1/viewcourses", { headers: { 'Authorization': `Bearer ${localStorage.getItem(`token`)}` } }).then(response => {
                setCourses(response.data.courses)
            });

            console.log('success')
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getCoursesEnrolledIn()
    }, [])
    return (
        <main className="container-add">
            <div className="bar">
                <h2>My Courses</h2>
                <img src={process.env.PUBLIC_URL + "images/courses.png"} alt=""
                    width="28px"
                    height="28px" />
            </div>
            <br></br>
            <ul >
                {courses.map(course => (

                    <li className="boxes" key={course._id}>
                        <div className='box-white' onClick={(e) => {
                            localStorage.setItem('course_id', course._id)
                            window.location.pathname = `/student_view_assignments`
                        }}>
                            <div className='content'>
                                <h4>
                                    {course.title}
                                </h4>
                                <p>
                                    {course.desc}
                                </p>
                            </div>
                            <div>
                                <Button onClick={
                                    (e) => {
                                        localStorage.setItem('course_id', course._id)
                                        navigate(`/student_view_assignments`)
                                    }
                                }
                                    btn="btn-3"
                                    text="Assignments" />
                            </div>
                        </div>

                    </li>
                ))}
            </ul>
        </main>
    )
}

export default ViewCourses


