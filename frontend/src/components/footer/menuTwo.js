import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from "react-router-dom";

export default function MenuTwo() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <center>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={{color: "var(--color1)", width: "50%"}}
        className="button is-light"
      >
        MENÚ
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link to="/">Inicio</Link>
        </MenuItem>
        <hr className="navbar-divider" />
        <MenuItem onClick={handleClose}>
          <Link to="/list-tutor">Todos los monitores</Link>
        </MenuItem>
        <hr className="navbar-divider" />
        <MenuItem onClick={handleClose}>
          <Link to="/basic-info">Quienes somos</Link>
        </MenuItem>
        <hr className="navbar-divider" />
        <MenuItem onClick={handleClose}>
          <Link to="/guide">Guía rápida</Link>
        </MenuItem>
      </Menu>
    </center>
  );
}