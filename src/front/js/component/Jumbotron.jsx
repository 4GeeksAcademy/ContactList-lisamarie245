import React, { useContext } from "react";
import { Context } from "../store/appContext"


export const Jumbotron = () => {

  const {store, actions} = useContext(Context);
  const handleProtected = () => {

  }


  return (

    <div className="p-5 text-center mt-5 bg-body-tertiary rounded-3 vh-100">
      <h1 className="text-body-emphasis text-white mt-5">Welcome, `${store.username}`</h1>
      <p className="col-lg-8 mx-auto fs-5 text-muted">
      Esta es tu pagina privada donde solo tu puedes acceder por estar logueado. ¡Gracias por visitarnos! 
     </p>
      <div className="d-inline-flex gap-2 mb-5 mt-4">
        <button className="d-inline-flex align-items-center btn btn-primary btn-lg px-4 rounded-pill" type="button">
          Call to action
        </button>
        <button className="btn btn-outline-secondary btn-lg px-4 rounded-pill" type="button">
          Secondary link
        </button>
      </div>
    </div>
  );
};