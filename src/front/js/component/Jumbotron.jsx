import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Jumbotron = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const handleProtected = async () => {
    await actions.accessProtected();
  };

  const handleGetUser = async () => {
    await actions.getUser(store.user?.id);
  };

  return (
    <div className="p-5 text-center mt-5 bg-body-tertiary rounded-3 vh-100">
      <h1 className="text-body-emphasis text-white mt-5">Welcome, {store.user?.username}</h1>
      <p className="col-lg-8 mx-auto fs-5 text-muted">
        Esta es tu pagina privada donde solo tu puedes acceder por estar logueado. ¡Gracias por visitarnos! 
      </p>
      
      <div className="d-inline-flex gap-2 mb-5 mt-4">
        <button 
          className="d-inline-flex align-items-center btn btn-primary btn-lg px-4 rounded-pill" 
          type="button" 
          onClick={() => handleProtected}
        >
          verificar el token válido
        </button>
        <button 
          className="btn btn-outline-secondary btn-lg px-4 rounded-pill" 
          type="button"
          onClick={() => handleGetUser}
        >
          Puedes verificar los datos de tu usuario aquí 
        </button>
      </div>

      {/* Sección de Favoritos */}
      <div className="mt-5">
        <h3 className="text-white mb-4">Tus Favoritos</h3>
        {store.favorites?.length > 0 ? (
          <div className="row justify-content-center">
            {store.favorites.map((fav, index) => (
              <div key={index} className="col-md-3 mb-3">
                <div className="card bg-dark text-white">
                  <div className="card-body">
                    <h5 className="card-title">{fav.name}</h5>
                    <p className="card-text text-muted">Tipo: {fav.type}</p>
                    <button 
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => actions.removeFavorites(fav.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted">No tienes favoritos guardados aún</p>
        )}
      </div>
    </div>
  );
};