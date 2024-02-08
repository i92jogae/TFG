import React, { useState } from "react";
import axios from "axios";
import '../styles/TestIA.css';
import jwt_decode from "jwt-decode";
import { Box, Button, Checkbox, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, FormControlLabel, FormGroup, Radio, RadioGroup, Slide, Typography } from "@mui/material";
import MenuDB from "../components/Menu";
import colors from "../config/config";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import QuizIcon from '@mui/icons-material/Quiz';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
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
    const [loadingTest, setLoadingTest] = useState(false);
    const [generatedTest, setGeneratedTest] = useState();
    const [respuestasSeleccionadas, setRespuestasSeleccionadas] = useState({});
    const [testFinalizado, setTestFinalizado] = useState(false);
    const [calificacion, setCalificacion] = useState("");
    const [error, setError] = useState(false);

    const handleCloseDialogAlert = () => {
        setIsNotSelected(false);
    }
    const handleCloseDialogAlertError = () => {
        setError(false);
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
    const handleComenzarTest = async () => {
        if (temasSeleccionados.length > 0) {
            try { 
                setLoadingTest(true);
                const response = await axios
                .post('http://localhost:3060/generateTest',
                    { 
                        query: `Genera un test sobre bases de datos, sobre los siguientes temas: ${temasSeleccionados.join(', ')} . De dificultad ${dificultadSeleccionada}, que conste de 11 preguntas. Quiero que me devuelvas únicamente un array, en el que se incluya las variables "id_pregunta", "pregunta", "respuestas", "id_respuesta_correcta" por cada pregunta generada. No incluyas texto adicional, el id_respuesta_correcta debe ser un número` 
                    },
                    { 
                        headers: { 
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        } 
                    }
                );
                const cleanedResponse = response.data.substring(response.data.indexOf('['), response.data.lastIndexOf(']') + 1);
                const generatedTestObject = JSON.parse(cleanedResponse);
                setGeneratedTest(generatedTestObject);
            } catch (error) {
                setLoadingTest(false);
                setError(true);
            } finally {
                setLoadingTest(false);
            }
        } else {
            setIsNotSelected(true);
        }
    };

    const handleFinalizarTest = () => {  
        const puntaje = generatedTest.reduce((acumulador, pregunta) => {
            const respuestaSeleccionada = respuestasSeleccionadas[pregunta.id_pregunta];
            const respuestaCorrecta = pregunta.id_respuesta_correcta;
      
            if (respuestaSeleccionada && parseInt(respuestaSeleccionada) === respuestaCorrecta) {
               return acumulador + 1;
            }
            return acumulador;
        }, 0);
        const calificacionTest = parseFloat((puntaje / 11 * 10));
        setCalificacion(calificacionTest);
        setTestFinalizado(true);
        
        axios.post('http://localhost:3060/saveMark', {
            usuario_id: jwt_decode(localStorage.getItem('token')).id,
            calificacion: parseFloat(calificacionTest),
            dificultad: dificultadSeleccionada,
            temas: temasSeleccionados.join(', ')
        }, {
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        })
        .then((saveResponse) => {
            
        })
        .catch((saveError) => {
            alert('Se ha producido un error al guardar la calificación del test. ', saveError);
        })
    };

    const handleFinalizarRevision = () => {
        window.location.reload();
    };
    return (
        <Box sx={{minHeight:'100vh', margin: 0,overflowX:'hidden' }}>
            <Dialog
                open={isNotSelected}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseDialogAlert}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle color={colors.blue} >{"No ha seleccionado ningún tema"}</DialogTitle>
                <DialogContent>
                    <DialogContentText fontWeight="Light" color={colors.blue} fontSize="large">
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
            {loadingTest ? (
                <Box sx={{ display: 'flex', overflow:'hidden', flexDirection:'column', height:'88vh' ,justifyContent: 'center', alignItems: 'center', gap:'50px'}}>
                    <CircularProgress size={55}/>
                    <Typography variant="h7" color="#607d8b">Generando parámetros del test... Puede tardar unos minutos</Typography>
                </Box>
            ) : generatedTest ? (
                <Box sx={{height:'100%', display:'flex', flexDirection:'column',pt:'60px',pb:'60px', pr:'60px', pl:'60px' , overflowY:'auto', gap:'20px'}}>
                    {testFinalizado ? (
                        <>
                            <Typography variant="h4" fontSize="30px" fontWeight="light" color={colors.blue} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'end', gap: '20px' }}>
                                Ha obtenido una calificación de: {calificacion.toFixed(2)}/10
                            </Typography>
                            <Typography fontWeight="Regular" color="#607d8b" fontSize="16px">
                                A continuación puede revisar la corrección de cada pregunta
                            </Typography>
                        </>
                    ) : (
                        <>
                            <Typography ml="10px" fontWeight="Regular" color="#607d8b" fontSize="17px" sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap:'7px' }}>
                                Ya puede comenzar el test, las preguntas están basadas en los temas y dificultad seleccionados.
                            </Typography>
                            <Divider />
                        </>
                    )}
                    {generatedTest.map((question) => (
                        <Box key={question.id_pregunta}>
                            <Typography variant="h6" sx={{color:colors.blue}}>{question.id_pregunta}. {question.pregunta}</Typography>
                            <FormControl component="fieldset">
                                <RadioGroup
                                    aria-label={`Pregunta ${question.id_pregunta}`}
                                    name={`pregunta${question.id_pregunta}`}
                                    value={respuestasSeleccionadas[question.id_pregunta] || null}   
                                    onChange={(e) => {
                                        if (!testFinalizado) {
                                            setRespuestasSeleccionadas({
                                                ...respuestasSeleccionadas,
                                                [question.id_pregunta]: e.target.value,
                                            });
                                        }
                                    }}
                                >
                                    {question.respuestas.map((respuesta, index) => (
                                        <Box sx={{ display:'flex', flexDirection:'row', alignItems:'center', pl:'13px'}}>
                                            <FormControlLabel
                                                key={index}
                                                value={index + 1}  
                                                control={<Radio size="small" disabled={testFinalizado} sx={{ color: colors.blue, '&.Mui-checked': { color: colors.blue } }} />}
                                                label={<Typography sx={{color:'#607d8b'}}>{respuesta}</Typography>}
                                            />
                                            {testFinalizado && (
                                                <>
                                                    {index + 1 === question.id_respuesta_correcta ? (
                                                        <TaskAltRoundedIcon sx={{fontSize:'24px', color: '#66bb6a', }} />
                                                    ) : (
                                                        parseInt(respuestasSeleccionadas[question.id_pregunta]) === index + 1 && (
                                                            <CloseRoundedIcon sx={{ border:'1.9px solid #ef5350',borderRadius:'45px' ,fontSize:'18px', color: '#ef5350',  }} />
                                                        )
                                                    )}
                                                </>
                                            )}
                                        </Box>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </Box>
                    ))}
                    {!testFinalizado ? (
                        <Button endIcon={<ExitToAppIcon/>} onClick={handleFinalizarTest} variant="contained"  sx={{mt:'10px', boxShadow:0,background:colors.blueSecondary, textTransform:'none', "&:hover": {background:colors.blue, boxShadow:8}}}>
                            <Typography>
                                Finalizar test
                            </Typography>
                        </Button>
                    ) : (
                        <Button endIcon={<ExitToAppIcon/>} onClick={handleFinalizarRevision} variant="contained"  sx={{mt:'10px', boxShadow:0,background:colors.blueSecondary, textTransform:'none', "&:hover": {background:colors.blue, boxShadow:8}}}>
                            <Typography>
                                Finalizar revisión
                            </Typography>
                        </Button>
                    )}
                </Box>
            ) : (
                <>
                {error && (
                    <Dialog
                        open={error}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleCloseDialogAlertError}
                        fullWidth
                        maxWidth="sm"
                    >
                        <DialogTitle color={colors.red} >{"Se ha producido un error"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText fontWeight="Light" color={colors.red} fontSize="large">
                                Se ha producido un error al cargar el test, inténtelo de nuevo.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" onClick={handleCloseDialogAlertError} sx={{background:colors.red,opacity:'80%', textTransform:'none', "&:hover": {background:'#d32f2f', boxShadow:6}}}>
                                <Typography>
                                    Continuar
                                </Typography>
                            </Button>
                        </DialogActions>
                    </Dialog>
                )}
                <Box sx={{pt:'30px', pl:'50px', pr:'50px',pb:'20px', display:'flex',flexDirection:'column',gap:'15px'}}>
                    <Typography variant="h3" fontSize="40px" fontWeight="light" color={colors.blue} sx={{display:'flex',flexDirection:'row', alignItems:'end', gap:'20px'}}>
                        Realizar test
                        <QuizIcon sx={{fontSize:'40px'}}/>
                    </Typography>
                </Box>
                <Box sx={{height:'100%', mb:'20px', overflow:'auto', display:'flex', flexDirection:{xs:'column', md:'row'},}}>
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
                <Button endIcon={<ExitToAppIcon/>} variant="contained" onClick={handleComenzarTest} sx={{width:'90vw',minWidth:'161px', ml:'5vw', mr:'5vw',mb:'30px',boxShadow:0,background:colors.blueSecondary, textTransform:'none', "&:hover": {background:colors.blue, boxShadow:6}}}>
                    <Typography>
                        Comenzar test
                    </Typography>
                </Button>
                </>
            )}
        </Box>
    );
}


export default TestIA;