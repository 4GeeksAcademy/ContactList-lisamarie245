import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const StarShips = () => {

    const { store } = useContext(Context)

    return (
        <div className="container text-center mt-5 bg-dark container-fluid d-flex justify-content-between mx-md-4 mt-4 mb-1">
            <h1 className="text-light text-center pt-4">StarShips</h1>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-5 g-3">
                {store.starWarShip.map((item, index) => (
                    <div className="col" key={index}>
                        <div className="card h-100 custom-card">
                            <img
                                src={`https://starwars-visualguide.com/assets/img/starships/${index + 1}.jpg`}
                                className="rounded mx-auto d-block"
                                alt="https://starwars-visualguide.com/assets/img/big-placeholder.jpg"
                            />
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <div className="card-buttons d-flex justify-content-between">
                                    <Link to="#" className="btn btn-secondary">
                                        Details
                                    </Link>
                                    <button type="button" className="btn btn-outline-warning">
                                        <i className="far fa-heart"></i>

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
