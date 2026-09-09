import { Box, Button, Paper, Typography } from '@mui/material'
import MenuDB from '../Menu'
import colors from '../../config/config'

export function PageLayout({ children, maxWidth = '1180px', spacing = 4 }) {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f8fc', overflowX: 'hidden' }}>
      <MenuDB />
      <Box
        component="main"
        sx={{
          width: '100%',
          maxWidth,
          mx: 'auto',
          px: { xs: 2, sm: 3, md: 5 },
          py: { xs: 3, md: 5 },
          display: 'flex',
          flexDirection: 'column',
          gap: spacing
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export function PageHeader({ eyebrow, title, description, icon: Icon, actions }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', md: 'center' },
        gap: 2
      }}
    >
      <Box sx={{ maxWidth: 760 }}>
        {eyebrow && (
          <Typography variant="overline" sx={{ color: colors.blue, fontWeight: 700, letterSpacing: '.08em' }}>
            {eyebrow}
          </Typography>
        )}
        <Typography
          variant="h3"
          sx={{
            color: colors.blue,
            fontSize: { xs: '2rem', md: '2.55rem' },
            fontWeight: 300,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            mt: eyebrow ? 0.5 : 0
          }}
        >
          {title}
          {Icon && <Icon sx={{ fontSize: { xs: 34, md: 42 } }} />}
        </Typography>
        {description && (
          <Typography sx={{ color: colors.text, mt: 1.25, fontSize: { xs: '0.95rem', md: '1rem' }, lineHeight: 1.7 }}>
            {description}
          </Typography>
        )}
      </Box>
      {actions && <Box sx={{ width: { xs: '100%', md: 'auto' } }}>{actions}</Box>}
    </Box>
  )
}

export function SurfaceCard({ children, sx }) {
  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: 'white',
        border: '1px solid rgba(66, 165, 245, 0.16)',
        borderRadius: 4,
        boxShadow: '0 20px 55px rgba(25, 118, 210, 0.08)',
        overflow: 'hidden',
        ...sx
      }}
    >
      {children}
    </Paper>
  )
}

export function EmptyState({ title, description, actionLabel, onAction, actionIcon }) {
  return (
    <SurfaceCard sx={{ p: { xs: 3, md: 4 } }}>
      <Typography variant="h6" sx={{ color: colors.blue, fontWeight: 700, mb: 1 }}>
        {title}
      </Typography>
      {description && (
        <Typography sx={{ color: colors.text, mb: actionLabel ? 3 : 0, lineHeight: 1.7 }}>
          {description}
        </Typography>
      )}
      {actionLabel && (
        <Button
          endIcon={actionIcon}
          variant="contained"
          onClick={onAction}
          sx={{
            background: colors.blueSecondary,
            textTransform: 'none',
            boxShadow: 0,
            '&:hover': { background: colors.blue, boxShadow: 4 }
          }}
        >
          {actionLabel}
        </Button>
      )}
    </SurfaceCard>
  )
}
