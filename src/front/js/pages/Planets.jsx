import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/CardStyles.css";

export const Planets = () => {
    const { store, actions } = useContext(Context);

    const handleFavorite = (planet) => {
        if (store.favorites.some(fav => fav.id === planet.uid)) {
            actions.removeFavorites(planet.uid);
        } else {
            actions.addFavorites({
                id: planet.uid,
                name: planet.name,
                type: 'planet'
            });
        }
    };

    return (
        <div className="container text-center bg-dark mt-5 py-4">
            <h1 className="text-light text-center">Planets</h1>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-5 g-3 mx-auto">
                {store.starPlanets.map((item, index) => (
                    <div className="col d-flex align-items-stretch" key={index}>
                        <div className="card">
                            <img
                                src={`https://starwars-visualguide.com/assets/img/planets/${item.uid}.jpg`}
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
                                    <button 
                                        type="button" 
                                        className="btn btn-outline-warning"
                                        onClick={() => handleFavorite(item)}
                                    >
                                        <i className={
                                            store.favorites.some(fav => fav.id === item.uid)
                                            ? "fas fa-heart"
                                            : "far fa-heart"
                                        }></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};