import { useState } from "react";
import { Link } from "react-router-dom";

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
              <Link className="nav-link" aria-current="page" to="/">
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
                      <Link className="dropdown-item" to="/crearVotacion">
                        Crear Votacion
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/">
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
              <input
                className="form-control me-2"
                type="search"
                placeholder="Buscar Votacion"
                aria-label="Search"
              />
            </li>
            <li className="nav-item">
              <button className="btn btn-outline-success me-3" type="submit">
                Buscar
              </button>
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
                  <Link className="nav-link" aria-current="page" to="login">
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
