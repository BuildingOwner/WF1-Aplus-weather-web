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
import Button from "../common/Button";
import { styled } from "styled-components";

const UserInfo = styled.div`
  font-weight: 800,
  margin-right: 1rem;
`;

function Sidebar({ user, onLogout }) {
  return (
    <nav className="nav flex-column">
      <Link className="nav-link active" to="/">
        <i className="bi bi-house"></i>
      </Link>
      <Link className="nav-link active" to="/week/">
        <i className="bi bi-calendar4-week"></i>
      </Link>
      <Link className="nav-link active" to="/airPollution/">
        <i className="bi bi-hurricane"></i>
      </Link>
      <Link className="nav-link active" to="/news/">
        <i className="bi bi-newspaper"></i>
      </Link>
      {user ? (
        <div className="right">
          <UserInfo>{user.username}</UserInfo>
          <Button onClick={onLogout}>
            <i className="bi bi-box-arrow-left"></i>
          </Button>
        </div>
      ) : (
        <div className="right">
          <Button to="/login">
            <i className="bi bi-box-arrow-in-right"></i>
          </Button>
        </div>
      )}
    </nav>
  );
}

export default Sidebar;
