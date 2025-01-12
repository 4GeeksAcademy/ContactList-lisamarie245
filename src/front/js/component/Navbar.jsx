import React from "react";
import { Link } from "react-router-dom";
import "../../styles/index.css";

export const Navbar = () => {
	return (<nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3 ">
		<div className="container-fluid">
			<Link to="/">
				<span className="navbar-brand mb-0 h1"><img height="55" className="img-fluid img-thumbnail mt-2"
               src="https://i.imgur.com/I8IEYg0.png" /></span>
			</Link>
			<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>

			{/* // Navbar izquierdo  */}
			<div className="container d-flex justify-content-end"></div>
			<div className="collapse navbar-collapse" id="navbarNavDropdown">
				<ul className="navbar-nav">
						<Link to="/Characters" style={{ textDecoration: 'none' }}>
					<li className="nav-item">
						<a className="nav-link text-secondary" href="#">Characters</a>
					</li></Link>
					<Link to="/Planets" style={{ textDecoration: 'none' }}>
					<li className="nav-item">
						<a className="nav-link text-secondary" href="#">Planets</a>
					</li></Link>
					<Link to="/Ships" style={{ textDecoration: 'none' }}>
						<li className="nav-item">
							<a className="nav-link active text-secondary" aria-current="page" href="#">Starships</a>
						</li></Link>
						<Link to="/ContactList" style={{ textDecoration: 'none' }}>
						<li className="nav-item">
							<a className="nav-link active text-secondary" aria-current="page" href="#">ContacList</a>
						</li></Link>
					<li className="nav-item dropdown">
						<a type="button" className="nav-link dropdown-toggle btn btn-secondary text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
							Favorites
						</a>
						<ul className="dropdown-menu">
							<li><span className="dropdown-item"> Favorites</span> <button type="button" className="btn btn-outline-danger"><i class="fas fa-trash text-danger"></i> </button></li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	</nav>

	);
};
