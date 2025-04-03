import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Ships = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleDetails = (ship) => {
        actions.getCardShipsId(ship.uid);
        navigate(`/CardShips/${ship.uid}`);
    };

    const handleFavorite = (ship) => {
        if (store.favorites.some(fav => fav.id === ship.uid)) {
            actions.removeFavorites(ship.uid);
        } else {
            actions.addFavorites({
                id: ship.uid,
                name: ship.name,
                type: 'starship'
            });
        }
    };

    return (
        <div className="container text-center mt-3 bg-dark mb-3">
            <h1 className="text-light text-center pt-4">StarShips</h1>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-5 g-3">
                {store.starWarShips.map((item, index) => (
                    <div className="col" key={item.uid}>
                        <div className="card h-95 custom-card p-2">
                            <img
                                src={`https://starwars-visualguide.com/assets/img/starships/${item.uid}.jpg`}
                                className="rounded mx-auto d-block"
                                alt={item.name || "Starship image"}
                                onError={actions.handleImageError}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <div className="card-buttons d-flex justify-content-between">
                                    <span className="btn btn-secondary" onClick={() => handleDetails(item)}>
                                        Details
                                    </span>
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