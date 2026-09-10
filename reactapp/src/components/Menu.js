import { useState } from 'react'
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu as DropdownMenu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import StorageIcon from '@mui/icons-material/Storage'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import SearchIcon from '@mui/icons-material/Search'
import PersonIcon from '@mui/icons-material/Person'
import LogoutIcon from '@mui/icons-material/Logout'
import LoginIcon from '@mui/icons-material/Login'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import GroupIcon from '@mui/icons-material/Group'
import colors from '../config/config'
import { clearStoredToken, getCurrentUser, isAdmin, isAuthenticated } from '../utils/auth'

const navigationItems = [
  { label: 'Consultar IA', path: '/consultIA', icon: SearchIcon },
  { label: 'Consultas realizadas', path: '/myconsults', icon: QuestionAnswerIcon },
  { label: 'Realizar test', path: '/testIA', icon: PlaylistAddCheckCircleIcon },
  { label: 'Mis resultados', path: '/myresults', icon: TaskAltIcon }
]

const protectedPaths = navigationItems.map((item) => item.path)

function Brand({ onClick }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.1,
        cursor: 'pointer',
        minWidth: { xs: 0, sm: 205 },
        color: colors.text
      }}
    >
      <Box
        sx={{
          width: 34,
          height: 34,
          display: 'grid',
          placeItems: 'center',
          borderRadius: 2.2,
          background: colors.blue,
          color: 'white',
          boxShadow: '0 10px 25px rgba(2,132,199,.22)'
        }}
      >
        <StorageIcon sx={{ fontSize: 20 }} />
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography
          noWrap
          sx={{
            fontFamily: 'Hanken Grotesk, sans-serif',
            fontWeight: 900,
            fontSize: { xs: '1rem', sm: '1.05rem' },
            letterSpacing: '-.03em',
            lineHeight: 1,
            color: colors.text
          }}
        >
          DB<span style={{ color: colors.blue }}>LEARNING</span>
        </Typography>
        <Typography
          sx={{
            display: { xs: 'none', md: 'block' },
            mt: 0.25,
            color: colors.textMuted,
            fontSize: '.66rem',
            fontWeight: 700,
            letterSpacing: '.08em',
            textTransform: 'uppercase'
          }}
        >
          SQL & IA v2.4
        </Typography>
      </Box>
    </Box>
  )
}

