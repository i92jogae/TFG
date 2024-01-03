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
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import colors from "../config/config";
import { useNavigate } from 'react-router-dom';
import { FormControl, IconButton, Input, InputAdornment, InputLabel } from "@mui/material";

function Login() {
  const [error, setError] = useState("");
  const [mostrarContraseña, setMostrarContraseña] = useState(false);

  const handleLogin = async () => {
    const email = document.getElementById("user").value;
    const password = document.getElementById("password").value;
    if (email==="" || password==="") {
      setError("Debe introducir su email y contraseña");
    } else {
      axios.post('http://localhost:3060/login', {
        correo: email,
        contrasena: password,
      }, {
        headers:{
          'Content-Type':'application/json'
        }
      })
      .then(function (response) {
        const data = response.data;
        localStorage.setItem("token", data.token);
        window.location.href = "/"; 
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status === 401) {
            setError("Email o contraseña incorrectos");
          } else if (error.response.status === 500) {
            alert("Se ha producido un error, inténtalo de nuevo más tarde.");
          } else {
            alert("Ha ocurrido un error. Por favor, inténtalo de nuevo.");
          }
        } else {
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

  const handleClickMostrarContraseña = () => {
    setMostrarContraseña((show) => !show);
  };

    return (
      <Box sx={{height:'100%'}}>
        <AppBar position="static" sx={{background:colors.backgroundMenu}}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <StorageIcon sx={{ fontSize:'1.3rem', display: { xs: 'none', md: 'flex' }, mr: 1.5 }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
                onClick={handleLogoClick}
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  mr: 5,
                  fontSize:'1.3rem', 
                  fontWeight: 700,
                  fontFamily: 'monospace',
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                  '&:hover': {
                    cursor: 'pointer', 
                  },
                }}
              >
                DBLEARNING
              </Typography>

              <StorageIcon sx={{fontSize:'1.3rem',  display: { xs: 'flex', md: 'none' }, mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
                onClick={handleLogoClick}
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontSize:'1.3rem', 
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                  '&:hover': {
                    cursor: 'pointer', 
                  },
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
          padding:'35px'
        }}>
          <Box component="form" sx={{
            zIndex:1,
            padding: '20px 40px 40px',
            background: colors.blue,
            boxShadow: '10',
            display: {xs:'none', md:'flex'},
            flexDirection: 'column', 
            alignItems:'center'
          }}>
            <Box sx={{display:'flex', flexDirection:'row'}}>
              <Typography variant="h3" sx={{mt:'100px', fontSize:'44.6px', color:'white', fontWeight:'400',display:'flex', alignItems:'center'}}>
                Bienvenido <EmojiPeopleIcon sx={{ml:'10px' ,fontSize:50, color:'white'}}/>  
              </Typography>

            </Box>
            <Typography variant="h6" sx={{mt:'110px', mb:'15px', color:'white'}}>¿Todavía sin cuenta? Regístrate ya</Typography>
            <Button onClick={handleButtonRegisterClick} variant="contained" sx={{ width:'100%', background:'white', textTransform:'none', color:colors.blue, "&:hover": {background:'white', boxShadow:6}}}>
              <Typography sx={{fontWeight:'500'}}>Registrarse</Typography>
            </Button>
          </Box>
          <Box component="form" sx={{
            padding: '20px 40px 40px',
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
              <AccountCircleIcon sx={{ color: colors.blue, fontSize: '95px', mb: '10px', }} />
              <Typography variant="h3" sx={{color: colors.blue, fontSize:'44.6px'}}>Iniciar Sesión</Typography>
            </Box>
            <TextField sx={{color:colors.blue, mt:'9.5px'}} fullWidth required id="user" label="Email" variant="standard" />
            <FormControl sx={{mt:'9.5px', mb:'9.5px'}}  fullWidth required variant="standard">
              <InputLabel>Contraseña</InputLabel>
                <Input
                  id="password"
                  type={mostrarContraseña ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickMostrarContraseña}
                      >
                        {mostrarContraseña ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
            </FormControl>
            {error && (
              <Typography sx={{ fontSize:'15px', color: '#e57373', mb:'0', display:'flex', alignItems:'center'}}>
                <ErrorOutlineIcon sx={{mr:'5px', fontSize:'22px'}}/>{error}
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