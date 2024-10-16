import React from "react";
import { useNavigate, NavLink, Link } from 'react-router-dom';
import { Button } from '@mui/material';
import './Navbar.scss';

const Navbar = ({ username }) => {
    return (
      <nav className="navbars">
      <ul className="navbar-list">
        <li className="navbar-item">
          <NavLink to="/flights" activeClassName="active-link">Flights</NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/hotels" activeClassName="active-link">Hotels</NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/cabs" activeClassName="active-link">Cabs</NavLink>
        </li>
          <li className="navbar-item">
          <span className="username">{username}</span>
        <Button component={NavLink} to="/login" className="logout-link" variant="contained"  color="primary">
          Logout
        </Button>
        </li>
      </ul>
    </nav>
    )
}

export default Navbar;