import { Link } from "react-router-dom";

const Navbar = ({User, text1 , text2 , text3, text4, path1, path2, path3, path4} ) => {
  return (
    <section className="header background">
    <div className="nav-links">
        <div className="bar">
        <h2>{User}</h2>
        <img src={process.env.PUBLIC_URL+"images/e-learning-logo.png"} alt=""
          width="48px"
          height="48px"/>
        </div>
        
        <Link to={path1}>
          <img src={process.env.PUBLIC_URL+"images/courses.png"} alt=""
            width="28px"
            height="28px"/>
          <span><h4>{text1}</h4></span>
        </Link>
        <Link to={path2}>
          <img src={process.env.PUBLIC_URL+"images/courses.png"} alt=""
            width="28px"
            height="28px"/>
          <span><h4>{text2}</h4></span>
        </Link>
        <Link to={path3}>
          <span><h4>{text3}</h4></span>
        </Link>
        <Link to={path4}>
          <span><h4>{text4}</h4></span>
        </Link>
    </div>
        
    </section>
  );
};

export default Navbar;