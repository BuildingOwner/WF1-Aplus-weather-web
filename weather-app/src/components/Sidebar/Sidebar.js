import React from "react";
import { Link } from "react-router-dom";
import "../../css/Sidebar/Sidebar.css";
import home from "../../Images/home.png";
import home2 from "../../Images/home2.gif";
import cal from "../../Images/cal.png";
import cal2 from "../../Images/cal2.gif";
import earth from "../../Images/earth.png";
import earth2 from "../../Images/earth2.gif";
import news from "../../Images/news.png";
import news2 from "../../Images/news2.gif";

function Sidebar() {
  return (
    <nav className="nav flex-column">
      <Link className="nav-link active" to="/">
        <img src={home} alt="home icon" className="icon homeicon" />
      </Link>
      <Link className="nav-link active" to="/week/">
        <img src={cal} alt="cal icon" className="icon calicon" />
      </Link>
      <Link className="nav-link active" to="/airPollution/">
        <img src={earth} alt="earth icon" className="icon earthicon" />
      </Link>
      <Link className="nav-link active" to="/news/">
        <img src={news} alt="news icon" className="icon newsicon" />
      </Link>
    </nav>
  );
}

export default Sidebar;
