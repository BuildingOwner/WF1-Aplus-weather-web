import React from "react";
import { Link } from "react-router-dom";
import "../../css/Sidebar/Sidebar.css";
function Sidebar() {
  return (
    <nav className="nav flex-column">
      <Link className="nav-link active" to="/">
        <i className="bi bi-house"></i>
      </Link>
      <Link className="nav-link" to="/week/">
        <i className="bi bi-calendar"></i>
      </Link>
      <Link className="nav-link" to="/airPollution/">
        <i class="bi bi-globe"></i>
      </Link>
      <Link className="nav-link" to="/news/">
        <i className="bi bi-tornado"></i>
      </Link>
    </nav>
  );
}

export default Sidebar;
