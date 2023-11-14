import React from "react";
import "../../css/Sidebar/Sidebar.css";
function Sidebar() {
  return (
    <nav className="nav flex-column">
      <a className="nav-link active" aria-current="page" href="#">
        <i className="bi bi-house"></i>
      </a>
      <a className="nav-link" href="#">
        <i className="bi bi-calendar"></i>
      </a>
      <a className="nav-link" href="#">
        <i class="bi bi-globe"></i>
      </a>
      <a className="nav-link" href="#">
        <i className="bi bi-tornado"></i>
      </a>
    </nav>
  );
}

export default Sidebar;
