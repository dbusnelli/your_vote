import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PATH_CREAR_VOTACION, PATH_HOME, PATH_LOGIN, PATH_MIS_VOTACIONES } from "../../utils/constants";
import Searcher from "../votaciones/Searcher";
import { useDispatch, useSelector } from 'react-redux';
import { setUsuario } from '../../redux/reducers/usuario';

const NavBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showModalLogout, setShowModalLogout] = useState(false);
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.usuario.usuario);
  const navigate = useNavigate();

  const menuClass = `dropdown-menu${dropdownOpen ? " show" : ""}`;

  const toggleOpen = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const onLogout = () => {
    handleCloseModalLogout();
    dispatch(setUsuario(null))
    navigate(PATH_HOME);
  }
  

  const handleCloseModalLogout = () => setShowModalLogout(false);
  const handleShowModalLogout = () => setShowModalLogout(true);

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

            {usuario ? (
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
              <Searcher />
            </li>
            {usuario ? (
              <>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    aria-current="page"
                    onClick={handleShowModalLogout}
                    href="#"
                  >
                    Log Out
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    aria-current="page"
                    to={PATH_LOGIN}
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <Modal show={showModalLogout} onHide={handleCloseModalLogout}>
        <Modal.Header closeButton>
          <Modal.Title>Desloguearse</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Seguro que desea desloguearse?</Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary w-25"
            onClick={handleCloseModalLogout}
          >
            No
          </button>
          <button className="btn btn-primary w-25" onClick={onLogout}>
            Si, por favor
          </button>
        </Modal.Footer>
      </Modal>
    </nav>
  );
};

export default NavBar;
