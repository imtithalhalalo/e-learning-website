import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <section className="header background">
    <div className="nav-links">
    
        <Link to={"/admin_add_person"}>
        
            
                <span>Add Student Or Instructor</span>

            
        </Link>
        <Link to={"/admin_add_course"}>

            
                <span>Add Course</span>
            
            
        </Link>
        
    </div>
        
    </section>
  );
};

export default Navbar;