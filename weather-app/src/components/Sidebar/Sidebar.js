import React from "react";
import { Link } from 'react-router-dom';
import "../../css/Sidebar/Sidebar.css";
function Sidebar() {
  return (
    <nav className="nav flex-column">
      <Link to="/">
        <a className="nav-link active" aria-current="page" href="#">
          <i className="bi bi-house"></i>
        </a>
      </Link>
      <Link to="/week/">
        <a className="nav-link" href="#">
          <i className="bi bi-calendar"></i>
        </a>
      </Link>
      <Link to="/airPollution/">
        <a className="nav-link" href="#">
          <i class="bi bi-globe"></i>
        </a>
      </Link>
      <Link to="/news/">
        <a className="nav-link" href="#">
          <i className="bi bi-tornado"></i>
        </a>
      </Link>
    </nav>
  );
}

export default Sidebar;
