import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/CardStyles.css";

export const CardShips = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams();

    const handleErrorImg = (event) => {
        event.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg';
    };

    useEffect(() => {
        actions.getCardShipsId(id);
    }, [id]);

    const starship = store.starShipsDetail;

    if (!starship) {
        return <p className="text-center">Loading starships details...</p>;
    }

    return (
        <div className="container mt-5">
            <div className="card shadow-sm bg-dark text-light">
                <div className="row g-0">
                    {/* Imagen de la nave */}
                    <div className="col-4">
                        <div
                            style={{
                                width: "100%",
                                paddingTop: "100%",
                                position: "relative",
                            }}
                        >
                            <img
                                src={`https://starwars-visualguide.com/assets/img/starships/${id}.jpg`}
                                onError={handleErrorImg}
                                alt={starship.name}
                                className="character-image"
                            />
                        </div>
                    </div>

                    {/* Contenido de la nave */}
                    <div className="col-8">
                        <div className="card-body text-start mx-5">
                            <h5 className="card-title mx-4 fs-1">{starship.name}</h5>
                            <ul>
                                <li><strong>Model:</strong> {starship.model}</li>
                                <li><strong>Starship Class:</strong> {starship.starship_class}</li>
                                <li><strong>Manufacturer:</strong> {starship.manufacturer}</li>
                                <li><strong>Cost in credits:</strong> {starship.cost_in_credits}</li>
                                <li><strong>Length:</strong> {starship.length}</li>
                                <li><strong>Crew:</strong> {starship.crew}</li>
                                <li><strong>Passengers:</strong> {starship.passengers}</li>
                                <li><strong>Max atmosphering speed:</strong> {starship.max_atmosphering_speed}</li>
                                <li><strong>Hyperdrive rating:</strong> {starship.hyperdrive_rating}</li>
                                <li><strong>MGLT:</strong> {starship.MGLT}</li>
                                <li><strong>Cargo capacity:</strong> {starship.cargo_capacity}</li>
                                <li><strong>Consumables:</strong> {starship.consumables}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
