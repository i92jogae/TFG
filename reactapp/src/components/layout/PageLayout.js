import { Box, Button, Paper, Typography } from '@mui/material'
import MenuDB from '../Menu'
import colors, { gradients } from '../../config/config'

export function PageLayout({ children, maxWidth = '1180px', spacing = 4 }) {
  return (
    <Box sx={{ minHeight: '100dvh', bgcolor: colors.background, background: gradients.soft, overflowX: 'clip' }}>
      <MenuDB />
      <Box
        component="main"
        sx={{
          width: '100%',
          maxWidth,
          mx: 'auto',
          px: { xs: 2, sm: 3, lg: 4 },
          py: { xs: 3, md: 5 },
          display: 'flex',
          flexDirection: 'column',
          gap: spacing,
          minWidth: 0
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
      className="fade-up"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', md: 'center' },
        gap: 2.5
      }}
    >
      <Box sx={{ maxWidth: 780, minWidth: 0 }}>
        {eyebrow && (
          <Typography variant="overline" sx={{ color: colors.blue, fontWeight: 900, letterSpacing: '.11em' }}>
            {eyebrow}
          </Typography>
        )}
        <Typography
          variant="h3"
          sx={{
            color: colors.text,
            fontSize: { xs: '2rem', md: '2.55rem' },
            fontWeight: 850,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            mt: eyebrow ? 0.5 : 0,
            lineHeight: 1.05
          }}
        >
          {title}
          {Icon && <Icon sx={{ fontSize: { xs: 32, md: 40 }, color: colors.blue }} />}
        </Typography>
        {description && (
          <Typography sx={{ color: colors.textMuted, mt: 1.5, fontSize: { xs: '0.98rem', md: '1.05rem' }, lineHeight: 1.75 }}>
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
      className="fade-up"
      sx={{
        bgcolor: 'rgba(255,255,255,.94)',
        border: `1px solid ${colors.border}`,
        borderRadius: 4,
        boxShadow: colors.shadowCard,
        overflow: 'hidden',
        minWidth: 0,
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
      <Typography variant="h6" sx={{ color: colors.text, fontWeight: 850, mb: 1 }}>
        {title}
      </Typography>
      {description && (
        <Typography sx={{ color: colors.textMuted, mb: actionLabel ? 3 : 0, lineHeight: 1.7 }}>
          {description}
        </Typography>
      )}
      {actionLabel && (
        <Button
          endIcon={actionIcon}
          variant="contained"
          onClick={onAction}
          sx={{
            bgcolor: colors.blue,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 750,
            boxShadow: 0,
            '&:hover': { bgcolor: colors.blueDark, boxShadow: 4 }
          }}
        >
          {actionLabel}
        </Button>
      )}
    </SurfaceCard>
  )
}
