import React from "react";
import '../styles/Register.css';
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
import colors from "../config/config";
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const handleButtonLoginClick = () => {
        navigate('/login');
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
              <Typography variant="h3" sx={{mt:'140px',color:'white', fontWeight:'600',display:'flex', alignItems:'center'}}>
                Bienvenido <EmojiPeopleIcon sx={{ml:'10px' ,fontSize:50, color:'white'}}/>  
              </Typography>

            </Box>
            <Typography variant="h6" sx={{mt:'188.5px', mb:'15px', color:'white'}}>¿Ya estás registrado? Inicia sesión aquí</Typography>
            <Button onClick={handleButtonLoginClick} variant="contained" sx={{ width:'100%', background:'white', textTransform:'none', color:colors.blue, "&:hover": {background:'white', boxShadow:6}}}>
              <Typography sx={{fontWeight:'500'}}>Iniciar sesión</Typography>
            </Button>
          </Box>
          <Box component="form" sx={{
            padding: '30px 60px 50px',
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
            <TextField sx={{color:colors.blue}} fullWidth margin="normal" required id="username" label="Nombre de usuario" variant="standard" />
            <TextField sx={{color:colors.blue}} fullWidth margin="normal" required id="user" label="Email" variant="standard" />
            <TextField sx={{color:colors.blue}} fullWidth margin="normal" required id="password" type="password" label="Contraseña" variant="standard" />
            <Button variant="contained" sx={{mt:'30px', background:colors.blue, textTransform:'none', "&:hover": {background:colors.blue, boxShadow:6}}}>
              <Typography sx={{fontWeight:'500'}}>Aceptar</Typography>
            </Button>
          </Box>
        </Container>
        
      </Box>
    );
}

export default Register;