function MenuDB() {
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [anchorElUser, setAnchorElUser] = useState(null)
  const authenticated = isAuthenticated()
  const currentUser = getCurrentUser()
  const userName = currentUser?.nombre || 'Invitado'
  const userInitial = userName.substring(0, 1).toUpperCase()
  const canManageUsers = authenticated && isAdmin()

  const closeMenus = () => {
    setMobileOpen(false)
    setAnchorElUser(null)
  }

  const handleNavigate = (path) => {
    closeMenus()

    if (!authenticated && protectedPaths.includes(path)) {
      navigate('/login')
      return
    }

    navigate(path)
  }

  const logout = () => {
    closeMenus()
    clearStoredToken()
    navigate('/', { replace: true })
  }

  const userActions = authenticated
    ? [
        { label: 'Mi perfil', path: '/myprofile', icon: ManageAccountsOutlinedIcon },
        ...(canManageUsers ? [{ label: 'Gestión de usuarios', path: '/usersmanagement', icon: GroupIcon }] : [])
      ]
    : [
        { label: 'Iniciar sesión', path: '/login', icon: LoginIcon },
        { label: 'Crear cuenta', path: '/register', icon: PersonAddAltIcon }
      ]

  const mobileDrawer = (
    <Box sx={{ width: 300, maxWidth: '84vw', p: 2.25 }} role="presentation">
      <Brand onClick={() => handleNavigate('/')} />
      <Typography sx={{ mt: 2.5, mb: 1, color: colors.textMuted, fontSize: '.72rem', fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase' }}>
        Navegación
      </Typography>
      <List disablePadding>
        {navigationItems.map(({ label, path, icon: Icon }) => {
          const active = location.pathname === path
          return (
            <ListItemButton
              key={path}
              selected={active}
              onClick={() => handleNavigate(path)}
              sx={{
                mb: 0.75,
                borderRadius: 2,
                color: active ? colors.blueDark : colors.text,
                '&.Mui-selected': { bgcolor: 'rgba(2,132,199,.1)' }
              }}
            >
              <ListItemIcon sx={{ minWidth: 38, color: active ? colors.blue : colors.textMuted }}>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={label} primaryTypographyProps={{ fontWeight: active ? 800 : 650, fontSize: '.94rem' }} />
            </ListItemButton>
          )
        })}
      </List>
      <Divider sx={{ my: 2 }} />
      <Stack spacing={1}>
        {userActions.map(({ label, path, icon: Icon }) => (
          <Button
            key={path}
            fullWidth
            startIcon={<Icon />}
            onClick={() => handleNavigate(path)}
            variant={label === 'Iniciar sesión' ? 'contained' : 'outlined'}
            sx={{
              justifyContent: 'flex-start',
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 700,
              ...(label === 'Iniciar sesión'
                ? { bgcolor: colors.blue, '&:hover': { bgcolor: colors.blueDark } }
                : { borderColor: colors.borderStrong, color: colors.text })
            }}
          >
            {label}
          </Button>
        ))}
        {authenticated && (
          <Button fullWidth startIcon={<LogoutIcon />} onClick={logout} sx={{ justifyContent: 'flex-start', color: colors.red, textTransform: 'none', fontWeight: 700 }}>
            Cerrar sesión
          </Button>
        )}
      </Stack>
    </Box>
  )

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        top: 0,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: 'rgba(255,255,255,.9)',
        color: colors.text,
        borderBottom: `1px solid ${colors.border}`,
        backdropFilter: 'blur(18px)',
        boxShadow: '0 1px 2px rgba(15,23,42,.04)'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 72 }, gap: 1.25 }}>
          <IconButton
            aria-label="Abrir menú principal"
            onClick={() => setMobileOpen(true)}
            sx={{ display: { xs: 'inline-flex', md: 'none' }, color: colors.text, mr: 0.5 }}
          >
            <MenuIcon />
          </IconButton>

          <Brand onClick={() => handleNavigate('/')} />

          <Stack
            direction="row"
            spacing={0.5}
            sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', flex: 1, justifyContent: 'center' }}
          >
            {navigationItems.map(({ label, path, icon: Icon }) => {
              const isActive = location.pathname === path

              return (
                <Button
                  key={path}
                  onClick={() => handleNavigate(path)}
                  startIcon={<Icon sx={{ fontSize: 18 }} />}
                  sx={{
                    px: 1.45,
                    py: 1,
                    borderRadius: 2,
                    color: isActive ? colors.blueDark : colors.textSoft,
                    bgcolor: isActive ? 'rgba(2,132,199,.1)' : 'transparent',
                    border: `1px solid ${isActive ? 'rgba(2,132,199,.16)' : 'transparent'}`,
                    textTransform: 'none',
                    fontWeight: 750,
                    fontSize: '.86rem',
                    '&:hover': {
                      bgcolor: 'rgba(2,132,199,.08)',
                      borderColor: 'rgba(2,132,199,.16)'
                    }
                  }}
                >
                  {label}
                </Button>
              )
            })}
          </Stack>

          <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>
            {!authenticated && (
              <Stack direction="row" spacing={1} sx={{ display: { xs: 'none', sm: 'flex' } }}>
                <Button onClick={() => handleNavigate('/login')} sx={{ color: colors.text, textTransform: 'none', fontWeight: 750 }}>
                  Iniciar sesión
                </Button>
                <Button
                  onClick={() => handleNavigate('/register')}
                  variant="contained"
                  sx={{ bgcolor: colors.blue, borderRadius: 2, textTransform: 'none', fontWeight: 800, boxShadow: 0, '&:hover': { bgcolor: colors.blueDark, boxShadow: 3 } }}
                >
                  Crear cuenta
                </Button>
              </Stack>
            )}

            {authenticated ? (
              <>
                <Tooltip title="Abrir ajustes">
                  <IconButton
                    onClick={(event) => setAnchorElUser(event.currentTarget)}
                    sx={{
                      p: 0.6,
                      borderRadius: 999,
                      color: colors.text,
                      bgcolor: colors.surfaceContainer,
                      border: `1px solid ${colors.border}`,
                      '&:hover': { bgcolor: colors.surfaceContainerHigh }
                    }}
                  >
                    <Typography sx={{ display: { xs: 'none', sm: 'block' }, mx: 1, fontSize: '.84rem', fontWeight: 800, color: colors.text }}>
                      {userName}
                    </Typography>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: colors.blue, color: 'white', fontWeight: 900, fontSize: '.9rem' }}>
                      {userInitial || <PersonIcon fontSize="small" />}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <DropdownMenu
                  sx={{ mt: 1 }}
                  id="user-settings-menu"
                  anchorEl={anchorElUser}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  keepMounted
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  open={Boolean(anchorElUser)}
                  onClose={closeMenus}
                  PaperProps={{ sx: { borderRadius: 3, minWidth: 230, border: `1px solid ${colors.border}`, boxShadow: colors.shadowOverlay } }}
                >
                  {userActions.map(({ label, path, icon: Icon }) => (
                    <MenuItem key={path} onClick={() => handleNavigate(path)} sx={{ gap: 1.2, py: 1.1 }}>
                      <Icon sx={{ color: colors.blue, fontSize: '1.25rem' }} />
                      <Typography sx={{ fontSize: '.92rem', fontWeight: 650 }}>{label}</Typography>
                    </MenuItem>
                  ))}
                  <Divider />
                  <MenuItem onClick={logout} sx={{ gap: 1.2, py: 1.1 }}>
                    <LogoutIcon sx={{ color: colors.red, fontSize: '1.25rem' }} />
                    <Typography sx={{ fontSize: '.92rem', fontWeight: 650 }}>Cerrar sesión</Typography>
                  </MenuItem>
                </DropdownMenu>
              </>
            ) : (
              <IconButton onClick={() => setMobileOpen(true)} sx={{ display: { xs: 'inline-flex', sm: 'none' }, color: colors.text }}>
                <PersonIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </Container>

      <Drawer
        open={mobileOpen}
        onClose={closeMenus}
        ModalProps={{ keepMounted: true }}
        PaperProps={{ sx: { borderTopRightRadius: 24, borderBottomRightRadius: 24, border: 0 } }}
      >
        {mobileDrawer}
      </Drawer>
    </AppBar>
  )
}

export default MenuDB
