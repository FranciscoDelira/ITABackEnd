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
import ApproveOrder from "./maintenance/orders/ApproveOrder";

import Profile from "./user/Profile";
import EditProfile from "./user/EditProfile";
import Register from "./user/Register";
import { useLocalStorage } from "react-use";
import PrivateRoute from "./PrivateRoute";

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
    const [user, setUser] = useLocalStorage('user-info');
    return (
        <Routes>

            <Route path="ITABackEnd/public/" element={<Login />} >
                <Route path="login" element={<Login />} />
            </Route>

            <Route element={<PrivateRoute canActivate={user}
                redirectPath="ITABackEnd/public/login" />}>
                <Route path="ITABackEnd/public/" element={<Menu />} >

                    <Route path="home" element={<Home />} />

                    <Route path="activeRequest" element={<ActiveRequests />} />
                    <Route path="requestHistory" element={<RequestHistory />} />

                    <Route path="earring" element={<Earring />} />
                    <Route path="release" element={<Release />} />
                    <Route path="approved" element={<Approved />} />
                    <Route path="approveOrder" element={<ApproveOrder />} />
                    <Route path="newOrder/:id" element={<NewOrder />} />
                    
                    <Route path="profile" element={<Profile />} />
                    <Route path="editProfile" element={<EditProfile />} />
                    <Route path="register" element={<Register />} />

                    <Route path="*" element={<Navigate replace to="/" />} />
                </Route>
            </Route>

        </Routes>
    )
}

export default Main;