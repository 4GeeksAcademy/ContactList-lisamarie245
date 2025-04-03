import React, { useState } from "react";


export const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleEmail = (event) => {
        setEmail(event.target.value)
    };

    const handlePassword = (event) => {
        setPassword(event.target.value)
    };

    const handleUsername = (event) => {
        setUsername(event.target.value)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const dataToSend = {
            username: username,
            email: email,
            password: password
        };
        console.log(dataToSend);
    };


    return (
        <div className="container col-4 mt-5 mb-5 rounded vh-0 p-5">
            <h1 className="text-primary text-center p-3">Sign Up to Start!</h1>
            <h4 className="text-light text-center">Create your account</h4>
            <form onSubmit={handleSubmit} className="p-3">
                <div className="mb-3">
                    <label for="exampleInputUsername1" className="form-label text-light">Username</label>
                    <input type="username" className="form-control" id="exampleInputUsername1" aria-describedby="usernameHelp"
                        value={username} onChange={handleUsername} />
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label text-light">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        value={email} onChange={handleEmail} />
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label text-light">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"
                        value={password} onChange={handlePassword} />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label text-light" for="exampleCheck1">Accept terms and conditions</label>
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-primary text-center col-6 mt-3">Submit</button>
                </div>
            </form>

        </div>

    );
};