import React from 'react'
import { Box, Chip, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
import EditIcon from '@mui/icons-material/Edit'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import colors from '../config/config'

function formatFecha(fecha) {
  if (!fecha) return 'Sin fecha'

  const date = new Date(fecha)
  if (Number.isNaN(date.getTime())) return 'Sin fecha'

  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  return `${day}/${month}/${year} - ${hours}:${minutes}`
}

function getRoleLabel(role) {
  return role === 'Admin' ? 'Administrador' : 'Estudiante'
}

function RoleChip({ role }) {
  const isAdminRole = role === 'Admin'

  return (
    <Chip
      size="small"
      icon={isAdminRole ? <AdminPanelSettingsIcon /> : <PersonOutlineIcon />}
      label={getRoleLabel(role)}
      sx={{
        bgcolor: isAdminRole ? 'rgba(245,158,11,.14)' : colors.surfaceContainer,
        color: isAdminRole ? '#92400e' : colors.blueDark,
        fontWeight: 850,
        '& .MuiChip-icon': { color: 'inherit' }
      }}
    />
  )
}

function UserActions({ row, abrirModalBorrar, abrirModalEditar }) {
  if (row.rol === 'Admin') return <Typography sx={{ color: colors.textMuted, fontSize: '.85rem' }}>Protegido</Typography>

  return (
    <Box sx={{ display: 'flex', gap: 0.5, justifyContent: { xs: 'flex-start', md: 'center' } }}>
      <IconButton aria-label={`Editar usuario ${row.nombre}`} onClick={() => abrirModalEditar(row.id)} sx={{ color: colors.blue, bgcolor: 'rgba(2,132,199,.08)', '&:hover': { bgcolor: 'rgba(2,132,199,.14)' } }}>
        <EditIcon />
      </IconButton>
      <IconButton aria-label={`Eliminar usuario ${row.nombre}`} onClick={() => abrirModalBorrar(row.id)} sx={{ color: colors.red, bgcolor: 'rgba(239,68,68,.08)', '&:hover': { bgcolor: 'rgba(239,68,68,.14)' } }}>
        <DeleteForeverRoundedIcon />
      </IconButton>
    </Box>
  )
}

function UserMobileCard({ row, abrirModalBorrar, abrirModalEditar }) {
  return (
    <Paper elevation={0} sx={{ p: 2, border: `1px solid ${colors.border}`, borderRadius: 3, bgcolor: 'rgba(255,255,255,.82)' }}>
      <Stack spacing={1.5}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ color: colors.text, fontWeight: 900, fontSize: '1.05rem', overflowWrap: 'anywhere' }}>{row.nombre}</Typography>
            <Typography sx={{ color: colors.textMuted, fontSize: '.85rem' }}>ID {row.id}</Typography>
          </Box>
          <RoleChip role={row.rol} />
        </Box>

        <Box sx={{ display: 'grid', gap: 1 }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', minWidth: 0 }}>
            <EmailOutlinedIcon sx={{ color: colors.blue, fontSize: 19, flexShrink: 0 }} />
            <Typography sx={{ color: colors.textMuted, overflowWrap: 'anywhere' }}>{row.correo || 'Correo no disponible'}</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <CalendarMonthIcon sx={{ color: colors.teal, fontSize: 19 }} />
            <Typography sx={{ color: colors.textMuted }}>{formatFecha(row.fecha_registro)}</Typography>
          </Box>
        </Box>

        <UserActions row={row} abrirModalBorrar={abrirModalBorrar} abrirModalEditar={abrirModalEditar} />
      </Stack>
    </Paper>
  )
}

const UsersTable = ({ rows, abrirModalBorrar, abrirModalEditar }) => {
  const headerCellStyle = {
    color: 'white',
    background: colors.slate,
    fontSize: '14px',
    fontWeight: 900,
    borderBottom: 0,
    py: 1.8
  }

  return (
    <>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          display: { xs: 'none', md: 'block' },
          border: `1px solid ${colors.border}`,
          borderRadius: 3,
          overflow: 'hidden'
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {['Id', 'Nombre de usuario', 'Email', 'Fecha de registro', 'Rol', 'Acciones'].map((header) => (
                <TableCell key={header} align="left" sx={headerCellStyle}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.id} sx={{ backgroundColor: index % 2 === 1 ? 'white' : colors.surfaceDim }}>
                <TableCell align="left" sx={{ color: colors.text, fontWeight: 900, borderBottom: `1px solid ${colors.border}` }}>{row.id}</TableCell>
                <TableCell align="left" sx={{ color: colors.text, fontWeight: 750, borderBottom: `1px solid ${colors.border}` }}>{row.nombre}</TableCell>
                <TableCell align="left" sx={{ color: colors.textMuted, borderBottom: `1px solid ${colors.border}` }}>{row.correo}</TableCell>
                <TableCell align="left" sx={{ color: colors.textMuted, borderBottom: `1px solid ${colors.border}` }}>{formatFecha(row.fecha_registro)}</TableCell>
                <TableCell align="left" sx={{ borderBottom: `1px solid ${colors.border}` }}><RoleChip role={row.rol} /></TableCell>
                <TableCell align="center" sx={{ borderBottom: `1px solid ${colors.border}` }}>
                  <UserActions row={row} abrirModalBorrar={abrirModalBorrar} abrirModalEditar={abrirModalEditar} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack spacing={1.5} sx={{ display: { xs: 'flex', md: 'none' } }}>
        {rows.map((row) => (
          <UserMobileCard key={row.id} row={row} abrirModalBorrar={abrirModalBorrar} abrirModalEditar={abrirModalEditar} />
        ))}
      </Stack>
    </>
  )
}

export default UsersTable
