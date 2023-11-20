import React, { useState } from "react";
import axios from "axios";
import MenuDB from "./Menu";
import Typography from '@mui/material/Typography';
import { Paper, Box, TextField, Divider, Avatar } from "@mui/material";
import jwt_decode from "jwt-decode";
import colors from "../config/config";
import '../styles/ConsultIA.css';
import DvrIcon from '@mui/icons-material/Dvr';
import dblearningchat from '../images/dblearningchat.png';
function ConsultIA() {
    const [conversations, setConversations] = useState([]); 
    const [inputText, setInputText] = useState(""); 
    let firstLetterUser = jwt_decode(localStorage.getItem('token')).nombre.substring(0,1);
    const handleUserInput = () => {
      // Al manejar el envío de la consulta del usuario, agrega la conversación al estado
      if (inputText.trim() !== "") {
        setConversations(prevConversations => [
          ...prevConversations,
          { text: inputText, isUser: true },
        ]);
        
        axios
          .post('http://localhost:3060/sendqueryIA', { query: inputText }, {
            headers:{
            'Content-Type':'application/json'
          }}) 
          .then((response) => {
            const assistantReply = response.data;
            setConversations(prevConversations => [
              ...prevConversations,
              { text: assistantReply, isUser: false },
            ]);

            axios.post('http://localhost:3060/saveConversation', {
              usuario_id: jwt_decode(localStorage.getItem('token')).id,
              consulta: inputText,
              respuesta: assistantReply,
            }, {
              headers:{
                'Content-Type':'application/json',
              }
            })
            .then((saveResponse) => {
              console.log(saveResponse.data.message);
            })
            .catch((saveError) => {
              console.error("Error saving conversation:", saveError);
            });
          })
          .catch((error) => {
            alert("Se ha producido un error en la consulta, inténtelo de nuevo");
            console.error("Error al hacer la solicitud a la API de Express:", error);
          });
        setInputText("");
      }
    };
    
    return (
      <Box style={{height:'100%', margin: 0, backgroundColor:'white' }}>
        <MenuDB />
        <Box style={{display: 'flex', flexDirection:'column'}}>
          <Paper elevation={3} sx={{ backgroundImage:conversations.length === 0 ? `url(${dblearningchat})` : 'none', backgroundSize:'100% 100%', overflowY:'auto',overflowX:'hidden', borderRadius:'0px', display:'flex', flexDirection:'column', height:'73.8vh', textAlign: 'left' }}>
          {conversations.map((conversation, index) => (
            <React.Fragment key={index}>
              <Typography
                variant="body1"
                sx={{ bgcolor:'white', ml: "100px", mr: "100px", mt: "40px", mb: "40px", color:'#37474f', display:'flex', flexDirection:'row' }}
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