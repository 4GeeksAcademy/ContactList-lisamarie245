import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="home container-fluid text-center my-5 bg-dark">
			<div className="cover-container d-flex w-75 p-4 mx-auto flex-column">
			<img class="d-block w-100" src="https://i.imgur.com/YodJeJG.png" alt="Star Wars timeline" />
			</div>
		</div>
	);
};
