import React from "react";
import { Link } from "react-router-dom";
import "../../styles/index.css";

export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
            <div className="container-fluid">
                {/* Logo */}
                <Link to="/" className="navbar-brand">
                    <img
                        height="55"
                        className="img-fluid img-thumbnail mt-2"
                        src="https://i.imgur.com/I8IEYg0.png"
                        alt="Logo"
                    />
                </Link>

                {/* Botón para colapsar en móvil */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Contenido del Navbar */}
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        {/* Enlaces de navegación */}
                        <li className="nav-item">
                            <Link className="nav-link text-secondary" to="/Characters">Characters</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-secondary" to="/Planets">Planets</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-secondary" to="/Ships">Starships</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-secondary" to="/ContactList">Contact List</Link>
                        </li>

                        {/* Botones Login y Sign Up */}
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">
                                <button className="btn btn-outline-danger mx-2">Login</button>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/sign-up" className="nav-link">
                                <button className="btn btn-outline-primary mx-2">Sign Up</button>
                            </Link>
                        </li>

                        {/* Dropdown Favorites */}
                        <li className="nav-item dropdown">
                            <button
                                className="nav-link dropdown-toggle btn btn-secondary text-white"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Favorites
                            </button>
                            <ul className="dropdown-menu">
                                <li className="d-flex align-items-center justify-content-between px-3">
                                    <span>Favorites</span>
                                    <button type="button" className="btn btn-outline-danger">
                                        <i className="fas fa-trash text-danger"></i>
                                    </button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
