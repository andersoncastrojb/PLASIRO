/* Para manipular las rutas se importa “Link”, el cual modifica las etiquetas “a”. 
   Además se utiliza “Outlet” para anidar rutas secundarias. */ 
import { Outlet, Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
// Importar estilos del componente Navbar
import "../../css/navbar/navbar.css"
// Logo de PLASIRO
import logo from "../img/PLASIRO.png"
import { useAuth0 } from "@auth0/auth0-react";
import Avatar from '@mui/material/Avatar';
import avatar from "../../Icons/avatar.png";


/* Component: Navbar
   Menú principal del aplicativo web */

export default function Navbar() {

    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

    return (
        <div>
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Link className="navbar-item" to="/">
                        <img src={logo} alt="" width={300} height={200} />
                    </Link>
                    <Link
                        role="button"
                        className="navbar-burger"
                        aria-label="menu"
                        aria-expanded="false"
                        data-target="navbarBasicExample"
                        to=""
                    >
                        <span aria-hidden="true" />
                        <span aria-hidden="true" />
                        <span aria-hidden="true" />
                    </Link>
                    </div>
                    <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <Link className="navbar-item" to="/">Home</Link>
                        <Link className="navbar-item" to="/admin-cites">Documentation</Link>
                        <div className="navbar-item has-dropdown is-hoverable">
                        <Link className="navbar-link" to="/">More</Link>
                        <div className="navbar-dropdown">
                            <Link className="navbar-item" to="/form-tutor">About</Link>
                            <NavLink className="navbar-item" to="/user-profile">Jobs</NavLink>
                            <Link className="navbar-item" to="/">Contact</Link>
                            <hr className="navbar-divider" />
                            <Link className="navbar-item" to="/">Report an issue</Link>
                        </div>
                        </div>
                    </div>
                    <div className="navbar-end">
                        <div className="navbar-item">
                        <div className="buttons">
                            {
                            isAuthenticated
                            ? <Link to="/user-profile"><Avatar alt="" src={user.picture} /></Link>
                            : <Avatar alt="" src={avatar} />
                            }

                            {
                            isAuthenticated
                                ? <Link className="button is-black" onClick={() => logout({ returnTo: window.location.origin })} to="/">Log out</Link>
                                : <Link className="button is-primary" onClick={() => loginWithRedirect()} to="/">Log in</Link>
                            }
                        </div>
                        </div>
                    </div>
                </div>
            </nav>
            <Outlet />
        </div>
    );
  }