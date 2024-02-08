import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import MenuDB from "../components/Menu";
import '../styles/MyResults.css';
import { Box, Button, Divider, LinearProgress, Typography } from "@mui/material";
import colors from "../config/config";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MarksTable from "../components/MarksTable";

function MyResults() {
    const [testResultados, setTestResultados] = useState([]);
    const [mediaResultados, setMediaResultados] = useState(null);
    const [aciertosTotales, setAciertosTotales] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3060/userMarks?usuario_id=${jwt_decode(localStorage.getItem('token')).id}`,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
        })
          .then(response => {
            setTestResultados(response.data);
            const calificaciones = response.data.map(test => test.calificacion);
            const media = parseFloat(((calificaciones.reduce((acc, calificacion) => acc + calificacion, 0) / calificaciones.length)*10).toFixed(1));
            const aciertosCalculados = (calificaciones.reduce((acc, calificacion) => acc + Math.round(calificacion*11/10), 0));
            setAciertosTotales({aciertos:aciertosCalculados,total:response.data.length*11});
            setMediaResultados(media);
          })
          .catch(error => {
            alert('Se ha producido un error al obtener sus resultados, intenteló en otro momento. ',error);
          });
    }, []); 

    
    const handleButtonTestClick = () => {
        navigate('/testIA');
    };
    return (
        <Box sx={{minHeight:'100vh', margin: 0, overflowY:'auto'}}>
            <MenuDB />
            <Box sx={{height:'100%',display:'flex',flexDirection:'column', pt:'30px', pb:'40px', pr:'60px', pl:'60px', gap:'15px', overflow:'hidden'}}>
                <Typography variant="h3" fontSize="40px" fontWeight="light" color={colors.blue} sx={{display:'flex',flexDirection:'row', alignItems:'end', gap:'20px',mb:'25px'}}>
                    Mis resultados 
                    <TaskAltIcon sx={{fontSize:'40px'}}/>
                </Typography>
                {testResultados.length === 0 ? (
                    <Typography variant="h6" ml="20px" fontWeight="regular" color={colors.blueSecondary} sx={{display:'flex', flexDirection:'column', gap:'20px'}} >
                        Todavía no has realizado ningún test...
                    <Button endIcon={<ExitToAppIcon/>} variant="contained" onClick={handleButtonTestClick} sx={{ boxShadow:0,width:'370px',background:colors.blueSecondary, textTransform:'none', "&:hover": {background:colors.blue, boxShadow:6}}}>
                        <Typography>
                        Haz click y pon a prueba tus conocimientos
                        </Typography>
                    </Button>
                    </Typography>
                ) : (
                    <Box>
                        <Box sx={{ mb: '20px', p:'25px', gap: '20px', display:'flex', flexDirection:{xs:'column', md:'row'}, borderRadius:'10px', border:'1px solid rgba(0, 0, 0, 0.17)'}}>
                            <Box sx={{ gap:'5px',width:{xs:'100%', md:'50%'}, display:'flex', flexDirection:'column', alignItems:'center'}}>
                                <Typography color="#607d8b" fontWeight="Regular" sx={{mb:'5px'}}>
                                    Su media de resultados es:
                                </Typography>
                                <LinearProgress variant="determinate" sx={{width:'100%'}} value={mediaResultados}></LinearProgress>
                                <Typography color="#607d8b" fontWeight="500" fontSize="16px">
                                    {mediaResultados}%
                                </Typography>
                            </Box>
                            <Divider sx={{display:{md:'none', lg:'none'} }}/>
                            <Box sx={{ gap:'5px',width:{xs:'100%', md:'50%'}, display:'flex', flexDirection:'column', alignItems:'center'}}>
                                <Typography color="#607d8b" fontWeight="Regular" sx={{mb:'5px'}}>
                                    Aciertos / Total de respuestas:
                                </Typography>
                                <Typography color="#607d8b" fontWeight="500" fontSize="16px" display="flex" flexDirection="row" gap="4px">
                                    <Typography fontWeight="500" fontSize="16px" style={{ color:colors.blue }}>
                                        {aciertosTotales.aciertos}
                                    </Typography>/ {aciertosTotales.total}
                                </Typography>
                            </Box>
                        </Box>
                        <Divider></Divider>
                        {/*Tabla de MUI */}
                        <MarksTable rows={testResultados}/>
                    </Box>
                )
                }
            </Box>
        </Box>
    );
}

export default MyResults;