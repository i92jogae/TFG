import React, { useEffect, useState } from "react";
import { Backdrop, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fade, Modal, Slide, Typography } from "@mui/material";
import MenuDB from "../components/Menu";
import '../styles/UsersManagement.css';
import colors from "../config/config";
import GroupIcon from '@mui/icons-material/Group';
import axios from "axios";
import UsersTable from "../components/UsersTable";

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
    const [idUsuarioBorrar, setIdUsuarioBorrar] = useState(null);
    const [borrado, setBorrado] = useState(false);

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

    const cerrarModalBorrar = () => {
        setModalBorrarAbierto(false);
    }
    const abrirModalBorrar = (id) => {
        setIdUsuarioBorrar(id);
        setModalBorrarAbierto(true);
    };
    const cerrarDialogo = () => {
        setBorrado(false);
    };
    const borrarUsuario = () => {
        axios
            .delete(`http://localhost:3060/deleteUser?usuario_id=${idUsuarioBorrar}`,
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
                <UsersTable rows={usuarios} abrirModalBorrar={abrirModalBorrar} />
            </Box>
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
                open={borrado}
                TransitionComponent={Transition}
                keepMounted
                onClose={cerrarDialogo}
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
                    <Button variant="contained" onClick={cerrarDialogo} sx={{background:colors.blue,opacity:'80%', textTransform:'none', "&:hover": {background:colors.blue, boxShadow:6}}}>
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