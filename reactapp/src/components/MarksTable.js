import React from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import colors from "../config/config";

const MarksTable = ({ rows }) => {

    const headerCellStyle = {
        backgroundColor: colors.blueSecondary,
        color: 'white',
        fontWeight: 'Bold',
        fontSize: '14px'
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
        const headers = ["Fecha", "Calificación", "Dificultad", "Temas"];
        return headers.map((header) => (
            <TableCell key={header} align="center" sx={headerCellStyle}>
                {header}
            </TableCell>
        ));
    };

    const renderTableRows = () => {
        return rows.map((row, index) => (
            <TableRow key={row.fecha} sx={{ backgroundColor: index % 2 === 1 ? '#e3f2fd' : 'inherit'}}>
                <TableCell align="center" sx={{color:colors.text}}>{formatFecha(row.fecha)}</TableCell>
                <TableCell align="center" sx={{color:colors.text}}>{row.calificacion.toFixed(2)}</TableCell>
                <TableCell align="center" sx={{color:colors.text}}>{row.dificultad}</TableCell>
                <TableCell align="center" sx={{color:colors.text}}>{row.temas}</TableCell>
            </TableRow>
        ));
    };

    return (
        <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid rgba(0, 0, 0, 0.17)', mt: 2 }}>
            <Table>
                <TableHead>
                    <TableRow>{renderTableHeaders()}</TableRow>
                </TableHead>
                <TableBody>{renderTableRows()}</TableBody>
            </Table>
        </TableContainer>
    );
};

export default MarksTable;
