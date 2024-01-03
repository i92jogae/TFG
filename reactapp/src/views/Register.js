import React, { useState } from "react";
import axios from "axios";
import '../styles/Register.css';
import colors from "../config/config";
import { useNavigate } from 'react-router-dom';
import { AppBar, Box, TextField, Toolbar, Typography, Container, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, FormControl, IconButton, Input, InputAdornment, InputLabel } from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Register() {
    const [error, setError] = useState('');
    const [registered, setRegistered] = useState(false);
    const [mostrarContraseña, setMostrarContraseña] = useState(false);

    const handleCloseDialogAlert = () => {
      setRegistered(false);
      navigate('/login');
    }
    const handleRegister = async () => {
      const nombre = document.getElementById("username").value;
      const email = document.getElementById("user").value;
      const password = document.getElementById("password").value;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (nombre==="" || email==="" || password==="") {
        setError("Debe introducir un usuario, email y contraseña.");
      } else if (!(emailRegex.test(email))) {
        setError("Debe introducir un email válido (_@_._)")
      } else if (password.length<8 || !(/\d/.test(password))) {
        setError("La contraseña debe tener al menos 8 caracteres y un número.");
      } else {
        axios.post('http://localhost:3060/register', {
          nombre: nombre,
          correo: email,
          contrasena: password,
        }, {
          headers:{
            'Content-Type':'application/json'
          }
        })
        .then(function (response) {
          setRegistered(true);
        })
        .catch(function (error) {
          if (error.response) {
            // Si hay una respuesta del servidor
            if (error.response.status === 400) {
              // Código de error 400 (La cuenta ya existe)
              setError('Este correo ya está registrado');
            } else if (error.response.status === 500) {
              // Código de error 500 (Error interno del servidor)
              alert("Ha ocurrido un error al procesar el registro. Por favor, inténtalo de nuevo más tarde.");
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
    const handleButtonLoginClick = () => {
        navigate('/login');
    };
    const handleLogoClick = () => {
        navigate('/');
    };

    const handleClickMostrarContraseña = () => {
      setMostrarContraseña((show) => !show);
    };

    return (
      <Box sx={{height:'100%'}}>
        <Dialog
          open={registered}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseDialogAlert}
          aria-describedby="alert-dialog-slide-description"
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle color={colors.blue} >{"Se ha registrado con éxito"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description" fontWeight="Light" color={colors.blue} fontSize="large">
              Haga click en continuar para iniciar sesión.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleCloseDialogAlert} sx={{background:colors.blue,opacity:'80%', textTransform:'none', "&:hover": {background:colors.blue, boxShadow:6}}}>
              <Typography>
                Continuar
              </Typography>
            </Button>
          </DialogActions>
        </Dialog>
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
                  fontSize:'1.3rem', 
                  display: { xs: 'none', md: 'flex' },
                  mr: 5,
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

              <StorageIcon sx={{ fontSize:'1.3rem', display: { xs: 'flex', md: 'none' }, mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
                onClick={handleLogoClick}
                sx={{
                  fontSize:'1.3rem', 
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
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
          padding:'30px'
        }}>
          <Box component="form" sx={{
            zIndex:1,
            pt:'20px',
            pb:'30px',
            pr:'45px',
            pl:'45px',
            background: colors.blue,
            boxShadow: '10',
            display: {xs:'none', md:'flex'},
            flexDirection: 'column', 
            alignItems:'center'
          }}>
            <Box sx={{display:'flex', flexDirection:'row'}}>
              <Typography variant="h3" sx={{mt:'95px', fontSize:'44.6px',color:'white', fontWeight:'400',display:'flex', alignItems:'center'}}>
                Bienvenido <EmojiPeopleIcon sx={{ml:'10px' ,fontSize:50, color:'white'}}/>  
              </Typography>

            </Box>
            <Typography variant="h6" sx={{mt:'151px', fontSize:'16.8px' ,mb:'10px', color:'white'}}>¿Ya estás registrado? Inicia sesión aquí</Typography>
            <Button onClick={handleButtonLoginClick} variant="contained" sx={{ width:'100%', background:'white', textTransform:'none', color:colors.blue, "&:hover": {background:'white', boxShadow:6}}}>
              <Typography sx={{fontWeight:'500'}}>Iniciar sesión</Typography>
            </Button>
          </Box>
          <Box component="form" sx={{
            pt:'20px',
            pb:'30px',
            pr:'45px',
            pl:'45px',
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
              <AccountCircleIcon sx={{  color: colors.blue, fontSize: '95px', }} />
              <Typography variant="h3" sx={{color: colors.blue, fontSize:'44.6px'}}>Crear cuenta</Typography>
            </Box>
            <TextField size="small" sx={{color:colors.blue, mt:'9.3px'}} fullWidth required id="username" label="Nombre de usuario" variant="standard" />
            <TextField size="small" sx={{color:colors.blue, mt:'9.3px'}} fullWidth required id="user" label="Email" variant="standard" />
            <FormControl size="small" sx={{color:colors.blue, mt:'9.3px', mb:'9.3px'}} fullWidth required variant="standard">
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
              <Typography sx={{ fontSize:'2.7vh',color: '#e57373', mb:'0', display:'flex', alignItems:'center'}}>
                <ErrorOutlineIcon sx={{fontSize:'4vh', mr:'5px'}}/>{error}
              </Typography>
            )}
            <Button variant="contained" onClick={handleRegister} sx={{mt:'3vh', background:colors.blue, textTransform:'none', "&:hover": {background:colors.blue, boxShadow:6}}}>
              <Typography sx={{fontWeight:'500'}}>Aceptar</Typography>
            </Button>
          </Box>
        </Container>
        
      </Box>
    );
}

export default Register;