import React, { useContext } from "react";
import { Context } from "../store/appContext"
import { useNavigate } from "react-router-dom";


export const Jumbotron = () => {

  const {store, actions} = useContext(Context);
  const navigate = useNavigate();

  return (

    <div className="p-5 text-center mt-5 bg-body-tertiary rounded-3 vh-100">
      <h1 className="text-body-emphasis text-white mt-5">Welcome, {store.user?.username}</h1>
      <p className="col-lg-8 mx-auto fs-5 text-muted">
      Esta es tu pagina privada donde solo tu puedes acceder por estar logueado. ¡Gracias por visitarnos! 
     </p>
      <div className="d-inline-flex gap-2 mb-5 mt-4">
        <button className="d-inline-flex align-items-center btn btn-primary btn-lg px-4 rounded-pill" type="button" 
        onClick={() => actions.accessProtected(navigate)}>
          verificar el token válido
        </button>
        <button className="btn btn-outline-secondary btn-lg px-4 rounded-pill" type="button"
        onClick={() => actions.getUser(store.user?.id, navigate)}>
          Puedes verificar los datos de tu usuario aquí 
        </button>
      </div>
    </div>
  );
};