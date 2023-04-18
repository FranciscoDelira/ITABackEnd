import './bootstrap';
import '../css/app.css'


import ReactDOM from 'react-dom/client';
import Main from './components/Main';
import Login from './components/auth/Login';
import Container from 'react-bootstrap/Container';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('example')).render(
    <BrowserRouter>
        <Main/> 
    </BrowserRouter>
);
