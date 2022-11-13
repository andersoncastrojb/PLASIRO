import * as React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Avatar from '@mui/material/Avatar';
import avatar from "../../Icons/avatar.png";
import { useSelector } from 'react-redux'

function SimpleDialog(props) {

  const loginUser = useSelector((state) => state.Users.loginUser);

  const { onClose, open } = props;

  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
       <center>
        <DialogTitle style={{width: "300px"}}>
            <div className="navbar-item">
                <center>
                    {
                    isAuthenticated
                    ? <Link to="/user-profile"><Avatar style={{marginBottom: "1rem"}} alt="" src={user.picture} /></Link>
                    : <Avatar style={{marginBottom: "1rem"}} alt="" src={avatar} />
                    }

                    {
                    isAuthenticated
                        ? <Link className="button is-black" onClick={() => logout({ returnTo: window.location.origin })} to="/">Log out</Link>
                        : <Link className="button is-primary" onClick={() => loginWithRedirect()} to="/">Log in</Link>
                    }
                </center>
            </div>
        </DialogTitle>
        <div className="column">
            <Link className="button is-link is-light" onClick={handleClose} to="/">Inicio</Link>
        </div>
        {
          loginUser.permissions.includes("tutor")
          ?
          <div className="column">
            <Link className="button is-link is-light" onClick={handleClose} to="/form-tutor">Formulario Monitor</Link>
          </div>
          : <></>
        }
        {
          loginUser.permissions.includes("admin")
          ?
          <>
            <div className="column">
              <Link className="button is-link is-light" onClick={handleClose} to="/admin-cites">Administrar citas</Link>
            </div>
            <div className="column">
              <Link className="navbar-item" to="/admin-new-tutors">Administrar monitores nuevos</Link>
            </div>
            <div className="column">
              <Link className="button is-link is-light" onClick={handleClose} to="/form-tutor">Formulario Monitor</Link>
            </div>
          </>
          : <></>
        }
        <div className="column">
            <Link className="button is-link is-light" onClick={handleClose} to="/list-tutor">Todos los monitores</Link>
        </div>
        <div className="column">
            <Link className="button is-link is-light" onClick={handleClose} to="/basic-info">Quienes somos</Link>
        </div>
        <div className="column">
            <Link className="button is-link is-light" onClick={handleClose} to="/guide">Guía rápida</Link>
        </div>

      </center>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default function Burger() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{width: "100px"}}>
      <Link 
        role="button"
        className="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        onClick={handleClickOpen}
        >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        </Link>
      <SimpleDialog
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
