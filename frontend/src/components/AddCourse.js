import { useState } from "react";

const AddCourse = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const profile_image = document.getElementById("file-input");
    
    return (
      <main className="container-add">
        <form className="add-form">
          <h2>Add Course</h2>
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
          <div className="image-upload">
              
              <label htmlFor="file-input">
              <img src={process.env.PUBLIC_URL+"images/uploadimg.png"} alt=""
                  width="18px"
                  height="18px"/>
              </label>

              <input id="file-input" type="file" />
              <label>Add Image </label>
            </div>
          <input type={"submit"} value="Add" className="btn btn-block" />
        </form>
    </main>
    )
}

export default AddCourse