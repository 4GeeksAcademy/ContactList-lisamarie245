import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Alert = () => {
    const { store } = useContext(Context);

    if (!store.alert.show) {
        return null;
    }

    return (
        <div className="container fixed-top mt-3">
            <div className={`alert alert-${store.alert.type} alert-dismissible fade show`} role="alert">
                {store.alert.message}
                <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => store.actions.hideAlert()}
                ></button>
            </div>
        </div>
    );
}