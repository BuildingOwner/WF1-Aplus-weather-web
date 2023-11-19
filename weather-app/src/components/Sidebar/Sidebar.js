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
      <Link className="nav-link active" aria-current="page" to="/">
        <i className="bi bi-house"></i>
      </Link>
      <Link className="nav-link" to="/week/">
        <i className="bi bi-calendar"></i>
      </Link>
      <Link className="nav-link" to="/airPollution/">
        <i className="bi bi-globe"></i>
      </Link>
      <Link className="nav-link" to="/news/">
        <i className="bi bi-tornado"></i>
      </Link>
      {user ? (
            <div className="right">
              <UserInfo>{user.username}</UserInfo>
              <Button onClick={onLogout}><i className="bi bi-box-arrow-left"></i></Button>
            </div>
          ) : (
            <div className="right">
              <Button to="/login"><i className="bi bi-box-arrow-in-right"></i></Button>
            </div>
          )}
    </nav>
  );
}

export default Sidebar;
