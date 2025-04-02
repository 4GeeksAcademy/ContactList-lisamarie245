import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { Dropdown } from "react-bootstrap";

export const Navbar = () => {
    const { store, actions } = useContext(Context);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3 py-2">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand me-5">
                    <img
                        height="50"
                        className="img-fluid"
                        src="https://i.imgur.com/I8IEYg0.png"
                        alt="Star Wars Logo"
                        style={{ filter: "brightness(0.9)" }}
                    />
                </Link>

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
                    <ul className="navbar-nav mx-auto">
                        {["Characters", "Planets", "Ships", "ContactList"].map((item, index) => (
                            <li className="nav-item mx-2" key={index}>
                                <Link 
                                    className="nav-link text-light hover-glow px-3"
                                    to={`/${item === "Ships" ? "Starships" : item}`}
                                    style={{
                                        fontWeight: 500,
                                        letterSpacing: "0.5px",
                                        borderRadius: "4px",
                                        transition: "all 0.3s ease"
                                    }}
                                >
                                    {item === "Ships" ? "Starships" : item}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="d-flex align-items-center ms-auto">
                        <Dropdown className="me-3">
                            <Dropdown.Toggle 
                                variant="outline-warning" 
                                className="d-flex align-items-center position-relative"
                                style={{
                                    borderRadius: "20px",
                                    padding: "6px 15px",
                                    fontWeight: 500,
                                    borderWidth: "2px"
                                }}
                            >
                                <i className="fas fa-heart me-2"></i>
                                Favorites
                                {store.favorites?.length > 0 && (
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "0.65rem" }}>
                                        {store.favorites.length}
                                    </span>
                                )}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu-dark" style={{ minWidth: "250px" }}>
                                <Dropdown.Header className="text-center text-warning">
                                    <i className="fas fa-heart me-2"></i>Your Favorites
                                </Dropdown.Header>
                                <Dropdown.Divider className="bg-secondary" />
                                {store.favorites?.length > 0 ? (
                                    store.favorites.map((fav, index) => (
                                        <Dropdown.Item 
                                            key={index} 
                                            className="d-flex justify-content-between align-items-center py-2"
                                        >
                                            <span className="text-truncate" style={{ maxWidth: "180px" }}>{fav}</span>
                                            <button 
                                                className="btn btn-sm btn-outline-danger p-1"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    actions.removeFavorites(fav);
                                                }}
                                                style={{ width: "24px", height: "24px" }}
                                            >
                                                <i className="fas fa-times"></i>
                                            </button>
                                        </Dropdown.Item>
                                    ))
                                ) : (
                                    <Dropdown.Item disabled className="text-center text-muted py-2">
                                        No favorites yet
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>

                        {store.isLogged ? (
                            <Dropdown>
                                <Dropdown.Toggle 
                                    variant="outline-light" 
                                    className="d-flex align-items-center user-toggle"
                                    style={{
                                        borderRadius: "20px",
                                        padding: "6px 10px 6px 6px",
                                        border: "none",
                                        background: "rgba(255, 255, 255, 0.1)"
                                    }}
                                >
                                    <img 
                                        src={store.usuario?.image_url || "https://i.imgur.com/24t1SYU.jpeg"} 
                                        alt="Profile" 
                                        className="rounded-circle me-2" 
                                        width="32" 
                                        height="32" 
                                        style={{ objectFit: "cover" }}
                                    />
                                    <span className="d-none d-lg-inline" style={{ fontWeight: 500 }}>
                                        {store.usuario?.username || "User"}
                                    </span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu-dark" align="end">
                                    <Dropdown.Item as={Link} to="/user-profile" className="d-flex align-items-center">
                                        <i className="fas fa-user-circle me-2"></i>Profile
                                    </Dropdown.Item>
                                    <Dropdown.Divider className="bg-secondary" />
                                    <Dropdown.Item 
                                        as={Link} 
                                        to="/" 
                                        onClick={() => actions.logout()} 
                                        className="text-danger d-flex align-items-center"
                                    >
                                        <i className="fas fa-sign-out-alt me-2"></i>Logout
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        ) : (
                            <div className="d-flex">
                                <Link to="/login" className="nav-link">
                                    <button 
                                        className="btn btn-outline-light me-2" 
                                        style={{
                                            borderRadius: "20px",
                                            padding: "6px 20px",
                                            fontWeight: 500,
                                            borderWidth: "2px"
                                        }}
                                    >
                                        Login
                                    </button>
                                </Link>
                                <Link to="/sign-up" className="nav-link">
                                    <button 
                                        className="btn btn-warning text-dark" 
                                        style={{
                                            borderRadius: "20px",
                                            padding: "6px 20px",
                                            fontWeight: 600,
                                            boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
                                        }}
                                    >
                                        Sign Up
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
                .hover-glow:hover {
                    color: #fff !important;
                    background: rgba(255, 255, 255, 0.1);
                    text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
                }
                .user-toggle:hover {
                    background: rgba(255, 255, 255, 0.2) !important;
                }
                .dropdown-item:hover {
                    background: rgba(255, 193, 7, 0.15) !important;
                }
            `}</style>
        </nav>
    );
};