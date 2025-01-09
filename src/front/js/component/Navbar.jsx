import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (<nav className="navbar navbar-expand-lg bg-body-tertiary">
		<div className="container-fluid">
			<Link to="/ContactList">
				<span className="navbar-brand mb-0 h1">Home</span>
			</Link>
			<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarNavDropdown">
				<ul className="navbar-nav">
					<li className="nav-item">
						<a className="nav-link active" aria-current="page" href="#">ContacList</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="#">Features</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="#">Pricing</a>
					</li>
					<li className="nav-item dropdown">
						<a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
							Projects with Fetch
						</a>
						<ul className="dropdown-menu">
							<li><a className="dropdown-item" href="#">TodoList</a></li>
							<li><a className="dropdown-item" href="#">Another action</a></li>
							<li><a className="dropdown-item" href="#">Something else here</a></li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	</nav>

	);
};