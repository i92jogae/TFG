import React from "react";
import Typography from '@mui/material/Typography';
import { useState } from "react";
import colors from "../config/config";
import { useNavigate } from "react-router-dom";
import '../styles/Home.css';
import jwt_decode from "jwt-decode";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import StorageIcon from '@mui/icons-material/Storage';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';

function MenuDB() {
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    let nameUser = jwt_decode(localStorage.getItem('token')).nombre;

    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = "/";
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
                        <MenuItem key={'Mi perfil'} onClick={() => {handleCloseUserMenu(); handleMiPerfil();}}>
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
    );
}

export default MenuDB;