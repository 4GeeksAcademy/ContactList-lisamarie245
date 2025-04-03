import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/CardDetails.css";

export const CardCharacters = () => {


    const { store, actions } = useContext(Context);


    const { id } = useParams();


    const handleErrorImg = (event) => {
        event.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg'
    }

    useEffect(() => {
        actions.getCharacterId(id);
    }, [id]);

    const character = store.starCharacterDetail;
    


    if (!character) {
        return <p className="text-center">Loading character details...</p>;
    }



    return (
        <div className="container mt-5">
            {store.starCharacters ? (
                <div className="card shadow-sm bg-dark text-light">
                    <div className="row g-0">

                        {/* Imagen del personaje */}
                        <div className="col-4">
                            <div
                                style={{
                                    width: "100%",
                                    paddingTop: "100%",
                                    position: "relative",
                                }}
                            >
                                <img

                                    src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
                                    onError={handleErrorImg}
                                    alt={store.starCharacters.name}
                                    className="character-image"
                                />
                            </div>
                        </div>

                        {/* Contenido del personaje */}
                        <div className="col-8">
                            <div className="card-body text-start mx-5">
                                <h5 className="card-title mx-4 fs-1">{character.name}</h5>
                                <ul>
                                    <p><strong>Height:</strong> {character.height}</p>
                                    <p><strong>Mass:</strong> {character.mass}</p>
                                    <p><strong>Hair Color:</strong> {character.hair_color}</p>
                                    <p><strong>Eye Color:</strong> {character.eye_color}</p>
                                    <p><strong>Skin Color:</strong> {character.skin_color}</p>
                                    <p><strong>Birth Year:</strong> {character.birth_year}</p>
                                    <p><strong>Gender:</strong> {character.gender}</p>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-center">Loading character details...</p>
            )}
        </div>
    );
};