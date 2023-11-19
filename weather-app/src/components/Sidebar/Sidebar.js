import React from "react";
import { Link } from 'react-router-dom';
import "../../css/Sidebar/Sidebar.css";
import Button from "../common/Button";
import { styled } from "styled-components";



const UserInfo = styled.div`
  font-weight: 800,
  margin-right: 1rem;
`;


function Sidebar({user,onLogout}) {
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
      {user ? (
            <div className="right">
              <UserInfo>{user.username}</UserInfo>
              <Button onClick={onLogout}><i class="bi bi-box-arrow-left"></i></Button>
            </div>
          ) : (
            <div className="right">
              <Button to="/login"><i class="bi bi-box-arrow-in-right"></i></Button>
            </div>
          )}
    </nav>
  );
}

export default Sidebar;
