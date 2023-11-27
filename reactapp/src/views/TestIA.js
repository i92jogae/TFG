import React, { useState } from "react";
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormGroup, Radio, RadioGroup, Slide, Typography } from "@mui/material";
import MenuDB from "../components/Menu";
import colors from "../config/config";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import QuizIcon from '@mui/icons-material/Quiz';
const temas = [
    "Introducción y Componentes de las Bases de Datos",
    "Representación de la Información, abstracción",
    "El Modelo de datos Entidad-Interrelación. Fundamentos EE-R",
    "El Modelo de datos Relacional",
    "El Álgebra Relacional",
    "Traducción del Modelo Conceptual al Relacional",
    "Integridad, Seguridad y Privacidad de las Bases de Datos",
    "Bases de Datos Activas",
    "Bases de Datos Distribuidas",
    "Bases de Datos Replicadas",
    "Consultas prácticas SQL y SQL/PL"
];
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function TestIA() {
    const [temasSeleccionados, setTemasSeleccionados] = useState([]);
    const [dificultadSeleccionada, setDificultadSeleccionada] = useState("fácil");
    const [isNotSelected, setIsNotSelected] = useState(false);

    const handleCloseDialogAlert = () => {
        setIsNotSelected(false);
    }
    const handleDificultadChange = (event) => {
        setDificultadSeleccionada(event.target.value);
    };
    const handleTemaChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setTemasSeleccionados((prevTemasSeleccionados) => [...prevTemasSeleccionados, value]);
        } else {
            setTemasSeleccionados((prevTemasSeleccionados) => prevTemasSeleccionados.filter((tema) => tema !== value)
            );
        }
    };
    const handleComenzarTest = () => {
        if (temasSeleccionados.length > 0) {
            // Aquí puedes realizar la lógica para comenzar el test
            console.log("Comenzar el test con los siguientes valores:");
            console.log("Temas seleccionados:", temasSeleccionados);
            console.log("Dificultad seleccionada:", dificultadSeleccionada);
        } else {
            // Muestra un mensaje o realiza alguna acción si no se cumplen los requisitos
            setIsNotSelected(true);
            console.log("Debes seleccionar al menos un tema y una dificultad.");
        }
    };

    return (
        <Box sx={{height:'100%', margin: 0 }}>
            <Dialog
                open={isNotSelected}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseDialogAlert}
                aria-describedby="alert-dialog-slide-description"
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle color={colors.blue} >{"No ha seleccionado ningún tema"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description" fontWeight="Light" color={colors.blue} fontSize="large">
                        Debe seleccionar al menos un tema para poder comenzar el test.
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
            <MenuDB />
            <Box sx={{pt:'30px', pl:'50px', pr:'50px',pb:'20px', display:'flex',flexDirection:'column',gap:'15px', overflowY:'auto' }}>
                <Typography variant="h3" fontSize="40px" fontWeight="light" color={colors.blue} sx={{display:'flex',flexDirection:'row', alignItems:'end', gap:'20px'}}>
                    Realizar test
                    <QuizIcon sx={{fontSize:'40px'}}/>
                </Typography>
            </Box>
            <Box sx={{height:'52vh', mb:'20px', overflow:'auto', display:'flex', flexDirection:{xs:'column', md:'row'},}}>
                <Box sx={{pl:'65px', pr:{xs:'65px', md:'0px'}, mb:{xs:'15px',md:'0px'} }}>
                    <Typography variant="h6" mb="1vw" fontWeight="light" color={colors.blue} >
                        Selecciona los temas sobre los que desees ser evaluado en el test.
                    </Typography>
                    <FormGroup row sx={{width:{xs:'auto', md:'820px'}}}>
                        {temas.map((tema, index) => (
                            <FormControlLabel
                                sx={{width:'400px'}}
                                key={index}
                                control={<Checkbox size="small" value={tema} onChange={handleTemaChange} checked={temasSeleccionados.includes(tema)} sx={{ color: colors.blue, '&.Mui-checked': { color: colors.blue } }} />}
                                label={<Typography sx={{ color: '#607d8b', fontSize: '0.8rem' }}>{tema}</Typography>}
                            />
                        ))}
                    </FormGroup>
                </Box>
                <Box sx={{pl:{xs:'65px', md:'0px'}, pr:'65px'}}>
                    <Typography variant="h6" mb="1vw" fontWeight="light" color={colors.blue} >
                        Selecciona la dificultad deseada para el test
                    </Typography>
                    <FormControl>
                        <RadioGroup defaultValue={null} value={dificultadSeleccionada} onChange={handleDificultadChange}>
                            <FormControlLabel 
                                value="fácil" 
                                control={<Radio size="small" sx={{color:colors.blue, '&.Mui-checked': {color:colors.blue}}}/>}
                                label={<Typography sx={{ color: '#607d8b', fontSize: '0.8rem' }}>Fácil</Typography>}
                            />
                            <FormControlLabel 
                                value="media" 
                                control={<Radio size="small" sx={{color:colors.blue, '&.Mui-checked': {color:colors.blue}}}/>}
                                label={<Typography sx={{ color: '#607d8b', fontSize: '0.8rem' }}>Media</Typography>}
                            />
                            <FormControlLabel 
                                value="avanzada"
                                control={<Radio size="small" sx={{color:colors.blue, '&.Mui-checked': {color:colors.blue}}}/>}
                                label={<Typography sx={{ color: '#607d8b', fontSize: '0.8rem' }}>Avanzada</Typography>}
                            />
                        </RadioGroup>
                    </FormControl>
                </Box>
            </Box>
            <Button endIcon={<ExitToAppIcon/>} variant="contained" onClick={handleComenzarTest} sx={{width:'90vw',minWidth:'161px', ml:'5vw', mr:'5vw',boxShadow:0,background:colors.blueSecondary, textTransform:'none', "&:hover": {background:colors.blue, boxShadow:6}}}>
                <Typography>
                    Comenzar test
                </Typography>
            </Button>
        </Box>
    );
}


export default TestIA;