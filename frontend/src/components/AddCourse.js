import { useState } from "react";

const AddCourse = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const profile_image = document.getElementById("file-input");
    const readFile = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
    
          reader.onload = res => {
            resolve(res.target.result);
          };
          reader.onerror = err => reject(err);
    
          reader.readAsDataURL(file);
        });
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        if (!title || !desc) {
          alert("Fill All Fields");
          return;
        }
        // Encrypt Image
        let encryptedImage = await readFile(profile_image.files[0]);   
        encryptedImage = encryptedImage.split(",")[1];

        const imageExtension = profile_image.files[0].name.split(".")[profile_image.files[0].name.split(".").length -1];
        onAdd({ title, desc, encryptedImage, imageExtension});
        
        setTitle("");
        setDesc("");
    };
    return (
      <main className="container-add">
        <form className="add-form" onSubmit={onSubmit}>
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