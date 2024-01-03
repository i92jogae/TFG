import React from "react";
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import colors from "../config/config";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

const UsersTable = ({ rows, abrirModalBorrar }) => {

    const headerCellStyle = {
        color: colors.blue,
        fontFamily: 'Segoe UI',
        fontSize: '16px',
        fontWeight: 500,
        borderBottom:'1px solid rgba(0, 0, 0, .125)',
    };

    const formatFecha = (fecha) => {
        const date = new Date(fecha);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
      
        return `${day}/${month}/${year} - ${hours}:${minutes}`;
    };

    const renderTableHeaders = () => {
        const headers = ["Id", "Nombre de usuario", "Email", "Fecha de registro", "Rol", ""];
        return headers.map((header) => (
            <TableCell key={header} align="left" sx={headerCellStyle}>
                {header}
            </TableCell>
        ));
    };

    const renderTableRows = () => {
        return rows.map((row, index) => (
            <TableRow key={row.id} sx={{  backgroundColor: index % 2 === 1 ? 'inherit' : '#e3f2fd' , }}>
                <TableCell align="left" sx={{color:colors.text, fontWeight:'bold', border:'0px'}}>{row.id}</TableCell>
                <TableCell align="left" sx={{color:colors.text, border:'0px'}}>{row.nombre}</TableCell>
                <TableCell align="left" sx={{color:colors.text, border:'0px'}}>{row.correo}</TableCell>
                <TableCell align="left" sx={{color:colors.text, border:'0px'}}>{formatFecha(row.fecha_registro)}</TableCell>
                <TableCell align="left" sx={{color:colors.text, border:'0px'}}>{row.rol}</TableCell>
                <TableCell align="left" sx={{ color: colors.red, border: '0px' }}>
                    <IconButton onClick={() => abrirModalBorrar(row.id)}>
                        <DeleteForeverRoundedIcon sx={{ color: colors.red }} />
                    </IconButton>
                </TableCell>
            </TableRow>
        ));
    };

    return (
        <TableContainer component={Paper} elevation={0} sx={{ mt: 2 }}>
            <Table>
                <TableHead>
                    <TableRow>{renderTableHeaders()}</TableRow>
                </TableHead>
                <TableBody>{renderTableRows()}</TableBody>
            </Table>
        </TableContainer>
        
    );
};

export default UsersTable;
