import React from "react";
import { useNavigate, NavLink ,Link } from 'react-router-dom';
import './Navbar.scss';



const Navbar = () => {
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
          <NavLink to="/login" className="logout-link" activeClassName="active-link">Logout</NavLink>
        </li>
      </ul>
    </nav>
    )
}

export default Navbar;