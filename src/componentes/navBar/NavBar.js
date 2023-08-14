import { useState } from "react";
import { Link } from "react-router-dom";
import { PATH_CREAR_VOTACION, PATH_HOME, PATH_LOGIN, PATH_MIS_VOTACIONES } from "../../utils/constants";
import Searcher from "../votaciones/Searcher";

const NavBar = () => {
  const [isLogged, setIsLogged] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const menuClass = `dropdown-menu${dropdownOpen ? " show" : ""}`;

  const toggleOpen = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    if(window.confirm("¿Desea desloguearse?")){
        setIsLogged(false);
    }
  }

  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div className="container-fluid">
        <p className="navbar-brand ms-3" href="#">
          YourVote
        </p>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to={PATH_HOME}>
                Inicio
              </Link>
            </li>

            {isLogged ? (
              <>
                <li className="nav-item dropdown" onMouseLeave={closeDropdown}>
                  <a
                    className="nav-link dropdown-toggle"
                    role="button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={toggleOpen}
                  >
                    Votaciones
                  </a>
                  <ul className={menuClass}>
                    <li>
                      <Link className="dropdown-item" to={PATH_CREAR_VOTACION}>
                        Crear Votacion
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to={PATH_MIS_VOTACIONES}>
                        Mis Votaciones
                      </Link>
                    </li>
                  </ul>
                </li>
              </>
            ) : null}
          </ul>
        </div>
        <div>
          <ul className="navbar-nav d-flex container-fluid">
          <li className="nav-item me-1">
            <Searcher/>
          </li>
            {isLogged ? (
              <>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    aria-current="page"
                    onClick={handleLogout}
                    href="#"
                  >
                    Log Out
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to={PATH_LOGIN}>
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
