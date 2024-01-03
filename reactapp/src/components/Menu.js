import React from "react";
import Typography from '@mui/material/Typography';
import { useState } from "react";
import colors from "../config/config";
import { useNavigate } from "react-router-dom";
import '../styles/Home.css';
import jwt_decode from "jwt-decode";
import {AppBar, Box, Toolbar, IconButton, Menu, Container, Button, Tooltip, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import StorageIcon from '@mui/icons-material/Storage';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import GroupIcon from '@mui/icons-material/Group';

function MenuDB() {
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    let nameUser = jwt_decode(localStorage.getItem('token')).nombre;
    const rol = jwt_decode(localStorage.getItem('token')).rol;

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/');
        window.location.reload();
    }
    const handleLogoClick = () => {
        navigate('/');
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
    };
    const handleGestionUsuarios = () => {
        navigate('/usersmanagement');
    };
    
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
    
    return (
        <AppBar position="static" sx={{ background:colors.backgroundMenu}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <StorageIcon sx={{fontSize:'1.3rem', display: { xs: 'none', md: 'flex' }, mr: 1.5 }} />
                    <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    onClick={handleLogoClick}
                    sx={{
                        display: { xs: 'none', md: 'flex' },
                        mr: 5,
                        fontWeight: 700,
                        fontSize:'1.3rem',
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
                        <SearchIcon color="primary" sx={{mr:'6px', fontSize:'1.4em'}}/>
                        <Typography textAlign="center" sx={{fontSize:'.9em'}}>Consultar IA</Typography>
                        </MenuItem>
                        <MenuItem key='Mis consultas' onClick={() => {handleCloseNavMenu(); handleButtonMisConsultas();}}>
                        <QuestionAnswerIcon color="primary" sx={{mr:'6px', fontSize:'1.4em'}}/>
                        <Typography textAlign="center" sx={{fontSize:'.9em'}}>Mis consultas</Typography>
                        </MenuItem>
                        <MenuItem key='Realizar test' onClick={() => {handleCloseNavMenu(); handleButtonRealizarTest();}}>
                        <PlaylistAddCheckCircleIcon color="primary" sx={{mr:'6px', fontSize:'1.4em'}}/> 
                        <Typography textAlign="center" sx={{fontSize:'.9em'}}>Realizar test</Typography>
                        </MenuItem>
                        <MenuItem key='Mis resultados' onClick={() => {handleCloseNavMenu(); handleButtonMisResultados();}}>
                        <TaskAltIcon color="primary" sx={{mr:'6px', fontSize:'1.4em'}}/>
                        <Typography textAlign="center" sx={{fontSize:'.9em'}}>Mis resultados</Typography>
                        </MenuItem>
                    </Menu>
                    </Box>
                    <StorageIcon sx={{ fontSize:'1.3em', display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                    variant="h5"
                    fontSize="1.3em"
                    noWrap
                    component="a"
                    onClick={handleLogoClick}
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
                        onClick={handleButtonConsultarIA}
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
                        onClick={handleButtonMisConsultas}
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
                        onClick={handleButtonRealizarTest}
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
                        onClick={handleButtonMisResultados}
                        startIcon={<TaskAltIcon />}
                        sx={{ color: 'white', display: 'inlineBlock',mr:'12px', "&:hover": {
                            borderBottom: "3px solid white", borderRadius: "0"}
                        }}
                        >
                        <Typography sx={{fontWeight:'500', fontSize:'1em'}}>Mis resultados</Typography>
                        </Button>

                    </Box>

                    <Box sx={{ flexGrow: 0}}>
                    <Tooltip title="Abrir ajustes">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0.5, borderRadius:'10px',":hover": {background:'none'}}}>
                        <Typography  sx={{fontSize:'.6em',color:'white'}}>{nameUser}</Typography>
                        <PersonIcon  color="primary" sx={{fontSize:'.8em', color: 'white', ml:'7px', border:'1.7px solid white',padding:'2px', borderRadius:'45px'}}/>
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
                        <MenuItem key={'Mi perfil'} onClick={() => { handleCloseUserMenu(); handleMiPerfil(); }}>
                            <ManageAccountsOutlinedIcon color="primary" sx={{mr:'7px', fontSize:'1.4em'}}/>
                            <Typography textAlign="center" sx={{fontSize:'.9em'}}>Mi perfil</Typography>
                        </MenuItem>
                        {rol === 'Admin' && (
                            <MenuItem key={'Gestión de usuarios'} onClick={() => { handleCloseUserMenu(); handleGestionUsuarios() }}>
                                <GroupIcon color="primary" sx={{mr:'7px', fontSize:'1.4em'}}/>
                                <Typography textAlign="center" sx={{fontSize:'.9em'}}>Gestión de usuarios</Typography>
                            </MenuItem>
                        )}
                        <MenuItem key={'Cerrar sesión'} onClick={() => { logout(); handleCloseUserMenu(); }}>
                            <LogoutIcon sx={{color:'IndianRed', mr:'7px', fontSize:'1.4em'}}/>
                            <Typography textAlign="center" sx={{fontSize:'.9em'}}>Cerrar sesión</Typography>
                        </MenuItem>  
                    </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default MenuDB;