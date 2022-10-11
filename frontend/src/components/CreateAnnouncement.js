import { useState, useEffect } from "react";
import axios from 'axios'

const CreateAnnouncement = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [courseId, setCourseId] = useState('');
  const [courses, setCourses] = useState([])
  const getCourses = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/v0.1/retrievecourses")

      setCourses(res.data);

    } catch (err) {
      console.error(err.message);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!title || !desc) {
      alert("Fill All Fields");
      return;
    }


    setTitle("");
    setDesc("");

    const data = {
      title: title,
      desc: desc,
      course_id: courseId
    }
    console.log(data)
    try {
      await axios.post("http://127.0.0.1:8000/api/v0.1/createannouncement", data,
        { headers: { 'Authorization': `Bearer ${localStorage.getItem(`token`)}` } }).then(response => {
          alert(response.data.message)
        });

    } catch (err) {
      console.error(err.message);
    }

  };
  useEffect(() => {
    getCourses()
  }, [])
  return (
    <main className="container-add">
      <form className="add-form" onSubmit={onSubmit}>
        <div className="bar">
          <h2>Add Announcement </h2>
          <img src={process.env.PUBLIC_URL + "images/announcement.png"} alt=""
            width="28px"
            height="28px" />
        </div>
        <div className="form-control">
          <label>Title</label>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label>Description</label>
          <textarea
            type="text"
            placeholder="Enter Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={10}
          ></textarea>
        </div>

        <div className="form-control">
          <label>Choose Course</label>
          <select className="choose" name="user_type" onChange={
            (e) => {
              setCourseId(e.target.value);
            }}>
            {courses.map((course, index) => (
              <option key={index} value={course._id}>{course.title}</option>
            ))}
          </select>
        </div>
        <input type={"submit"} value="Add" className="btn btn-block" />
      </form>
    </main>
  )
}

export default CreateAnnouncement