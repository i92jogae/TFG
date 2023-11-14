import React from "react";
import { useState } from "react";
import jwt_decode from "jwt-decode";
import colors from "../config/config";
import { useNavigate } from "react-router-dom";
import '../styles/Home.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Unstable_Grid2';
import StorageIcon from '@mui/icons-material/Storage';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import fondo_final from '../images/fondo_final.png';
const cardtext1="Con nuestro chat de consultas inteligente puedes formular preguntas de cualquier área de base de datos. Integramos la Inteligencia Artificial de ChatGPT, haciendo las respuestas lo más precisas posible.";
const cardtext2="Con nuestro sistema de test automáticos generados por IA puedes poner en práctica tus conocimientos de forma personalizada: puedes elegir la dificultad y el/los tema/s que deseas practicar";
const cardtext3="Con nuestro sistema de retroalimentación puedes llevar un seguimiento de tu progreso. Te ofrecemos un historial de consultas y de test realizados pudiendo revisar las respuestas y resultados obtenidos en cualquier momento";
function Home() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  let nameUser = "";

  const logout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  }

  function isUserAuthenticated() {
    const token = localStorage.getItem('token'); // Otra forma de obtener el token almacenado
  
    if (!token) {
      return false; // El token no existe
    }
  
    try {
      const decodedToken = jwt_decode(token);
      // Comprobar si el token ha expirado
      if (decodedToken.exp < Date.now() / 1000) {
        return false; // El token ha expirado
      }
      nameUser=decodedToken.nombre;
      return true; // El token es válido y no ha expirado
    } catch (error) {
      return false; // Error al decodificar el token
    }
  } 

  const handleButtonLoginClick = () => {
    navigate('/login');
  };
  const handleButtonRegisterClick = () => {
    navigate('/register');
  };
  const handleButtonConsultarIA = () => {
    navigate('/consultIA');
  };
  const handleButtonMisConsultas = () => {
    navigate('/myconsults');
  };
  const handleButtonRealizarTest = () => {
    navigate('/testIA');
  };
  const handleButtonMisResultados = () => {
    navigate('/myresults');
  };
  const handleMiPerfil = () => {
    navigate('/myprofile');
  }
  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  if (isUserAuthenticated()) {
    return (
      <Box style={{height:'100%', margin: 0, backgroundImage: `url(${fondo_final})`, backgroundSize:'cover', }}>
        <AppBar position="static" sx={{background:colors.backgroundMenu}}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <StorageIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1.5 }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
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
    
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  <MenuItem key='Consultar IA' onClick={() => {handleCloseNavMenu(); handleButtonConsultarIA();}} >
                    <SearchIcon color="primary" sx={{mr:'6px'}}/>
                    <Typography textAlign="center">Consultar IA</Typography>
                  </MenuItem>
                  <MenuItem key='Mis consultas' onClick={() => {handleCloseNavMenu(); handleButtonMisConsultas();}}>
                    <QuestionAnswerIcon color="primary" sx={{mr:'6px'}}/>
                    <Typography textAlign="center">Mis consultas</Typography>
                  </MenuItem>
                  <MenuItem key='Realizar test' onClick={() => {handleCloseNavMenu(); handleButtonRealizarTest();}}>
                    <PlaylistAddCheckCircleIcon color="primary" sx={{mr:'6px'}}/> 
                    <Typography textAlign="center">Realizar test</Typography>
                  </MenuItem>
                  <MenuItem key='Mis resultados' onClick={() => {handleCloseNavMenu(); handleButtonMisResultados();}}>
                    <TaskAltIcon color="primary" sx={{mr:'6px'}}/>
                    <Typography textAlign="center">Mis resultados</Typography>
                  </MenuItem>
                </Menu>
              </Box>
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
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent:'left'}}>
                  <Button
                    variant="filledTonal"
                    key='Consultar IA'
                    onClick={handleButtonConsultarIA}
                    startIcon={<SearchIcon />}
                    sx={{ height:'68.45px',color: 'white', display: 'inlineBlock', "&:hover": {
                      borderBottom: "3px solid white", borderRadius: "0"}
                    }}
                  >
                    <Typography sx={{fontWeight:'500', fontSize:'1.05rem'}}>Consultar IA</Typography>
                  </Button>

                  <Button
                    variant="filledTonal"
                    key='Mis consultas'
                    onClick={handleButtonMisConsultas}
                    startIcon={<QuestionAnswerIcon />}
                    sx={{ color: 'white', display: 'inlineBlock', "&:hover": {
                      borderBottom: "3px solid white", borderRadius: "0"}
                    }}
                  >
                    <Typography sx={{fontWeight:'500', fontSize:'1.05rem'}}>Consultas realizadas</Typography>
                  </Button>
                  
                  <Button
                    variant="filledTonal"
                    key='Realizar test'
                    onClick={handleButtonRealizarTest}
                    startIcon={<PlaylistAddCheckCircleIcon />}
                    sx={{ color: 'white', display: 'inlineBlock', "&:hover": {
                      borderBottom: "3px solid white", borderRadius: "0"}
                    }}
                  >
                    <Typography sx={{fontWeight:'500', fontSize:'1.05rem'}}>Realizar test</Typography>
                  </Button>

                  <Button
                    variant="filledTonal"
                    key='Mis resultados'
                    onClick={handleButtonMisResultados}
                    startIcon={<TaskAltIcon />}
                    sx={{ color: 'white', display: 'inlineBlock',mr:'12px', "&:hover": {
                      borderBottom: "3px solid white", borderRadius: "0"}
                    }}
                  >
                    <Typography sx={{fontWeight:'500', fontSize:'1.05rem'}}>Mis resultados</Typography>
                  </Button>

              </Box>
    
              <Box sx={{ flexGrow: 0}}>
                <Tooltip title="Abrir ajustes">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0.5, borderRadius:'10px',":hover": {background:'none'}}}>
                    <Typography  sx={{color:'white'}}>{nameUser}</Typography>
                    <PersonIcon  color="primary" sx={{color: 'white', ml:'7px', border:'2px solid white',padding:'2px', borderRadius:'45px'}}/>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem key={'Mi perfil'} onClick={() => { handleMiPerfil(); handleCloseUserMenu();}}>
                    <ManageAccountsOutlinedIcon color="primary" sx={{mr:'5px'}}/>
                    <Typography textAlign="center">Mi perfil</Typography>
                  </MenuItem>
                  <MenuItem key={'Cerrar sesión'} onClick={() => { logout(); handleCloseUserMenu(); }}>
                    <LogoutIcon sx={{color:'IndianRed', mr:'5px'}}/>
                    <Typography textAlign="center">Cerrar sesión</Typography>
                  </MenuItem>  
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <Box sx={{
          padding:'30px', height:'100%',flexGrow:1, 
        }}>
          <Typography sx={{fontSize:'3rem', width:'63%',fontWeight:'560'}} color="white" variant="h2">
            Amplía tus conocomientos en bases de datos de forma rápida y eficaz
          </Typography>
          <Grid container spacing={5} sx={{m:'30px 0 0 0', justifyContent:'flex-start'}}>
            <Grid xs={2.5} sx={{ 
                background: 'rgb(0,0,0,0.25)',
                backdropFilter: 'blur(35px)',
                mr:'30px',  borderRadius:'20px', 
                border:'1px solid rgba(0, 0, 0, 0.12)'
              }}>
              <Typography sx={{color:'white'}} variant="h4">Usamos IA</Typography>
              <br/>
              <Typography sx={{fontSize:'large', fontWeight:'450', textAlign:'justify', color:'white'}}>{cardtext1}</Typography>
              <br/>
            </Grid>
            <Grid xs={2.5} sx={{ 
                background: 'rgb(0,0,0,0.25)', 
                backdropFilter: 'blur(35px)',
                mr:'30px',  borderRadius:'20px', 
                border:'1px solid rgba(0, 0, 0, 0.12)'
              }}>
              <Typography sx={{color:'white'}} variant="h4">Test adaptados</Typography>
              <br/>
              <Typography sx={{fontSize:'large', fontWeight:'450',textAlign:'justify', color: 'white'}}>{cardtext2}</Typography>
            </Grid>
            <Grid xs={2.5} sx={{
                background: 'rgb(0,0,0,0.25)', 
                backdropFilter: 'blur(35px)',
                mr:'30px',  borderRadius:'20px', 
                border:'1px solid rgba(0, 0, 0, 0.12)'
              }}>
              <Typography sx={{color:'white'}} variant="h4">Sigue tu progreso</Typography>
              <br/>
              <Typography sx={{fontSize:'large', fontWeight:'450', textAlign:'justify', color:'white'}}>{cardtext3}</Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  } else {
    return(
      <Box sx={{height:'100%', margin: 0, backgroundImage: `url(${fondo_final})`, backgroundSize:'cover', }}>
        <AppBar position="static" sx={{background:colors.backgroundMenu}}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <StorageIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1.5 }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
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
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent:'left'}}>
                <Button
                  variant="filledTonal"
                  key='Consultar IA'
                  onClick={handleButtonLoginClick}
                  startIcon={<SearchIcon />}
                  sx={{ height:'68.45px',color: 'white', display: 'inlineBlock', "&:hover": {
                    borderBottom: "3px solid white", borderRadius: "0"}
                  }}
                >
                  <Typography sx={{fontWeight:'500', fontSize:'1.05rem'}}>Consultar IA</Typography>
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
                  <Typography sx={{fontWeight:'500', fontSize:'1.05rem'}}>Consultas realizadas</Typography>
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
                  <Typography sx={{fontWeight:'500', fontSize:'1.05rem'}}>Realizar test</Typography>
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
                  <Typography sx={{fontWeight:'500', fontSize:'1.05rem'}}>Mis resultados</Typography>
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
                  <Typography sx={{fontWeight:'500', fontSize:'1.05rem'}}>Iniciar sesión</Typography>
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
                  <Typography sx={{fontWeight:'500', fontSize:'1.05rem'}}>Crear cuenta</Typography>
                </Button>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <Box sx={{
          padding:'30px', height:'100%',flexGrow:1, 
        }}>
          <Typography sx={{fontSize:'3rem', width:'63%',fontWeight:'560'}} color="white" variant="h2">
            Amplía tus conocomientos en bases de datos de forma rápida y eficaz
          </Typography>
          <Grid container spacing={5} sx={{m:'30px 0 0 0', justifyContent:'flex-start'}}>
            <Grid xs={2.5} sx={{ 
                background: 'rgb(0,0,0,0.25)',
                backdropFilter: 'blur(35px)',
                mr:'30px',  borderRadius:'20px', 
                border:'1px solid rgba(0, 0, 0, 0.12)'
              }}>
              <Typography sx={{color:'white'}} variant="h4">Usamos IA</Typography>
              <br/>
              <Typography sx={{fontSize:'large', fontWeight:'450', textAlign:'justify', color:'white'}}>{cardtext1}</Typography>
              <br/>
            </Grid>
            <Grid xs={2.5} sx={{ 
                background: 'rgb(0,0,0,0.25)', 
                backdropFilter: 'blur(35px)',
                mr:'30px',  borderRadius:'20px', 
                border:'1px solid rgba(0, 0, 0, 0.12)'
              }}>
              <Typography sx={{color:'white'}} variant="h4">Test adaptados</Typography>
              <br/>
              <Typography sx={{fontSize:'large', fontWeight:'450',textAlign:'justify', color: 'white'}}>{cardtext2}</Typography>
            </Grid>
            <Grid xs={2.5} sx={{
                background: 'rgb(0,0,0,0.25)', 
                backdropFilter: 'blur(35px)',
                mr:'30px',  borderRadius:'20px', 
                border:'1px solid rgba(0, 0, 0, 0.12)'
              }}>
              <Typography sx={{color:'white'}} variant="h4">Sigue tu progreso</Typography>
              <br/>
              <Typography sx={{fontSize:'large', fontWeight:'450', textAlign:'justify', color:'white'}}>{cardtext3}</Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  }
  
}

export default Home;