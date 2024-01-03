import jwt_decode from "jwt-decode";
import './styles/App.css';
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Home from './views/Home.js';
import Login from './views/Login.js';
import Register from './views/Register';
import ConsultIA from './views/ConsultIA';
import MyConsults from './views/MyConsults';
import TestIA from './views/TestIA';
import MyResults from './views/MyResults';
import MyProfile from './views/MyProfile';
import UsersManagement from "./views/UsersManagement.js";
function App() {

  const isAuthenticated = () => {

    const token = localStorage.getItem('token'); 
    if (!token) {
      return false; // El token no existe
    } else {
      try {
        const decodedToken = jwt_decode(token); // Decodificamos el token

        if (decodedToken.exp < Date.now() / 1000) {
          return false; // El token ha expirado
        } else {
          return true; // El token es válido y no ha expirado
        }
      } catch (error) {
        return false; // Error al decodificar el token
      }
    }
    
  };

  const adminVerify = () => {
    try {
      const decodedToken = jwt_decode(localStorage.getItem('token'));
      return decodedToken.rol === 'Admin';
    } catch (error) {
      return false;
    }
  };

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={!isAuthenticated() ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!isAuthenticated() ? <Register /> : <Navigate to="/" />} />
          <Route path="/myprofile" element={isAuthenticated() ? <MyProfile /> : <Navigate to="/login" />} />
          <Route path="/consultIA" element={isAuthenticated() ? <ConsultIA /> : <Navigate to="/login" />} />
          <Route path="/myconsults" element={isAuthenticated() ? <MyConsults /> : <Navigate to="/login" />} />
          <Route path="/testIA" element={isAuthenticated() ? <TestIA /> : <Navigate to="/login" />} />
          <Route path="/myresults" element={isAuthenticated() ? <MyResults /> : <Navigate to="/login" />} />
          <Route
            path="/usersmanagement"
            element={
              isAuthenticated() && adminVerify() ? (
                <UsersManagement />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
