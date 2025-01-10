import React, { useContext } from "react";
import { Context } from "../store/appContext.js"
import { Link, useNavigate } from "react-router-dom";


export const EditContact = () => {

    const { store, actions } = useContext(Context);
     const navigate = useNavigate()

    const handleSubmitEdit = (e) => {
        e.preventDefault()

        console.log("Datos guardados:", store.formData); 
        navigate("/ContactList")
    };

    return (
        <div className="container-fluid mt-5 col-10">
                <h5 className="text-center">Add a New contact</h5>
            <form onSubmit={handleSubmitEdit}>  
                <div className="mb-3" >
                    <label htmlFor="exampleFormControlInput1" className="form-label">Full Name</label>
                    <input type="text" className="form-control" name="name" placeholder="Full Name" value={store.formData?.name || ""}
                        onChange={actions.handleChange}   />
                </div>
                <div className="mb-3" >
                    <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" placeholder="Enter email address" value={store.formData.email}
                        onChange={actions.handleChange}/>
                </div>
                <div className="mb-3" >
                    <label htmlFor="exampleFormControlInput1" className="form-label">Phone</label>
                    <input type="number" className="form-control" name="phone" placeholder="Enter phone number" value={store.formData.phone}
                        onChange={actions.handleChange} />
                </div>
                <div className="mb-3" >
                    <label htmlFor="exampleFormControlInput1" className="form-label">Address</label>
                    <input type="text" className="form-control" name="address" placeholder="Enter address" value={store.formData.address}
                        onChange={actions.handleChange}/>
                </div>
                <span onClick={() => actions.addNewContact()}><button type="submit" className="btn btn-primary mb-3 col-12">Save</button></span>
            </form>

            <Link to="/ContactList">Or get back to contacts</Link>
        </div>

    );
};