import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";

import Menu from "./Menu";

import Login from "./auth/Login";

import Home from "./Home";

import ActiveRequests from "./maintenance/requests/ActiveRequests";
import RequestHistory from "./maintenance/requests/RequestHistory";

import Earring from "./maintenance/orders/Earring";
import Release from "./maintenance/orders/Release";
import Approved from "./maintenance/orders/Approved";
import NewOrder from "./maintenance/orders/NewOrder";

import Profile from "./user/Profile";
import EditProfile from "./user/EditProfile";
import Register from "./user/Register";

//import NotFound from './NotFound';

/*

<Routes>
            <Route path="/laravel/topicos/public/" element={<Menu /> } >
                <Route path="login" element={<Login /> } />
                <Route path="register" element={<Register /> } />
                <Route path="*" element={<Navigate replace to="/"/> } />
            </Route>
        </Routes>

*/

function Main() {
    return (
        <Routes>

            {/*####################################################################
            ###########################--[ LOGIN ]--#######################################*/}

            <Route path="ITAFrontEndWeb/public/" element={<Login />} >
                <Route path="login" element={<Login />} />
            </Route>

            {/*####################################################################
            ###########################--[ HOME ]--########################################*/}

            <Route path="ITAFrontEndWeb/public/" element={<Menu />} >
                <Route path="home" element={<Home />} />
                <Route path="*" element={<Navigate replace to="/" />} />
            </Route>

            {/*####################################################################
            ##########################--[ REQUESTS ]--########################################*/}

            <Route path="ITAFrontEndWeb/public/" element={<Menu />} >
                <Route path="activeRequest" element={<ActiveRequests />} />
                <Route path="*" element={<Navigate replace to="/" />} />
            </Route>
            <Route path="ITAFrontEndWeb/public/" element={<Menu />} >
                <Route path="requestHistory" element={<RequestHistory />} />
                <Route path="*" element={<Navigate replace to="/" />} />
            </Route>

            {/*####################################################################
            ###########################--[ ORDERS ]--########################################*/}

            <Route path="ITAFrontEndWeb/public/" element={<Menu />} >
                <Route path="earring" element={<Earring />} />
                <Route path="*" element={<Navigate replace to="/" />} />
            </Route>
            <Route path="ITAFrontEndWeb/public/" element={<Menu />} >
                <Route path="release" element={<Release />} />
                <Route path="*" element={<Navigate replace to="/" />} />
            </Route>
            <Route path="ITAFrontEndWeb/public/" element={<Menu />} >
                <Route path="approved" element={<Approved />} />
                <Route path="*" element={<Navigate replace to="/" />} />
            </Route>
            <Route exact path="ITAFrontEndWeb/public/" element={<Menu />} >
                <Route path="newOrder/:id" element={<NewOrder />} />
                <Route path="*" element={<Navigate replace to="/" />} />
            </Route>

            {/*<Route path="ITAFrontEndWeb/public/" element={<Menu />} >
                <Route path="editOrder/:id" element={<EditOrder />} />
                <Route path="*" element={<Navigate replace to="/" />} />
            </Route>

            {/*####################################################################
            ###########################--[ USERS ]--########################################*/}

            <Route path="ITAFrontEndWeb/public/" element={<Menu />} >
                <Route path="profile" element={<Profile />} />
                <Route path="*" element={<Navigate replace to="/" />} />
            </Route>
            <Route path="ITAFrontEndWeb/public/" element={<Menu />} >
                <Route path="editProfile" element={<EditProfile />} />
                <Route path="*" element={<Navigate replace to="/" />} />
            </Route>
            <Route path="ITAFrontEndWeb/public/" element={<Menu />} >
                <Route path="register" element={<Register />} />
                <Route path="*" element={<Navigate replace to="/" />} />
            </Route>

        </Routes>
    )
}

export default Main;