import { Navigate, Outlet } from "react-router-dom";


const PrivateRoute = ({
    canActivate = localStorage.getItem('user-info'),
    redirectPath = '/'
}) => {
    if (!canActivate) {

        return <Navigate to={redirectPath} repleace />
    }
    return <Outlet />;
}


export default PrivateRoute;