import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => (
	<footer className="footer mt-auto py-3 text-center">
		<Link to="/ContactList">
			<p>
				Volver al inicio
			</p>
		</Link>
	</footer>
);
