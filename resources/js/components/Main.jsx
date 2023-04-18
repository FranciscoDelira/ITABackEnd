import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/Login";
import Menu from "./Menu";
import Home from "./Home";
import MaintenanceRequest from "./maintenance/requests/MaintenanceRequest";
import WorkOrders from "./maintenance/orders/WorkOrders";
import Profile from "./user/Profile";
import ActiveRequests from "./maintenance/requests/ActiveRequests";
import RequestHistory from "./maintenance/requests/RequestHistory";

import Register from "./Register";
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
            #######################################################################*/}

            <Route path="ITAFrontEndWeb/public/" element={<Login />} >
                <Route path="login" element={<Login />} />
            </Route>

            {/*####################################################################
            #######################################################################*/}

            <Route path="ITAFrontEndWeb/public/" element={<Menu />} >
                <Route path="home" element={<Home />} />
                <Route path="*" element={<Navigate replace to="/" />} />
            </Route>
            <Route path="ITAFrontEndWeb/public/" element={<Menu />} >
                <Route path="maintenanceRequest" element={<MaintenanceRequest />} />
                <Route path="*" element={<Navigate replace to="/" />} />
            </Route>
            <Route path="ITAFrontEndWeb/public/" element={<Menu />} >
                <Route path="workOrders" element={<WorkOrders />} />
                <Route path="*" element={<Navigate replace to="/" />} />
            </Route>
            <Route path="ITAFrontEndWeb/public/" element={<Menu />} >
                <Route path="profile" element={<Profile />} />
                <Route path="*" element={<Navigate replace to="/" />} />
            </Route>

            {/*####################################################################
            #######################################################################*/}

            <Route path="ITAFrontEndWeb/public/" element={<Menu />} >
                <Route path="activeRequest" element={<ActiveRequests />} />
                <Route path="*" element={<Navigate replace to="/" />} />
            </Route>
            <Route path="ITAFrontEndWeb/public/" element={<Menu />} >
                <Route path="requestHistory" element={<RequestHistory />} />
                <Route path="*" element={<Navigate replace to="/" />} />
            </Route>
        </Routes>
    )
}

export default Main;