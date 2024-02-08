import React, { useState,useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import '../styles/MyProfile.css';
import MenuDB from "../components/Menu";
import colors from "../config/config";
import { Box, Divider, IconButton, List, ListItem, Modal, Typography, Fade, Backdrop, TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, FormControl, InputLabel, Input, InputAdornment } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

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

function MyProfile() {
    const [error, setError] = useState("");
    const [edited, setEdited] = useState(false);
    const [modalNombreAbierto, setModalNombreAbierto] = useState(false);
    const [modalPassAbierto, setModalPassAbierto] = useState(false);
    const [datosUsuario, setDatosUsuario] = useState({});
    const [mostrarContraseña, setMostrarContraseña] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:3060/userData?usuario_id=${jwt_decode(localStorage.getItem('token')).id}`,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        })
          .then(response => {
            setDatosUsuario(response.data);
          })
          .catch(error => {
            alert('Se ha producido un error al recuperar sus datos. ',error);
          });
    }, []); 

    const handleCloseDialogAlert = () => {
        setEdited(false);
        window.location.reload();
    }

    const handleOpenModalNombre = () => setModalNombreAbierto(true);
    const handleCloseModalNombre = () => {
        setModalNombreAbierto(false);
        setError("");
    }
    const handleOpenModalPass = () => setModalPassAbierto(true);
    const handleCloseModalPass = () => {
        setModalPassAbierto(false);
        setError("");
    }

    const handleClickMostrarContraseña = () => {
        setMostrarContraseña((show) => !show);
    };

    const handleSubmitNombre = () => {
        const nombre = document.getElementById("username").value; 
        if (nombre===""){
            setError("Debe introducir un nombre.");
        } else {
            //Solicitud para editar el nombre de usuario
            axios
            .put(`http://localhost:3060/editUsername`,
                { 
                    usuario_id: jwt_decode(localStorage.getItem("token")).id, nuevo_nombre: nombre 
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            )
            .then((response) => {
                handleCloseModalNombre();
                setEdited(true);
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    setError("El nuevo nombre no puede ser igual que el anterior");
                } else {
                    alert("Error al modificar su nombre de usuario, inténtelo de nuevo");
                }
            });
        }

    };

    const handleSubmitPass = () => {
        const pass = document.getElementById("password").value; 
        if (pass===""){
            setError("Debe introducir una contraseña.");
        } else if (pass.length<8 || !(/\d/.test(pass))) {
            setError("La contraseña debe tener al menos 8 caracteres y un número.");
        } else {
            //Solicitud para editar la contraseña
            axios
            .put(`http://localhost:3060/editPassword`,
                { 
                    usuario_id: jwt_decode(localStorage.getItem("token")).id, nueva_contrasena: pass 
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            )
            .then((response) => {
                handleCloseModalPass();
                setEdited(true);
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    setError("La nueva contraseña no puede ser igual que la anterior");
                } else {
                    alert("Error al modificar su contraseña, inténtelo de nuevo");
                }
            });
        }
    };

    return (
        <Box sx={{minHeight:'100vh', margin: 0, overflowY:'auto'}}>
            <Dialog
                open={edited}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseDialogAlert}
                aria-describedby="alert-dialog-edited"
                fullWidth
                maxWidth="sm"
                >
                <DialogTitle color={colors.blue} >{"Se ha modificado con éxito"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" fontWeight="Light" color={colors.blue} fontSize="large">
                        La modificación se ha realizado correctamente
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleCloseDialogAlert} sx={{background:colors.blue,opacity:'80%', textTransform:'none', "&:hover": {background:colors.blue, boxShadow:6}}}>
                    <Typography>
                        Aceptar
                    </Typography>
                    </Button>
                </DialogActions>
            </Dialog>
            <MenuDB />
            <Box sx={{ display:'flex', justifyContent:'center',height:'100%', mt:'50px', mb:'50px'}}>
                <Box sx={{ display:'flex',flexDirection:'column', gap:'17px', width:'50%', backgroundColor:'white',pt:'30px', pl:'40px', pr:'40px', pb:'10px', borderRadius:'10px', border:'1px solid rgba(0, 0, 0, 0.17)'}}>
                    <Modal
                        open={modalNombreAbierto}
                        closeAfterTransition
                        slots={{backdrop:Backdrop}}
                        slotProps={{
                            backdrop: {
                                timeout: 500,
                            }
                        }}
                    >
                        <Fade in={modalNombreAbierto}>
                            <Box sx={style}>
                                <Typography color={colors.blue} variant="h5" >
                                    Editar nombre de usuario
                                </Typography>
                                <TextField sx={{mt:'20px', color:colors.blue}} required fullWidth id="username" label="Nuevo nombre de usuario" variant="standard" />
                                {error && (
                                    <Typography sx={{ color: '#e57373', mt:'10px', display:'flex', alignItems:'center'}}>
                                        <ErrorOutlineIcon sx={{mr:'5px'}}/>{error}
                                    </Typography>
                                )}
                                <Button variant="contained" onClick={handleSubmitNombre} sx={{width:'30%', mt:'40px', mr:'10px', background:colors.blue, textTransform:'none', "&:hover": {background:colors.blue, boxShadow:9}}}>
                                    <Typography sx={{fontWeight:'500'}}>Confirmar</Typography>
                                </Button>
                                <Button variant="contained" onClick={handleCloseModalNombre} sx={{ width:'30%', mt:'40px', background:colors.red, textTransform:'none', "&:hover": {background:colors.red, boxShadow:9}}}>
                                    <Typography sx={{fontWeight:'500'}}>Cancelar</Typography>
                                </Button>
                            </Box>
                        </Fade>
                    </Modal>
                    <Modal
                        open={modalPassAbierto}
                        closeAfterTransition
                        slots={{backdrop:Backdrop}}
                        slotProps={{
                            backdrop: {
                                timeout: 500,
                            }
                        }}
                    >
                        <Fade in={modalPassAbierto}>
                            <Box sx={style}>
                                <Typography mb="20px" color={colors.blue} variant="h5" >
                                    Editar contraseña
                                </Typography>
                                <FormControl fullWidth required variant="standard">
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
                                    <Typography sx={{ color: '#e57373',  mt:'10px', display:'flex', alignItems:'center'}}>
                                        <ErrorOutlineIcon sx={{mr:'5px'}}/>{error}
                                    </Typography>
                                )}
                                <Button variant="contained" onClick={handleSubmitPass} sx={{ width:'30%', mt:'40px', mr:'10px', background:colors.blue, textTransform:'none', "&:hover": {background:colors.blue, boxShadow:9}}}>
                                    <Typography sx={{fontWeight:'500'}}>Confirmar</Typography>
                                </Button>
                                <Button variant="contained" onClick={handleCloseModalPass} sx={{ width:'30%', mt:'40px', background:colors.red, textTransform:'none', "&:hover": {background:colors.red, boxShadow:9}}}>
                                    <Typography sx={{fontWeight:'500'}}>Cancelar</Typography>
                                </Button>
                            </Box>
                        </Fade>
                    </Modal>
                    <Typography variant="h3" fontSize="39px" fontWeight="Light" color={colors.blue} sx={{display:'flex',flexDirection:'row', alignItems:'end', gap:'10px',}}>
                        Información personal
                        <ContactPageOutlinedIcon sx={{fontSize:'44px'}}/>
                    </Typography>
                    <Typography ml="10px" fontWeight="Regular" color="#607d8b" fontSize="15.5px">
                        Tu información personal será totalmente privada y siempre estará protegida. Además podrás gestionarla cuando lo desees.
                    </Typography>
                    <List sx={{width:'100%' }}>
                        <ListItem sx={{mb:'1%'}} secondaryAction=
                            {<IconButton edge="end" onClick={handleOpenModalNombre}>
                                <EditIcon/>
                            </IconButton>}
                        >
                            <Typography width="221px" fontSize="15.5px" color={colors.blue}>Nombre de usuario</Typography>
                            <Typography fontWeight="medium" fontSize="15.5px" color="#607d8b">{datosUsuario[0]?.nombre}</Typography>
                        </ListItem>
                        <Divider />
                        <ListItem sx={{mt:'1%', mb:'10px'}} >
                            <Typography width="221px" fontSize="15.5px" color={colors.blue}>Email</Typography>
                            <Typography fontWeight="medium" fontSize="15.5px" color="#607d8b">{datosUsuario[0]?.correo}</Typography>
                        </ListItem>
                        <Divider />
                        <ListItem sx={{mt:'1%'}} secondaryAction=
                            {<IconButton edge="end" onClick={handleOpenModalPass}>
                                <EditIcon />
                            </IconButton>}
                        >
                            <Typography width="221px" fontSize="15.5px" color={colors.blue}>Contraseña</Typography>
                            <Typography fontWeight="medium" fontSize="15.5px" color="#607d8b">***********</Typography>
                        </ListItem>
                    </List>
                </Box>
            </Box>
        </Box>
        
    );
}

export default MyProfile;