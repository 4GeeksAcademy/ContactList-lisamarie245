import React, { useContext } from "react";
import { Context } from "../store/appContext.js"
import { Link, useNavigate } from "react-router-dom";


export const AddContact = () => {

    const { store, actions } = useContext(Context);

    const handleEditSubmit = (e) => {
        e.preventDefault();
        actions.editContact(store.formData);
        setStore({ isEdit: false });
        navigate("/ContactList");
    }

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!store.formData.name || !store.formData.email || !store.formData.phone) {
            alert("Por favor completa todos los campos obligatorios");
            return;
        }

        console.log("Datos guardados:", store.formData);
        navigate("/ContactList")
    };

    return (
        <div>
            <div className="container mt-5 col-4 p-5 mb-2">
                <h5 className="text-center text-white mt-2 p-2">Add a New contact</h5>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3" >
                        <label htmlFor="exampleFormControlInput1" className="form-label text-white ">Full Name</label>
                        <input type="text" className="form-control" name="name" placeholder="Full Name" value={store.formData?.name || ""}
                            onChange={actions.handleChange} />
                    </div>
                    <div className="mb-3" >
                        <label htmlFor="exampleFormControlInput1" className="form-label text-white ">Email address</label>
                        <input type="email" className="form-control" name="email" placeholder="Enter email address" value={store.formData?.email  || ""}
                            onChange={actions.handleChange} />
                    </div>
                    <div className="mb-3" >
                        <label htmlFor="exampleFormControlInput1" className="form-label text-white ">Phone</label>
                        <input type="number" className="form-control" name="phone" placeholder="Enter phone number" value={store.formData.phone}
                            onChange={actions.handleChange} />
                    </div>
                    <div className="mb-3" >
                        <label htmlFor="exampleFormControlInput1" className="form-label text-white ">Address</label>
                        <input type="text" className="form-control" name="address" placeholder="Enter address" value={store.formData.address}
                            onChange={actions.handleChange} />
                    </div>
                    <div className="d-flex justify-content-center">                  
                        <span onClick={() => actions.addNewContact()}><button type="submit" className="btn btn-primary mb-3 col-12 mt-2 text-center">Save</button></span>
                    </div>
                </form>

                <Link to="/ContactList" className="mb-2">Or get back to contacts</Link>
            </div>
        </div>
    );
};