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
          pb: { xs: 7, md: 8 },
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

export function PageHeader({ eyebrow, title, description, icon: Icon, actions, aside }) {
  return (
    <Box
      className="fade-up"
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: aside ? 'minmax(0, 1fr) 320px' : '1fr auto' },
        alignItems: 'center',
        gap: { xs: 2.5, md: 4 },
        p: { xs: 2.5, md: 3 },
        border: `1px solid ${colors.border}`,
        borderRadius: 4,
        background: 'linear-gradient(135deg, rgba(255,255,255,.92), rgba(239,246,255,.82))',
        boxShadow: colors.shadowSoft,
        minWidth: 0
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: { xs: 1.75, md: 2.25 }, minWidth: 0 }}>
        {Icon && (
          <Box
            sx={{
              width: { xs: 48, md: 58 },
              height: { xs: 48, md: 58 },
              flexShrink: 0,
              borderRadius: 3,
              display: 'grid',
              placeItems: 'center',
              background: 'linear-gradient(135deg, rgba(2,132,199,.14), rgba(13,148,136,.12))',
              color: colors.blue,
              border: `1px solid ${colors.border}`
            }}
          >
            <Icon sx={{ fontSize: { xs: 28, md: 34 } }} />
          </Box>
        )}

        <Box sx={{ minWidth: 0, maxWidth: 820 }}>
          {eyebrow && (
            <Typography variant="overline" sx={{ color: colors.blueDark, fontWeight: 900, letterSpacing: '.12em', lineHeight: 1.4 }}>
              {eyebrow}
            </Typography>
          )}
          <Typography
            variant="h3"
            sx={{
              color: colors.text,
              fontSize: { xs: '2rem', md: '2.65rem' },
              fontWeight: 900,
              mt: eyebrow ? 0.5 : 0,
              lineHeight: 1.02,
              letterSpacing: '-.045em'
            }}
          >
            {title}
          </Typography>
          {description && (
            <Typography sx={{ color: colors.textMuted, mt: 1.25, fontSize: { xs: '0.98rem', md: '1.06rem' }, lineHeight: 1.75 }}>
              {description}
            </Typography>
          )}
        </Box>
      </Box>

      {aside || (actions && <Box sx={{ width: { xs: '100%', md: 'auto' } }}>{actions}</Box>)}
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
        transition: 'transform .18s ease, box-shadow .18s ease, border-color .18s ease',
        ...sx
      }}
    >
      {children}
    </Paper>
  )
}

export function EmptyState({ title, description, actionLabel, onAction, actionIcon, icon: Icon }) {
  return (
    <SurfaceCard sx={{ p: { xs: 3, md: 4 }, textAlign: { xs: 'left', sm: 'center' } }}>
      {Icon && (
        <Box sx={{ width: 62, height: 62, mx: { xs: 0, sm: 'auto' }, mb: 2, borderRadius: 3, display: 'grid', placeItems: 'center', color: colors.blue, bgcolor: colors.surfaceContainer }}>
          <Icon sx={{ fontSize: 34 }} />
        </Box>
      )}
      <Typography variant="h6" sx={{ color: colors.text, fontWeight: 900, mb: 1 }}>
        {title}
      </Typography>
      {description && (
        <Typography sx={{ color: colors.textMuted, mb: actionLabel ? 3 : 0, lineHeight: 1.7, maxWidth: 620, mx: { xs: 0, sm: 'auto' } }}>
          {description}
        </Typography>
      )}
      {actionLabel && (
        <Button
          endIcon={actionIcon}
          variant="contained"
          onClick={onAction}
          sx={{
            bgcolor: colors.slate,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 850,
            boxShadow: colors.shadowSoft,
            px: 2.5,
            py: 1.15,
            '&:hover': { bgcolor: colors.slateSoft, boxShadow: colors.shadowCard }
          }}
        >
          {actionLabel}
        </Button>
      )}
    </SurfaceCard>
  )
}

export function StatCard({ label, value, helper, icon: Icon, tone = 'blue' }) {
  const toneColor = tone === 'green' ? colors.green : tone === 'amber' ? colors.amber : tone === 'teal' ? colors.teal : colors.blue

  return (
    <SurfaceCard sx={{ p: { xs: 2.5, md: 3 }, position: 'relative' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ color: colors.textMuted, fontSize: '.86rem', fontWeight: 800, mb: 1 }}>
            {label}
          </Typography>
          <Typography sx={{ color: colors.text, fontSize: { xs: '2rem', md: '2.35rem' }, fontWeight: 900, lineHeight: 1 }}>
            {value}
          </Typography>
        </Box>
        {Icon && (
          <Box sx={{ width: 42, height: 42, display: 'grid', placeItems: 'center', borderRadius: 2.5, bgcolor: `${toneColor}17`, color: toneColor, flexShrink: 0 }}>
            <Icon sx={{ fontSize: 24 }} />
          </Box>
        )}
      </Box>
      {helper && (
        <Typography sx={{ color: colors.textMuted, mt: 1.25, fontSize: '.88rem', lineHeight: 1.6 }}>
          {helper}
        </Typography>
      )}
    </SurfaceCard>
  )
}

export function SectionTitle({ title, description, actions }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2, mb: 2.5 }}>
      <Box>
        <Typography variant="h5" sx={{ color: colors.text, fontWeight: 900 }}>
          {title}
        </Typography>
        {description && <Typography sx={{ color: colors.textMuted, mt: 0.75, lineHeight: 1.65 }}>{description}</Typography>}
      </Box>
      {actions}
    </Box>
  )
}
