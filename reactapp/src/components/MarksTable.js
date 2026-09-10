import React from 'react'
import { Box, Chip, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import TopicIcon from '@mui/icons-material/Topic'
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

function formatScore(value) {
  const numericValue = Number(value)
  return Number.isFinite(numericValue) ? numericValue.toFixed(2) : '0.00'
}

function ResultMobileCard({ row }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        border: `1px solid ${colors.border}`,
        borderRadius: 3,
        bgcolor: 'rgba(255,255,255,.82)'
      }}
    >
      <Stack spacing={1.25}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, alignItems: 'flex-start' }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', color: colors.textMuted }}>
            <CalendarMonthIcon sx={{ fontSize: 18 }} />
            <Typography sx={{ fontSize: '.84rem', fontWeight: 750 }}>{formatFecha(row.fecha)}</Typography>
          </Box>
          <Chip label={`${formatScore(row.calificacion)}/10`} size="small" sx={{ bgcolor: colors.surfaceContainer, color: colors.blueDark, fontWeight: 900 }} />
        </Box>

        <Box sx={{ display: 'grid', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FitnessCenterIcon sx={{ color: colors.teal, fontSize: 20 }} />
            <Typography sx={{ color: colors.text, fontWeight: 850 }}>{row.dificultad || 'Sin dificultad'}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
            <TopicIcon sx={{ color: colors.blue, fontSize: 20, mt: 0.2 }} />
            <Typography sx={{ color: colors.textMuted, lineHeight: 1.55 }}>{row.temas || 'Sin temas registrados'}</Typography>
          </Box>
        </Box>
      </Stack>
    </Paper>
  )
}

const MarksTable = ({ rows }) => {
  const headerCellStyle = {
    backgroundColor: colors.slate,
    color: 'white',
    fontWeight: 900,
    fontSize: '14px',
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
              {['Fecha', 'Calificación', 'Dificultad', 'Temas'].map((header) => (
                <TableCell key={header} align="center" sx={headerCellStyle}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={`${row.fecha}-${index}`} sx={{ backgroundColor: index % 2 === 1 ? colors.surfaceDim : 'white' }}>
                <TableCell align="center" sx={{ color: colors.text, fontWeight: 650 }}>{formatFecha(row.fecha)}</TableCell>
                <TableCell align="center" sx={{ color: colors.text }}>
                  <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, fontWeight: 900, color: colors.blue }}>
                    <CheckCircleOutlineIcon sx={{ fontSize: 18 }} />
                    {formatScore(row.calificacion)}
                  </Box>
                </TableCell>
                <TableCell align="center" sx={{ color: colors.text }}>{row.dificultad}</TableCell>
                <TableCell align="center" sx={{ color: colors.textMuted, lineHeight: 1.55 }}>{row.temas}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack spacing={1.5} sx={{ display: { xs: 'flex', md: 'none' } }}>
        {rows.map((row, index) => (
          <ResultMobileCard key={`${row.fecha}-${index}`} row={row} />
        ))}
      </Stack>
    </>
  )
}

export default MarksTable
