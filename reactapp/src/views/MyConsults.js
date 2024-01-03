import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/MyConsults.css'
import jwt_decode from "jwt-decode";
import MenuDB from "../components/Menu";
import {Box, Accordion, AccordionSummary, AccordionDetails, Typography, Button } from "@mui/material";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import colors from "../config/config";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function MyConsults() {

  const navigate = useNavigate();
  const handleButtonConsultClick = () => {
    navigate('/consultIA');
  }
  useEffect(() => {
    axios.get(`http://localhost:3060/userConsults?usuario_id=${jwt_decode(localStorage.getItem('token')).id}`,{
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        setConsultaRespuesta(response.data);
      })
      .catch(error => {
        alert('Se ha producido un error al recuperar las consultas. ',error);
      });
  }, []); 

  const [expanded, setExpanded] = useState(false);
  const [consultaRespuesta, setConsultaRespuesta] = useState([]);
  
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
    
    return (
      <Box sx={{minHeight:'100vh',overflowY:'auto', margin: 0,}}>
        <MenuDB />
        <Box sx={{height:'100%',overflow:'hidden', mt:'20px', mb:'30px',ml:'50px', mr:'50px',p:'10px', display:'flex',flexDirection:'column',gap:'15px',  }}>
          <Typography variant="h3" fontSize="40px" fontWeight="light" color={colors.blue} sx={{display:'flex',flexDirection:'row', alignItems:'end', gap:'20px',mb:'10px'}}>
            Tus consultas 
            <QuestionAnswerIcon sx={{fontSize:'40px'}}/>
          </Typography>
          {consultaRespuesta.length === 0 ? (
            <Typography variant="h6" ml="20px" fontWeight="regular" color={colors.blueSecondary} sx={{display:'flex', flexDirection:'column', gap:'20px'}} >
              Todavía no has realizado ninguna consulta...
              <Button endIcon={<ExitToAppIcon/>} variant="contained" onClick={handleButtonConsultClick} sx={{ boxShadow:0,width:'280px',background:colors.blueSecondary, textTransform:'none', "&:hover": {background:colors.blue, boxShadow:6}}}>
                <Typography>
                  Haz click y empieza a consultar
                </Typography>
              </Button>
            </Typography>
          ) : (
            consultaRespuesta.map((consulta, index) => (
              <Accordion elevation={2} key={index} expanded={expanded === `panel${index + 1}`} onChange={handleChange(`panel${index + 1}`)}>
                <AccordionSummary
                  expandIcon={<KeyboardDoubleArrowDownIcon />}
                  aria-controls={`panel${index + 1}bh-content`}
                  id={`panel${index + 1}bh-header`}
                >
                  <Typography fontSize="0.95rem" sx={{ width: '85%', flexShrink: 0, mr:'3.5vw', fontWeight:'500'}}>
                    {consulta.consulta}
                  </Typography>
                  <Typography fontSize="0.95rem" sx={{color:colors.blue, fontWeight:'500', visibility:{xs:'hidden', md:'visible'} }}>
                    {new Date(consulta.fecha).getDate()+'/'+(new Date(consulta.fecha).getMonth() + 1)+'/'+new Date(consulta.fecha).getFullYear()}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{borderTop: '1px solid rgba(0, 0, 0, .125)'}}>
                  <Typography fontSize="0.95rem">
                    {consulta.respuesta}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))
          )}
        </Box>
      </Box>
    );
}

export default MyConsults;