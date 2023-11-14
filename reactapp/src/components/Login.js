import {React, useState} from "react";
import axios from "axios";
import '../styles/Login.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import StorageIcon from '@mui/icons-material/Storage';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import colors from "../config/config";
import { useNavigate } from 'react-router-dom';

function Login() {
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const email = document.getElementById("user").value;
    const password = document.getElementById("password").value;
    if (email==="" || password==="") {
      setError("Debe introducir su email y contraseña");
    } else {
      console.log(email,password);
      // Realiza la solicitud POST a la ruta de inicio de sesión en tu API utilizando Axios
      axios.post('http://localhost:3060/login', {
        correo: email,
        contrasena: password,
      }, {
        headers:{
          'Content-Type':'application/json'
        }
      })
      .then(function (response) {
        // La solicitud fue exitosa, obtén el token y guárdalo en localStorage
        const data = response.data;
        localStorage.setItem("token", data.token);
        // Redirige al usuario a la página protegida o realiza cualquier otra acción
        window.location.href = "/"; // Ajusta la redirección según tus necesidades
      })
      .catch(function (error) {
        console.log(error);
        if (error.response) {
          // Si hay una respuesta del servidor
          if (error.response.status === 401) {
            // Código de error 401 (No autorizado)
            setError("Email o contraseña incorrectos");
          } else if (error.response.status === 500) {
            // Código de error 500 (Error interno del servidor)
            alert("Ha ocurrido un error interno del servidor. Por favor, inténtalo de nuevo más tarde.");
          } else {
            // Otros códigos de error
            alert("Ha ocurrido un error. Por favor, inténtalo de nuevo.");
          }
        } else {
          // Error de red u otro tipo de error
          alert("Ha ocurrido un error. Por favor, inténtalo de nuevo.");
        }
      });
    }
  };

  const navigate = useNavigate();
  const handleButtonRegisterClick = () => {
    navigate('/register');
  };
  const handleLogoClick = () => {
    navigate('/');
  };

    return (
      <Box sx={{height:'100%'}}>
        <AppBar position="static" sx={{background:colors.backgroundMenu}}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <StorageIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1.5 }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
                onClick={handleLogoClick}
                href="#app-bar-with-responsive-menu"
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  mr: 5,
                  fontWeight: 700,
                  fontFamily: 'monospace',
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                DBLEARNING
              </Typography>

              <StorageIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                DBLEARNING
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
        <Container sx={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          padding:'50px'
        }}>
          <Box component="form" sx={{
            zIndex:1,
            padding: '30px 50px 50px',
            background: colors.blue,
            boxShadow: '10',
            display: 'flex',
            flexDirection: 'column', 
            alignItems:'center'
          }}>
            <Box sx={{display:'flex', flexDirection:'row'}}>
              <Typography variant="h3" sx={{mt:'110px',color:'white', fontWeight:'600',display:'flex', alignItems:'center'}}>
                Bienvenido <EmojiPeopleIcon sx={{ml:'10px' ,fontSize:50, color:'white'}}/>  
              </Typography>

            </Box>
            <Typography variant="h6" sx={{mt:'146.5px', mb:'15px', color:'white'}}>¿Todavía sin cuenta? Regístrate ya</Typography>
            <Button onClick={handleButtonRegisterClick} variant="contained" sx={{ width:'100%', background:'white', textTransform:'none', color:colors.blue, "&:hover": {background:'white', boxShadow:6}}}>
              <Typography sx={{fontWeight:'500'}}>Registrarse</Typography>
            </Button>
          </Box>
          <Box component="form" sx={{
            padding: '30px 50px 50px',
            width: '370px',
            background: 'white',
            boxShadow: '10',
            display: 'flex',
            flexDirection: 'column', 
          }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              flexDirection: 'column', 
            }}>
              <AccountCircleIcon sx={{ color: colors.blue, fontSize: 120, mb: '10px', }} />
              <Typography variant="h3" sx={{color: colors.blue}}>Iniciar Sesión</Typography>
            </Box>
            <TextField sx={{color:colors.blue}} fullWidth margin="normal" required id="user" label="Email" variant="standard" />
            <TextField sx={{color:colors.blue}} fullWidth margin="normal" required id="password" type="password" label="Contraseña" variant="standard" />
            {error && (
              <Typography sx={{ color: '#e57373', mb:'0', display:'flex', alignItems:'center'}}>
                <ErrorOutlineIcon sx={{mr:'5px'}}/>{error}
              </Typography>
            )}
            <Button variant="contained" onClick={handleLogin} sx={{mt:'30px', background:colors.blue, textTransform:'none', "&:hover": {background:colors.blue, boxShadow:6}}}>
              <Typography sx={{fontWeight:'500'}}>Aceptar</Typography>
            </Button>
          </Box>
        </Container>
        
      </Box>
    );
}

export default Login;