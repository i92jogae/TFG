import React, { useState } from "react";
import axios from "axios";
import MenuDB from "./Menu";
import Typography from '@mui/material/Typography';
import { Paper, Box, TextField, Divider, Avatar } from "@mui/material";
import jwt_decode from "jwt-decode";
import colors from "../config/config";
import '../styles/ConsultIA.css';
import DvrIcon from '@mui/icons-material/Dvr';
function ConsultIA() {
    const [conversations, setConversations] = useState([]); // Estado para almacenar las conversaciones
    const [inputText, setInputText] = useState(""); // Estado para almacenar el texto de entrada del usuario
    let firstLetterUser = jwt_decode(localStorage.getItem('token')).nombre.substring(0,1);
    const handleUserInput = () => {
      // Al manejar el envío de la consulta del usuario, agrega la conversación al estado
      if (inputText.trim() !== "") {
        setConversations(prevConversations => [
          ...prevConversations,
          { text: inputText, isUser: true },
        ]);
        setInputText("");
        axios
          .post('http://localhost:3060/sendqueryIA', { query: inputText }, {
            headers:{
            'Content-Type':'application/json'
          }}) // Ruta a tu API Express
          .then((response) => {
            const assistantReply = response.data;
            setConversations(prevConversations => [
              ...prevConversations,
              { text: assistantReply, isUser: false },
            ]);
          })
          .catch((error) => {
            console.error("Error al hacer la solicitud a la API de Express:", error);
          });
      }
    };
    
    return (
      <Box style={{height:'100%', margin: 0, backgroundColor:'white' }}>
        <MenuDB />
        <Box style={{display: 'flex', flexDirection:'column'}}>
          <Paper elevation={3} sx={{ overflowY:'auto',overflowX:'hidden', borderRadius:'0px', display:'flex', flexDirection:'column', height:'73.8vh', textAlign: 'left' }}>
          {conversations.map((conversation, index) => (
            <React.Fragment key={index}>
              <Typography
                variant="body1"
                sx={{ ml: "100px", mr: "100px", mt: "40px", mb: "40px", color:'#37474f', display:'flex', flexDirection:'row' }}
              >
                {conversation.isUser ? <Avatar variant="rounded" sx={{ bgcolor: colors.blue, mr:'22px' }}>{firstLetterUser}</Avatar> : <DvrIcon fontSize="large" sx={{color:colors.blue, mr:'22px',  }} />}
                {conversation.text}
              </Typography>
              {index >= 0 && <Divider light />}
            </React.Fragment>
          ))}
          </Paper>
          <Divider/>
          <Box sx={{backgroundColor:'white', display:'flex',justifyContent:'center', alignContent:'end', boxShadow: "0px 0px 45px white",}}>
            <TextField
              id="textFielConsulta"
              label="Envía tu consulta"
              multiline
              value={inputText}
              onChange={(event) => setInputText(event.target.value)}
              maxRows={2}
              sx={{ 
                backgroundColor:'white',
                mb:'18px',
                mt:'18.5px',
                width: '70%',
                position: 'sticky',
                zIndex: 1,
              }}
              onKeyDown={(event) => {if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                handleUserInput();              
              }}}
            />
          </Box>
        </Box>
      </Box>
    );
}

export default ConsultIA;