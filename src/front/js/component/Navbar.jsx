import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (<nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3 ">
		<div className="container-fluid">
			<Link to="/Starwars">
				<span className="navbar-brand mb-0 h1">Starwars</span>
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
						<a className="nav-link" href="#">Characters</a>
					</li></Link>
					<Link to="/Planets" style={{ textDecoration: 'none' }}>
					<li className="nav-item">
						<a className="nav-link" href="#">Planets</a>
					</li></Link>
					<Link to="/Starships" style={{ textDecoration: 'none' }}>
						<li className="nav-item">
							<a className="nav-link active" aria-current="page" href="#">Starships</a>
						</li></Link>
						<Link to="/ContactList" style={{ textDecoration: 'none' }}>
						<li className="nav-item">
							<a className="nav-link active" aria-current="page" href="#">ContacList</a>
						</li></Link>
					<li className="nav-item dropdown">
						<a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
							Favorites
						</a>
						<ul className="dropdown-menu">
							<li><a className="dropdown-item" href="#">Favorites</a></li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	</nav>

	);
};
