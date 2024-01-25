import React, { useEffect, useState } from "react";
import { Backdrop, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fade, FormControl, IconButton, Input, InputAdornment, InputLabel, MenuItem, Modal, Select, Slide, TextField, Typography } from "@mui/material";
import MenuDB from "../components/Menu";
import '../styles/UsersManagement.css';
import colors from "../config/config";
import GroupIcon from '@mui/icons-material/Group';
import axios from "axios";
import UsersTable from "../components/UsersTable";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #42a5f5',
    boxShadow: 24,
    p: 4,
};
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function UsersManagement() {

    const [usuarios, setUsuarios] = useState([]);
    const [modalBorrarAbierto, setModalBorrarAbierto] = useState(false);
    const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
    const [idUsuario, setIdUsuario] = useState(null);
    const [borrado, setBorrado] = useState(false);
    const [editado, setEditado] = useState(false);
    const [mostrarContraseña, setMostrarContraseña] = useState(false);
    const [rol, setRol] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        fetchUserItems();
    }, []); 
    
    const fetchUserItems = () => {
        axios.get(`http://localhost:3060/users`,{
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            setUsuarios(response.data);
        })
        .catch(error => {
            alert('Se ha producido un error al recuperar los usuarios. ', error);
        });
    };

    //Manejadores para borrar
    const cerrarModalBorrar = () => {
        setModalBorrarAbierto(false);
    }
    const abrirModalBorrar = (id) => {
        setIdUsuario(id);
        setModalBorrarAbierto(true);
    };

    //Manejadores para editar
    const cerrarModalEditar = () => {
        setRol("");
        setModalEditarAbierto(false);
        setError("");
    }
    const abrirModalEditar = (id) => {
        setIdUsuario(id);
        setModalEditarAbierto(true);
    };

    const handleClickMostrarContraseña = () => {
        setMostrarContraseña((show) => !show);
    };
    
    const handleRolChange = (event) => {
        setRol(event.target.value);
    };

    const cerrarDialogoEdicion = () => {
        setEditado(false);
    };
    const cerrarDialogoBorrado = () => {
        setBorrado(false);
    };
    const editarUsuario = () => {
        const nombre = document.getElementById("username").value;
        const pass = document.getElementById("password").value;
        console.log(rol);
        if (nombre==="" || pass==="" || rol==="") {
            setError("Por favor, introduce un usuario y contraseña válidos y selecciona un rol.");
        } else if (pass.length<8 || !(/\d/.test(pass))) {
            setError("La contraseña debe tener al menos 8 caracteres y un número.");
        } else {
            axios
                .put(`http://localhost:3060/editUser?usuario_id=${idUsuario}`,
                    {
                        nuevo_nombre: nombre, nueva_contrasena: pass, rol: rol,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then( () => {
                    fetchUserItems();
                    cerrarModalEditar();
                    setEditado(true);
                })
                .catch((error) => {
                    if (error.response.status === 400) {
                        setError(error.response.data.error);
                    } else {
                        alert("Error al modificar el usuario, inténtelo de nuevo");
                    }
                })
        }
    };
    const borrarUsuario = () => {
        axios
            .delete(`http://localhost:3060/deleteUser?usuario_id=${idUsuario}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                fetchUserItems();
                cerrarModalBorrar();
                setBorrado(true);
            })
            .catch((error) => {
                alert('Se ha producido un error al borrar el usuario, inténtelo de nuevo. ', error);
            });
    };
    return (
        <Box sx={{minHeight:'100vh', margin: 0, }}>
            <MenuDB/>
            <Box sx={{display:'flex',flexDirection:'column', pt:'30px', pb:'40px', pr:'60px', pl:'60px', gap:'15px', overflow:'auto'}} >
                <Typography variant="h3" fontSize="40px" fontWeight="light" color={colors.blue} sx={{display:'flex',flexDirection:'row', alignItems:'end', gap:'20px',}}>
                    Usuarios  
                    <GroupIcon sx={{fontSize:'40px'}}/>
                </Typography>
                <UsersTable rows={usuarios} abrirModalBorrar={abrirModalBorrar} abrirModalEditar={abrirModalEditar} />
            </Box>
            <Modal
                open={modalEditarAbierto}
                closeAfterTransition
                slots={{backdrop:Backdrop}}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    }
                }}
            >
                <Fade in={modalEditarAbierto}>
                    <Box sx={style}>
                        <Typography color={colors.blue} variant="h5" >
                            Editar datos de usuario
                        </Typography>
                        
                        <TextField sx={{mt:'15px', mb:'6px', color:colors.blue}} required fullWidth id="username" label="Nuevo nombre de usuario" variant="standard" />
                        <FormControl fullWidth required variant="standard" sx={{mb:'6px'}}>
                            <InputLabel>Nueva contraseña</InputLabel>
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
                                                
                        <FormControl fullWidth variant="standard">
                            <InputLabel id="selectRol">Rol</InputLabel>
                            <Select
                                labelId="selectRol"
                                id="selectRol"
                                value={rol}
                                label="Rol"
                                onChange={handleRolChange}
                            >
                                <MenuItem value={"Usuario Generico"}>Estudiante</MenuItem>
                                <MenuItem value={"Admin"}>Administrador</MenuItem>
                            </Select>
                        </FormControl>
                        
                        {error && (
                            <Typography sx={{ color: '#e57373',  mt:'10px', display:'flex', alignItems:'center'}}>
                                <ErrorOutlineIcon sx={{mr:'5px'}}/>{error}
                            </Typography>
                        )}
                        
                        <Button variant="contained" onClick={editarUsuario} sx={{width:'30%', mt:'35px', mr:'10px', background:colors.blue, textTransform:'none', "&:hover": {background:colors.blue, boxShadow:9}}}>
                            <Typography sx={{fontWeight:'500'}}>Confirmar</Typography>
                        </Button>
                        <Button variant="contained" onClick={cerrarModalEditar} sx={{ width:'30%', mt:'35px', background:colors.red, textTransform:'none', "&:hover": {background:colors.red, boxShadow:9}}}>
                            <Typography sx={{fontWeight:'500'}}>Cancelar</Typography>
                        </Button>
                    </Box>
                </Fade>
            </Modal>
            {/*********************************************************************/}
            <Modal
                open={modalBorrarAbierto}
                closeAfterTransition
                slots={{backdrop:Backdrop}}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    }
                }}
            >
                <Fade in={modalBorrarAbierto}>
                    <Box sx={style}>
                        <Typography color={colors.blue} variant="h5" >
                            ¿Está seguro de que quiere eliminar el usuario?
                        </Typography>
                        <Button variant="contained" onClick={borrarUsuario} sx={{width:'30%', mt:'40px', mr:'10px', background:colors.blue, textTransform:'none', "&:hover": {background:colors.blue, boxShadow:9}}}>
                            <Typography sx={{fontWeight:'500'}}>Confirmar</Typography>
                        </Button>
                        <Button variant="contained" onClick={cerrarModalBorrar} sx={{ width:'30%', mt:'40px', background:colors.red, textTransform:'none', "&:hover": {background:colors.red, boxShadow:9}}}>
                            <Typography sx={{fontWeight:'500'}}>Cancelar</Typography>
                        </Button>
                    </Box>
                </Fade>
            </Modal>

            <Dialog
                open={editado}
                TransitionComponent={Transition}
                keepMounted
                onClose={cerrarDialogoEdicion}
                aria-describedby="alert-dialog-slide-description"
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle color={colors.blue} >{"Se ha actualizado correctamente"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description" fontWeight="Light" color={colors.blue} fontSize="large">
                        La información del usuario se ha editado con éxito.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={cerrarDialogoEdicion} sx={{background:colors.blue,opacity:'80%', textTransform:'none', "&:hover": {background:colors.blue, boxShadow:6}}}>
                    <Typography>
                        Continuar
                    </Typography>
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={borrado}
                TransitionComponent={Transition}
                keepMounted
                onClose={cerrarDialogoBorrado}
                aria-describedby="alert-dialog-slide-description"
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle color={colors.blue} >{"Se ha eliminado correctamente"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description" fontWeight="Light" color={colors.blue} fontSize="large">
                        El usuario se ha eliminado con éxito, así como sus consultas y test asociados.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={cerrarDialogoBorrado} sx={{background:colors.blue,opacity:'80%', textTransform:'none', "&:hover": {background:colors.blue, boxShadow:6}}}>
                    <Typography>
                        Continuar
                    </Typography>
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default UsersManagement;