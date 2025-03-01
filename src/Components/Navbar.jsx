import React from "react";
import { useNavigate, NavLink, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import './Navbar.scss';

const Navbar = ({ username }) => {
    return (
      <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Button color="inherit" component={NavLink} to="/flights" activeclassname="active-link">
            Flights
          </Button>
          <Button color="inherit" component={NavLink} to="/hotels" activeclassname="active-link">
            Hotels
          </Button>
          <Button color="inherit" component={NavLink} to="/cabs" activeclassname="active-link">
            Cabs
          </Button>
        </Typography>

        <Typography variant="body1" sx={{ marginRight: 2 }}>
          {username}
        </Typography>
        <Button component={NavLink} to="/login" variant="contained" color="primary">
          Logout
        </Button>
      </Toolbar>
    </AppBar>
    )
}

export default Navbar;