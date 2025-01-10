import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext.js"
import "../../styles/ContactList.css";
import { Link } from "react-router-dom";

export const ContactList = () => {

    const { store, actions } = useContext(Context);

    const [addContact, setAddContact] = useState([]);
    const [deleteContact, setDeleteContact] = useState([]);

    const urlBase = "https://playground.4geeks.com/contact/agendas/contactList-lisamarie/contacts"

    // Borrar los contactos de la base de datos



    // Agregar contactos

    const addNewContact = async () => {

        const dataToSend = {
            "name": "test1",
            "phone": "343553",
            "email": "lasd3334@hotmail.com",
            "address": "Madrid"
          }

        const uri = `${urlBase}`;

        const options = { 
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToSend)
        }

        const response = await fetch(uri,options);

        if (!response.ok) {
            console.log("error:", response.status, response.statusText)
            return
        }

    }


        useEffect(() => {
            actions.getContacts();
            console.log("Contacts in store:", store.contacts);
        }, [])








    // codigo de las tarjetas 

    return (
        <div className="container mt-5 col-10">
            <div className="">
                <Link to="/AddContact" style={{ textDecoration: 'none' }}> <button type="button" className="btn btn-success mb-3 d-flex justify-contect-end">Add new contact</button></Link>

                {/* Crear las tarjetas con la info de los contactos  */}

                {store.contacts.map((item, index) => (
                    <div className="card mb-3" key={index}>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src="https://i.imgur.com/km8w6cm.jpeg" className=" img-fluid rounded-circle mt-3" alt="..." />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <div className="cardHeader d-flex justify-content-between">
                                        <h5 className="card-title">{item.name}</h5>
                                        <div className="Emoji d-flex">
                                        <span onClick={() => addNewContact()}><button type="button" className="btn btn-link text-danger">
                                            <i className="fas fa-edit mx-2 text-primary"></i></button></span>
                                            <span onClick={() => actions.removeContact(item.id)}><button type="button" className="btn btn-link text-danger">
                                                <i className="fas fa-trash-alt"></i>
                                            </button></span>
                                        </div>
                                    </div>
                                    <div className="UserData">
                                        <p className="card-text text-secondary"><i class="fas fa-map-marker-alt text-primary"></i>  {item.address}</p>
                                        <p className="card-text text-secondary"><i class="fas fa-phone-alt text-success"></i>     {item.phone}</p>
                                        <p className="card-text text-secondary"><i class="fas fa-envelope text-danger"></i>     {item.email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div >

    );

};