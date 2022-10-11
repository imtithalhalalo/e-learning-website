import { useState } from "react";
import axios from 'axios'

const SubmitAssignment = () => {
    const [answer, setAnswer] = useState('');
    
    
    const onSubmit = async (e) => {
        e.preventDefault();
        if (!answer) {
          alert("Fill Your Answer");
          return;
        }
    
        setAnswer("");

        const data = {
            assignment_id: localStorage.getItem('assignment_id'),
            answer: answer
        }
        console.log(data)
        try {
            await axios.post("http://127.0.0.1:8000/api/v0.1/submitassignment", data,
            { headers: {'Authorization': `Bearer ${localStorage.getItem(`token`)}`}}).then(response=>{
               console.log(response);
               alert(response.data.message)
            });
    
            console.log('success')  
        } catch (err) {
            console.error(err.message);
        }
        
    };
    
    return (
      <main className="container-add">
        <form className="add-form" onSubmit={onSubmit}>
          <h2>My Assignment</h2>
          <br></br>
          <div className="form-control">
            <label>My Answer</label>
            <textarea
              type="text"
              placeholder="Enter Description"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows={10}
            ></textarea>
          </div>
          <input type={"submit"} value="Submit Assignment" className="btn btn-block" />
        </form>
      </main>
    )
}

export default SubmitAssignment