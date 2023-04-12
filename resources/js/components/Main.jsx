import { Routes, Route, Navigate } from "react-router-dom";
import Menu from "./Menu";
import Register from "./Register";
import Login from "./Login";
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
            <Route path="/laravel/topicos/public/" element={<Login />} >
                <Route path="login" element={<Login />} />
            </Route>
            <Route path="/laravel/topicos/public/" element={<Menu />} >
                <Route path="register" element={<Register />} />
                <Route path="*" element={<Navigate replace to="/" />} />
            </Route>
        </Routes>
    )
}

export default Main;