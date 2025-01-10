import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js"
import { Link } from "react-router-dom";


export const AddContact = () => {

    const { store, action } = useContext(Context);

    const [formData, setFormData] = useState({
        name:"",
        phone:"",
        email:"",
        address:"",
    });

    const handleChange = (e) => {
        setFormData({

            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log("Datos guardados:", formData); 
        // navigate("/ContactsList"); 
    };

    return (
        <div className="container-fluid mt-5 col-10">
                <h5 className="text-center">Add a New contact</h5>
            <form onSubmit={handleSubmit}>  
                <div className="mb-3" >
                    <label htmlFor="exampleFormControlInput1" className="form-label">Full Name</label>
                    <input type="text" className="form-control" name="name" placeholder="Full Name" value={formData.name}
                        onChange={handleChange}   />
                </div>
                <div className="mb-3" >
                    <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" placeholder="Enter email address" value={formData.email}
                        onChange={handleChange}/>
                </div>
                <div className="mb-3" >
                    <label htmlFor="exampleFormControlInput1" className="form-label">Phone</label>
                    <input type="number" className="form-control" name="phone" placeholder="Enter phone number" value={formData.phone}
                        onChange={handleChange} />
                </div>
                <div className="mb-3" >
                    <label htmlFor="exampleFormControlInput1" className="form-label">Address</label>
                    <input type="text" className="form-control" name="address" placeholder="Enter address" value={formData.address}
                        onChange={handleChange}/>
                </div>
                <button type="submit" className="btn btn-primary mb-3 col-12">Save</button>
            </form>

            <Link to="/ContactList">Or get back to contacts</Link>
        </div>

    );
};