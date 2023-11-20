import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import MenuDB from "./Menu";
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
        console.error('Error fetching user consultations:', error);
      });
  }, []); 

  const [expanded, setExpanded] = useState(false);
  const [consultaRespuesta, setConsultaRespuesta] = useState([]);
  
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
    
    return (
      <Box style={{height:'100%', margin: 0, }}>
        <MenuDB />
        <Box sx={{height:'80vh', mt:'20px', mb:'30px',ml:'50px', mr:'50px',p:'10px', display:'flex',flexDirection:'column',gap:'15px', overflowY:'auto' }}>
          <Typography variant="h2" color={colors.blue} sx={{display:'flex',flexDirection:'row', alignItems:'end', gap:'20px',mb:'10px'}}>
            Tus consultas 
            <QuestionAnswerIcon sx={{fontSize:'60px'}}/>
          </Typography>
          {consultaRespuesta.length === 0 ? (
            <Typography variant="h5" ml="20px" color={colors.blueSecondary} sx={{mt:'10px', display:'flex', flexDirection:'column', gap:'20px'}} >
              Todavía no has realizado ninguna consulta...
              <Button endIcon={<ExitToAppIcon/>} variant="contained" onClick={handleButtonConsultClick} sx={{ boxShadow:0,width:'280px',background:colors.blueSecondary, textTransform:'none', "&:hover": {background:colors.blue, boxShadow:6}}}>
                <Typography>
                  Haz click y empieza a consultar
                </Typography>
              </Button>
            </Typography>
          ) : (
            consultaRespuesta.map((consulta, index) => (
              <Accordion elevation="2" key={index} expanded={expanded === `panel${index + 1}`} onChange={handleChange(`panel${index + 1}`)}>
                <AccordionSummary
                  expandIcon={<KeyboardDoubleArrowDownIcon />}
                  aria-controls={`panel${index + 1}bh-content`}
                  id={`panel${index + 1}bh-header`}
                >
                  <Typography sx={{ width: '85%', flexShrink: 0, mr:'60px', fontWeight:'500'}}>
                    {consulta.consulta}
                  </Typography>
                  <Typography sx={{ color:colors.blue, fontWeight:'500' }}>
                    {new Date(consulta.fecha).getDate()+'/'+(new Date(consulta.fecha).getMonth() + 1)+'/'+new Date(consulta.fecha).getFullYear()}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{borderTop: '1px solid rgba(0, 0, 0, .125)'}}>
                  <Typography>
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