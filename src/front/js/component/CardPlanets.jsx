import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/CardStyles.css";

export const CardPlanets = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams();

    const handleErrorImg = (event) => {
        event.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg';
    };

    useEffect(() => {
        actions.getCardPlanetsId(id);
    }, [id]);

    const planet = store.starPlanetsDetail;

    if (!planet) {
        return <p className="text-center text-white mt-5 fs-1">Loading  {planet?.name} details...</p>;
    }

    return (
        <div className="container mt-5">
            <div className="card shadow-sm bg-dark text-light">
                <div className="row g-0">


                    {/* Image styles*/}


                    <div className="col-4">
                        <div
                            style={{
                                width: "100%",
                                paddingTop: "100%",
                                position: "relative",
                            }}
                        >
                            <img
                                src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
                                onError={handleErrorImg}
                                alt={planet.name}
                                className="character-image"
                            />
                        </div>
                    </div>

                    {/* Planet Body Info*/}


                    <div className="col-8">
                        <div className="card-body text-start mx-5">
                            <h5 className="card-title mx-4 fs-1">{planet.name}</h5>
                            <ul>
                                <li><strong>Diameter:</strong> {planet.diameter}</li>
                                <li><strong>Rotation Period:</strong> {planet.rotation_period}</li>
                                <li><strong>Orbital Period:</strong> {planet.orbital_period}</li>
                                <li><strong>Gravity:</strong> {planet.gravity}</li>
                                <li><strong>Population:</strong> {planet.population}</li>
                                <li><strong>Climate:</strong> {planet.climate}</li>
                                <li><strong>Terrain:</strong> {planet.terrain}</li>
                                <li><strong>Surface Water:</strong> {planet.surface_water}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
