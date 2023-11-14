import React, { useState } from "react";
import axios from "axios";
import '../styles/Register.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import StorageIcon from '@mui/icons-material/Storage';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import colors from "../config/config";
import { useNavigate } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Register() {
    const [error, setError] = useState('');
    const [registered, setRegistered] = useState(false);

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
        console.log(nombre,email,password);
        // Realiza la solicitud POST a la ruta de inicio de sesión en tu API utilizando Axios
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
          /* alert("Se ha registrado correctamente, haz click para continuar");
          navigate('/login'); */
        })
        .catch(function (error) {
          console.log(error);
          if (error.response) {
            // Si hay una respuesta del servidor
            if (error.response.status === 400) {
              // Código de error 400 (La cuenta ya existe)
              setError('Este correo ya está registrado');
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
    const handleButtonLoginClick = () => {
        navigate('/login');
    };
    const handleLogoClick = () => {
        navigate('/');
    };

    return (
      <Box sx={{height:'100%'}}>
        <Dialog
          open={registered}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseDialogAlert}
          aria-describedby="alert-dialog-slide-description"
          fullWidth="true"
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
              <Typography variant="h3" sx={{mt:'140px',color:'white', fontWeight:'600',display:'flex', alignItems:'center'}}>
                Bienvenido <EmojiPeopleIcon sx={{ml:'10px' ,fontSize:50, color:'white'}}/>  
              </Typography>

            </Box>
            <Typography variant="h6" sx={{mt:'168.5px', mb:'15px', color:'white'}}>¿Ya estás registrado? Inicia sesión aquí</Typography>
            <Button onClick={handleButtonLoginClick} variant="contained" sx={{ width:'100%', background:'white', textTransform:'none', color:colors.blue, "&:hover": {background:'white', boxShadow:6}}}>
              <Typography sx={{fontWeight:'500'}}>Iniciar sesión</Typography>
            </Button>
          </Box>
          <Box component="form" sx={{
            padding: '30px 60px 50px',
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
              <Typography variant="h3" sx={{color: colors.blue}}>Crear cuenta</Typography>
            </Box>
            <TextField sx={{color:colors.blue}} fullWidth margin="dense" required id="username" label="Nombre de usuario" variant="standard" />
            <TextField sx={{color:colors.blue}} fullWidth margin="dense" required id="user" label="Email" variant="standard" />
            <TextField sx={{color:colors.blue, mb:'10px'}} fullWidth margin="dense" required id="password" type="password" label="Contraseña" variant="standard" />
            {error && (
              <Typography sx={{ color: '#e57373', mb:'0', display:'flex', alignItems:'center'}}>
                <ErrorOutlineIcon sx={{mr:'5px'}}/>{error}
              </Typography>
            )}
            <Button variant="contained" onClick={handleRegister} sx={{mt:'40px', background:colors.blue, textTransform:'none', "&:hover": {background:colors.blue, boxShadow:6}}}>
              <Typography sx={{fontWeight:'500'}}>Aceptar</Typography>
            </Button>
          </Box>
        </Container>
        
      </Box>
    );
}

export default Register;