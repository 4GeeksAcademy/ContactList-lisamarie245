import React from "react";
import { Link } from "react-router-dom";
import "../../styles/index.css";

export const Footer = () => (
	<footer className="footer mt-auto py-3 text-center bg-dark">
		<Link to="/" className="text-white">
			<p className="d-2">
			“Que la fuerza te acompañe.”  <img className="img-fluid"
               src="https://i.imgur.com/Fr3F7Ht.jpeg" />
			</p>
		</Link>
	</footer>
);
