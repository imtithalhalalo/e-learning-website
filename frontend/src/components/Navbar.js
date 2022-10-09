import { Link } from "react-router-dom";

const Navbar = ({User, text1 , text2 , text3, text4, path1, path2, path3, path4} ) => {
  return (
    <section className="header background">
    <div className="nav-links">
        <div className="bar">
        <img src={process.env.PUBLIC_URL+"images/e-learning-logo.png"} alt=""
          width="48px"
          height="48px"/>
        <h2>{User}</h2>
        </div>
        
        <Link to={path1}>
          <span>{text1}</span>
        </Link>
        <Link to={path2}>
          <span>{text2}</span>
        </Link>
        <Link to={path3}>
          <span>{text3}</span>
        </Link>
        <Link to={path4}>
          <span>{text4}</span>
        </Link>
    </div>
        
    </section>
  );
};

export default Navbar;