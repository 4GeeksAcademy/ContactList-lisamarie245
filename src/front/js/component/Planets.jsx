import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/CardStyles.css";



export const Planets = () => {

    const { store, actions } = useContext(Context);

    return (
        <div className="container text-center mt-4 bg-dark mb-3 ">
            <h1 className="text-light text-center pt-4">Planets</h1>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-5 g-3">
                {store.starPlanets.map((item, index) => (
                    <div className="col" key={index}>
                        <div className="card border-dark h-100 custom-card ">
                            <img
                                src={`https://starwars-visualguide.com/assets/img/planets/${index + 1}.jpg`}
                                className="rounded mx-auto d-block"
                                alt={item.name}
                                onError={actions.handleImageError}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <div className="card-buttons d-flex justify-content-between">
                                    <Link to={`/CardPlanets/${item.uid}`} className="btn btn-secondary">
                                        Details
                                    </Link>
                                    <span onClick={() => actions.addFavorites(item.name)}>
                                        <button type="button" className="btn btn-outline-warning">
                                            <i className="far fa-heart"></i>
                                        </button>
                                    </span>

                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
