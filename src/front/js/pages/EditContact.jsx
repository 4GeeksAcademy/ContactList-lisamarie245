import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js"
import { Link, useNavigate } from "react-router-dom";


export const EditContact = () => {


    const {store, actions} = useContext(Context);

    const editContact = store.currentContact;

    const [editName, setEditName] = useState(editContact.name);
    const [editPhone, setEditPhone]= useState(editContact.phone);
    const [editEmail, setEditEmail] = useState (editContact.email);
    const [editAddress, setEditAddress] = useState(editContact.address);

    const navigate = useNavigate();
       

    const handleSubmitEdit = (event) => {
        event.preventDefault();
        if (!editContact.id) {
            console.error("El ID del contacto no está definido. Verifica si el contacto seleccionado es válido.");
            return;
        }

        
        actions.editContact(
            {
                name: editName,
                phone: editPhone,
                email: editEmail,
                address: editAddress,
            },
            editContact.id
        );
        navigate("/contactlist");
    }

    return (
        <div className="container mt-5 col-4 p-5">
            <h5 className="text-center text-white p-2">Edit contact</h5>
            <form onSubmit={handleSubmitEdit}>
                <div className="mb-3" >
                    <label htmlFor="contactname" className="form-label text-white">Full Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter Full Name" value={editName}
                         onChange={(event) => {setEditName(event.target.value)}}/>
                </div>
                <div className="mb-3" >
                    <label htmlFor="email" className="form-label text-white">Email address</label>
                    <input type="text" className="form-control" id="text" placeholder="Enter email address" value={editEmail}
                         onChange={(event) => {setEditEmail(event.target.value)}} />
                </div>
                <div className="mb-3" >
                    <label htmlFor="phone" className="form-label text-white">Phone</label>
                    <input type="number" className="form-control" id="phone" placeholder="Enter phone number" value={editPhone} onChange={(event) => {setEditPhone(event.target.value)}} />
                </div>
                <div className="mb-3" >
                    <label htmlFor="address" className="form-label text-white">Address</label>
                    <input type="text" className="form-control" id="address" placeholder="Enter address" value={editAddress} onChange={(event) => {setEditAddress(event.target.value)}} />
                </div>
                <span><button type="submit" className="btn btn-primary mb-3 col-12 mt-2">Save</button></span>
            </form>

            <Link to="/ContactList">Or get back to contacts</Link>
        </div>

    );
};