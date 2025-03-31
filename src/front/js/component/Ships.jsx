import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Ships = () => {

    const { store, actions } = useContext(Context)
    const navigate = useNavigate()

    const handleDetails = (ship) => {
        actions.getCardShipsId(ship.uid);
        navigate(`/CardShips/${ship.uid}`)
    }



    return (
        <div className="container text-center mt-3 bg-dark mb-3">
            <h1 className="text-light text-center pt-4">StarShips</h1>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-5 g-3">
                {store.starWarShips.map((item, index) => (
                    <div className="col" key={item}>
                        <div className="card h-95 custom-card">
                            <img
                                src={`https://starwars-visualguide.com/assets/img/starships/${index + 1}.jpg`}
                                className="rounded mx-auto d-block"
                                alt={item.name || "Starship image"}
                                onError={actions.handleImageError}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <div className="card-buttons d-flex justify-content-between">
                                    {/* <Link to={`/CardShips/${item.uid}`} className="btn btn-secondary">
                                        Details
                                    </Link> */}
                                    <span className="btn btn-secondary" onClick={() => handleDetails(item)}>
                                        Details
                                    </span>
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
