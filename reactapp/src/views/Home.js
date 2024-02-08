import React from "react";
import jwt_decode from "jwt-decode";
import colors from "../config/config";
import { useNavigate } from "react-router-dom";
import '../styles/Home.css';
import MenuDB from "../components/Menu";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import StorageIcon from '@mui/icons-material/Storage';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import SearchIcon from '@mui/icons-material/Search';
import fondo_final from '../images/fondo_final.png';
const cardtext1="Con nuestro chat de consultas inteligente puedes formular preguntas de cualquier área de base de datos. Integramos la Inteligencia Artificial de ChatGPT, haciendo las respuestas lo más precisas posible.";
const cardtext2="Con nuestro sistema de test automáticos generados por IA puedes poner en práctica tus conocimientos de forma personalizada: puedes elegir la dificultad y el/los tema/s que deseas practicar";
const cardtext3="Con nuestro sistema de retroalimentación puedes seguir tu progreso. Te ofrecemos un historial de consultas y de test realizados pudiendo revisar las respuestas y resultados obtenidos en cualquier momento";

function Home() {
  const navigate = useNavigate();

  function isUserAuthenticated() {
    const token = localStorage.getItem('token'); 
  
    if (!token) {
      return false; // El token no existe
    } else {
      try {
        const decodedToken = jwt_decode(token);
        // Comprobar si el token ha expirado
        if (decodedToken.exp < Date.now() / 1000) {
          return false; // El token ha expirado
        }
        
        return true; // El token es válido y no ha expirado
      } catch (error) {
        return false; // Error al decodificar el token
      }
    }
  } 

  const handleButtonLoginClick = () => {
    navigate('/login');
  };
  const handleButtonRegisterClick = () => {
    navigate('/register');
  };
    
  if (isUserAuthenticated()) {
    return (
      <Box sx={{ overflowY:'auto', margin: 0, backgroundImage: `url(${fondo_final})`, minHeight:'100vh',backgroundSize:'cover', }}>
        <MenuDB/>
        <Box sx={{
          pt:'27px', pl:'27px', pr:'27px', pb:'27px', height:'100%',flexGrow:1, overflow:'hidden'
        }}>
          <Typography sx={{fontSize:'2.6em', width:{md:'63%',xs:'80%'},fontWeight:'500'}} color="white" variant="h2">
            Amplía tus conocomientos en bases de datos de forma rápida y eficaz
          </Typography>
          <Grid container spacing={3.7} sx={{display: 'flex', flexDirection: { xs: 'column', md: 'row'}, m:'25px 0 0 0', justifyContent:'flex-start'}}>
            <Grid xs={2.7} sx={{ 
              mb:'30px',
              minWidth:{md:'250px', xs:'80%'},
              background: 'rgb(0,0,0,0.25)',
              backdropFilter: 'blur(35px)',
              mr:'30px',  borderRadius:'20px', 
              border:'1px solid rgba(0, 0, 0, 0.12)'
            }}>
              <Typography sx={{color:'white', mb:'5%'}} variant="h5">Usamos IA</Typography>
              
              <Typography sx={{fontSize:'0.95em', fontWeight:'350', textAlign:'justify', color:'white'}}>{cardtext1}</Typography>
              
            </Grid>
            <Grid xs={2.7} sx={{ 
                mb:'30px',
                minWidth:{md:'250px', xs:'80%'},
                background: 'rgb(0,0,0,0.25)', 
                backdropFilter: 'blur(35px)',
                mr:'30px',  borderRadius:'20px', 
                border:'1px solid rgba(0, 0, 0, 0.12)'
              }}>
              <Typography sx={{color:'white', mb:'5%'}} variant="h5">Test adaptados</Typography>
              
              <Typography sx={{fontSize:'0.95em', fontWeight:'350',textAlign:'justify', color: 'white'}}>{cardtext2}</Typography>
            </Grid>
            <Grid xs={2.7} sx={{
                mb:'30px',
                minWidth:{md:'250px', xs:'80%'},
                background: 'rgb(0,0,0,0.25)', 
                backdropFilter: 'blur(35px)',
                mr:'30px',  borderRadius:'20px', 
                border:'1px solid rgba(0, 0, 0, 0.12)'
              }}>
              <Typography sx={{color:'white', mb:'5%'}} variant="h5">Sigue tu progreso</Typography>
              
              <Typography sx={{fontSize:'0.95em', fontWeight:'350', textAlign:'justify', color:'white'}}>{cardtext3}</Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  } else {
    return(
      <Box sx={{ overflowY:'auto', margin: 0, backgroundImage: `url(${fondo_final})`,minHeight:'100vh', backgroundSize:'cover', }}>
        <AppBar position="static" sx={{background:colors.backgroundMenu}}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <StorageIcon sx={{fontSize:'1.3rem', display: { xs: 'none', md: 'flex' }, mr: 1.5 }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
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
              <StorageIcon sx={{ fontSize:'1.3em', display: { xs: 'flex', md: 'none' }, mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                fontSize="1.3em"
                component="a"
                sx={{
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
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent:'left'}}>
                <Button
                  variant="filledTonal"
                  key='Consultar IA'
                  onClick={handleButtonLoginClick}
                  startIcon={<SearchIcon />}
                  sx={{ height:'4.53em',color: 'white', display: 'inlineBlock', "&:hover": {
                    borderBottom: "3px solid white", borderRadius: "0"}
                  }}
                >
                  <Typography sx={{fontWeight:'500', fontSize:'1em'}}>Consultar IA</Typography>
                </Button>

                <Button
                  variant="filledTonal"
                  key='Mis consultas'
                  onClick={handleButtonLoginClick}
                  startIcon={<QuestionAnswerIcon />}
                  sx={{ color: 'white', display: 'inlineBlock', "&:hover": {
                    borderBottom: "3px solid white", borderRadius: "0"}
                  }}
                >
                  <Typography sx={{fontWeight:'500', fontSize:'1em'}}>Consultas realizadas</Typography>
                </Button>
                
                <Button
                  variant="filledTonal"
                  key='Realizar test'
                  onClick={handleButtonLoginClick}
                  startIcon={<PlaylistAddCheckCircleIcon />}
                  sx={{ color: 'white', display: 'inlineBlock', "&:hover": {
                    borderBottom: "3px solid white", borderRadius: "0"}
                  }}
                >
                  <Typography sx={{fontWeight:'500', fontSize:'1em'}}>Realizar test</Typography>
                </Button>

                <Button
                  variant="filledTonal"
                  key='Mis resultados'
                  onClick={handleButtonLoginClick}
                  startIcon={<TaskAltIcon />}
                  sx={{ color: 'white', display: 'inlineBlock',mr:'12px', "&:hover": {
                    borderBottom: "3px solid white", borderRadius: "0"}
                  }}
                >
                  <Typography sx={{fontWeight:'500', fontSize:'1em'}}>Mis resultados</Typography>
                </Button>
              </Box>
              <Box sx={{flexGrow:1,display:'flex', justifyContent:'right', padding:'11.74px 0' }}>
                <Button
                  key='Iniciar sesión'
                  onClick={handleButtonLoginClick}
                  sx={{
                    textTransform:'none',
                    paddingLeft: '15px', 
                    background:'white',
                    color:colors.blue, 
                    border:'2px solid white', 
                    borderTopLeftRadius:'45px', 
                    borderBottomLeftRadius:'45px', 
                    borderTopRightRadius:'0px', 
                    borderBottomRightRadius:'0px',
                    "&:hover": {
                      background:'white',
                      boxShadow:6
                    }
                    
                  }}
                >
                  <Typography sx={{fontWeight:'500', fontSize:'1em'}}>Iniciar sesión</Typography>
                </Button>

                <Button
                  key='Crear Cuenta'
                  onClick={handleButtonRegisterClick}
                  sx={{
                    textTransform:'none', 
                    paddingRight: '15px',
                    background:'none', 
                    color:'white', 
                    border:'2px solid white', 
                    borderTopRightRadius:'45px', 
                    borderBottomRightRadius:'45px',  
                    borderTopLeftRadius:'0px', 
                    borderBottomLeftRadius:'0px', 
                    "&:hover": {
                      boxShadow:6,
                      border:'2px solid transparent'
                    }
                  }}
                >
                  <Typography sx={{fontWeight:'500', fontSize:'1em'}}>Crear cuenta</Typography>
                </Button>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <Box sx={{
          pt:'27px', pl:'27px', pr:'27px', pb:'27px', height:'100%', flexGrow:1, overflow:'hidden'
        }}>
          <Typography sx={{fontSize:'2.6em', width:{md:'63%', xs:'80%'},fontWeight:'500'}} color="white" variant="h2">
            Amplía tus conocomientos en bases de datos de forma rápida y eficaz
          </Typography>
          <Grid container spacing={3.7} sx={{display: 'flex', flexDirection: { xs: 'column', md: 'row'}, m:'25px 0 0 0', justifyContent:'flex-start'}}>
            <Grid xs={2.7} sx={{ 
                mb:'30px',
                minWidth:{md:'250px', xs:'80%'},
                background: 'rgb(0,0,0,0.25)',
                backdropFilter: 'blur(35px)',
                mr:'30px',  borderRadius:'20px', 
                border:'1px solid rgba(0, 0, 0, 0.12)'
              }}>
              <Typography sx={{color:'white', mb:'5%'}} variant="h5">Usamos IA</Typography>
              
              <Typography sx={{fontSize:'0.95em', fontWeight:'350', textAlign:'justify', color:'white'}}>{cardtext1}</Typography>
              
            </Grid>
            <Grid xs={2.7} sx={{ 
                mb:'30px',
                minWidth:{md:'250px', xs:'80%'},
                background: 'rgb(0,0,0,0.25)', 
                backdropFilter: 'blur(35px)',
                mr:'30px',  borderRadius:'20px', 
                border:'1px solid rgba(0, 0, 0, 0.12)'
              }}>
              <Typography sx={{color:'white', mb:'5%'}} variant="h5">Test adaptados</Typography>
              
              <Typography sx={{fontSize:'0.95em', fontWeight:'350',textAlign:'justify', color: 'white'}}>{cardtext2}</Typography>
            </Grid>
            <Grid xs={2.7} sx={{
                mb:'30px',
                minWidth:{md:'250px', xs:'80%'},
                background: 'rgb(0,0,0,0.25)', 
                backdropFilter: 'blur(35px)',
                mr:'30px',  borderRadius:'20px', 
                border:'1px solid rgba(0, 0, 0, 0.12)'
              }}>
              <Typography sx={{color:'white', mb:'5%'}} variant="h5">Sigue tu progreso</Typography>
              
              <Typography sx={{fontSize:'0.95em', fontWeight:'350', textAlign:'justify', color:'white'}}>{cardtext3}</Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  }
  
}

export default Home;