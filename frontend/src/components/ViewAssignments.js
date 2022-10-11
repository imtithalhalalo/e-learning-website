import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const ViewAssignments = () => {
    const [assignments, setAssignments] = useState([]);
    const navigate = useNavigate();
    const getAssignments = async () => {
        const course_id = localStorage.getItem('course_id');
        try {
            await axios.get(`http://127.0.0.1:8000/api/v0.1/viewassignments/${course_id}`,
                { headers: { 'Authorization': `Bearer ${localStorage.getItem(`token`)}` } })
                .then(response => {
                    console.log(response.data.assignments)
                    setAssignments(response.data.assignments)
                });
            console.log('success')
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getAssignments()
    }, [])
    return (
        <main className="container-add">
            <div className="bar">
                <h2>My Assignments </h2>
                <img src={process.env.PUBLIC_URL + "images/assignment.png"} alt=""
                    width="28px"
                    height="28px" />
            </div>
            <br></br>
            <ul >
                {assignments.map(assignment => (

                    <li className="boxes" key={assignment._id}>
                        <div className='box-white'>
                            <div className='contenth1'>
                                <h3>
                                    {assignment.title}
                                </h3>
                                <p>
                                    {assignment.desc}
                                </p>
                                <Button btn="btn-4" text={"Open Assignment"} onClick={
                                    (e) => {
                                        e.preventDefault();
                                        localStorage.setItem('assignment_id', assignment._id)
                                        navigate('/student_submit_assignments')
                                    }
                                }
                                />
                            </div>
                        </div>

                    </li>
                ))}
            </ul>
        </main>
    )
}

export default ViewAssignments