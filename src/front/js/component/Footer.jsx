import React from "react";
import { Link } from "react-router-dom";
import "../../styles/index.css";

export const Footer = () => (
	<footer className="footer text-center bg-dark p-2">
		<Link to="/" className="text-white">
			<p className="d-2">
				“Que la fuerza te acompañe.”
				<img
					src="https://i.imgur.com/Fr3F7Ht.jpeg"
					className="rounded mx-auto d-block img-fluid"
					style={{ height: "100px", objectFit: "cover" }}
				/>
			</p>
		</Link>
	</footer>
);
