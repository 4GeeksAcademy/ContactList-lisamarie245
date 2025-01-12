import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext";

// custom component 

import ScrollToTop from "./component/ScrollToTop.jsx";
import { BackendURL } from "./component/BackendURL.jsx";
import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";
import { ContactList } from "./component/ContactList.jsx";
import { AddContact } from "./component/AddContact.jsx";
import { EditContact } from "./component/EditContact.jsx";


import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Home } from "./pages/Home.jsx";
import { Error404 } from "./pages/Error404.jsx";


//starwars 
import { Characters } from "./component/Characters.jsx";
import { Planets } from "./component/Planets.jsx";
import { StarShips } from "./component/StarShips.jsx";


//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";
    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<ContactList />} path="/ContactList" /> 
                        <Route element={<AddContact />} path="/AddContact" /> 
                        <Route element={<EditContact />} path="/EditContact/:contactId" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Error404 />}  path="*"/>
                        <Route element={<Characters />} path="/Characters" /> 
                        <Route element={<Planets/>} path="/Planets" /> 
                        <Route element={<StarShips/>} path="/StarShips" /> 
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
