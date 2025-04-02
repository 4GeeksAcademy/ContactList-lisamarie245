import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/HomeDetails.css";

export const Characters = () => {

    const { store, actions } = useContext(Context)

    return (
     <div className="container text-center bg-dark mt-5 py-4">
    <h1 className="text-light text-center">Characters</h1>
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-5 g-3 mx-auto">
        {store.starCharacters.map((item, index) => (
            <div className="col d-flex align-items-stretch" key={index}>
                <div className="card">
                    <img
                        src={`https://starwars-visualguide.com/assets/img/characters/${index + 1}.jpg`}
                        className="rounded mx-auto d-block"
                        alt={item.name}
                        onError={actions.handleImageError}
                    />
                    <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <div className="card-buttons d-flex justify-content-between">
                            <Link to={`/CardCharacters/${item.uid}`} className="btn btn-secondary">
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
