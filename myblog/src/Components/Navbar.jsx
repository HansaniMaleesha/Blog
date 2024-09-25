import React from 'react';
//import './Navbar.css';
import Logo from '../img/logo.png';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext.jsx';
import { useContext } from 'react';

function Navbar() {

  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/" className="link">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/?cat=art">
            <h6>ART</h6>
          </Link>
          <Link className="link" to="/?cat=cinema">
            <h6>CINEMA</h6>
          </Link>
          <Link className="link" to="/?cat=design">
            <h6>DESIGN</h6>
          </Link>
          <Link className="link" to="/?cat=economy">
            <h6>ECONOMY</h6>
          </Link>
          <Link className="link" to="/?cat=tech">
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link className="link" to="/?cat=food">
            <h6>FOOD</h6>
          </Link>
          <span className="username">{currentUser?.username}</span>
          {currentUser ? (
            <span className="btn-logout" onClick={logout}>Logout</span>
          ) : (
            <Link className="btn-login link" to="/login">Login</Link>
          )}
          <span className="write">
            <Link className="link" to="/write">Write</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
