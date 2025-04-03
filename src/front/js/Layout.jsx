import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext";

// custom component 
import ScrollToTop from "./component/ScrollToTop.jsx";
import { BackendURL } from "./component/BackendURL.jsx";
import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";
import { ContactList } from "./pages/ContactList.jsx";
import { AddContact } from "./pages/AddContact.jsx";
import { EditContact } from "./pages/EditContact.jsx";

import { Home } from "./pages/Home.jsx";
import { Error404 } from "./component/Error404.jsx";
import { SignUp } from "./pages/SignUp.jsx";
import { Alert } from "./component/Alert.jsx";


//starwars 
import { Characters } from "./pages/Characters.jsx";
import { CardCharacters } from "./pages/CardCharacters.jsx";
import { Planets } from "./pages/Planets.jsx";
import { CardPlanets } from "./pages/CardPlanets.jsx";
import { Ships } from "./pages/Ships.jsx";
import { CardShips } from "./pages/CardShips.jsx";
import { Login } from "./pages/Login.jsx";
import { Jumbotron } from "./component/Jumbotron.jsx";


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
                    <Alert />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Jumbotron />} path="/protected" />
                        <Route element={<ContactList />} path="/ContactList" /> 
                        <Route element={<AddContact />} path="/AddContact" /> 
                        <Route element={<EditContact />} path="/EditContact/:contactId" />
                        <Route element={<Error404 />}  path="*"/>
                        <Route element={<Login />}  path="login"/>
                        <Route element={<SignUp />}  path="sign-up"/>

                        {/* ///// STARWARS WEBSITES ///  */}

                        <Route element={<Characters />} path="/Characters" /> 
                        <Route element={<CardCharacters />} path="/CardCharacters/:id" />
                        <Route element={<Planets/>} path="/Planets" /> 
                        <Route element={<CardPlanets/>} path="/CardPlanets/:id" /> 
                        <Route element={<Ships/>} path="/Ships" /> 
                        <Route element={<CardShips/>} path="/CardShips/:id" /> 
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
