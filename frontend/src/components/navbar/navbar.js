/* Para manipular las rutas se importa “Link”, el cual modifica las etiquetas “a”. 
   Además se utiliza “Outlet” para anidar rutas secundarias. */ 
import { Outlet, Link } from "react-router-dom";
// Importar estilos del componente Navbar
import "../../css/navbar/navbar.css"
// Logo de PLASIRO
import logo from "../img/PLASIRO.png"
import { useAuth0 } from "@auth0/auth0-react";
import Avatar from '@mui/material/Avatar';
import avatar from "../../Icons/avatar.png";
import Burger from "./burger";
import { useSelector } from 'react-redux'


/* Component: Navbar
   Menú principal del aplicativo web */

export default function Navbar() {

    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

    const loginUser = useSelector((state) => state.Users.loginUser);

    return (
        <div>
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Link className="navbar-item" to="/">
                        <img src={logo} alt="" width={300} height={200} />
                    </Link>
                    <Burger />
                    </div>
                    <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <Link className="navbar-item" to="/">Inicio</Link>
                        <Link className="navbar-item" to="/list-tutor">Todos los monitores</Link>
                        <div className="navbar-item has-dropdown is-hoverable">
                            <Link className="navbar-link">Más</Link>
                        <div className="navbar-dropdown">

                            {
                            loginUser.permissions.includes("admin")
                                ?
                                <>
                                    <Link className="navbar-item" to="/admin-cites">Administrar citas</Link>
                                    <Link className="navbar-item" to="/form-tutor">Formulario Monitor</Link>
                                </>
                                : <></>
                            }

                            {
                            loginUser.permissions.includes("tutor")
                                ? <Link className="navbar-item" to="/form-tutor">Formulario Monitor</Link>
                                : <></>
                            }
                            <Link className="navbar-item" to="/basic-info">Quienes somos</Link>
                            <hr className="navbar-divider" />
                            <Link className="navbar-item" to="/guide">Guía rápida</Link>
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