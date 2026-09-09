import { useState } from 'react'
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Menu as DropdownMenu,
  MenuItem,
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
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import GroupIcon from '@mui/icons-material/Group'
import colors from '../config/config'
import { clearStoredToken, getCurrentUser, isAdmin } from '../utils/auth'

const navigationItems = [
  {
    label: 'Consultar IA',
    desktopLabel: 'Consultar IA',
    path: '/consultIA',
    icon: SearchIcon
  },
  {
    label: 'Mis consultas',
    desktopLabel: 'Consultas realizadas',
    path: '/myconsults',
    icon: QuestionAnswerIcon
  },
  {
    label: 'Realizar test',
    desktopLabel: 'Realizar test',
    path: '/testIA',
    icon: PlaylistAddCheckCircleIcon
  },
  {
    label: 'Mis resultados',
    desktopLabel: 'Mis resultados',
    path: '/myresults',
    icon: TaskAltIcon
  }
]

function MenuDB() {
  const navigate = useNavigate()
  const location = useLocation()
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)
  const currentUser = getCurrentUser()
  const userName = currentUser?.nombre || 'Usuario'
  const userInitial = userName.substring(0, 1).toUpperCase()
  const canManageUsers = isAdmin()

  const closeMenus = () => {
    setAnchorElNav(null)
    setAnchorElUser(null)
  }

  const handleNavigate = (path) => {
    closeMenus()
    navigate(path)
  }

  const logout = () => {
    closeMenus()
    clearStoredToken()
    navigate('/', { replace: true })
  }

  return (
    <AppBar position="static" sx={{ background: colors.backgroundMenu, boxShadow: '0 12px 30px rgba(66, 165, 245, 0.22)' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 70 }, gap: 1 }}>
          <Box
            onClick={() => handleNavigate('/')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.2,
              mr: { xs: 1, md: 4 },
              cursor: 'pointer',
              minWidth: { xs: 'auto', md: 210 }
            }}
          >
            <StorageIcon sx={{ fontSize: { xs: '1.35rem', md: '1.55rem' } }} />
            <Typography
              variant="h5"
              noWrap
              sx={{
                fontWeight: 800,
                fontSize: { xs: '1.05rem', md: '1.25rem' },
                fontFamily: 'monospace',
                letterSpacing: { xs: '.14rem', md: '.26rem' },
                color: 'inherit'
              }}
            >
              DBLEARNING
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="Abrir navegación principal"
              aria-controls="main-navigation-menu"
              aria-haspopup="true"
              onClick={(event) => setAnchorElNav(event.currentTarget)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <DropdownMenu
              id="main-navigation-menu"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={closeMenus}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {navigationItems.map(({ label, path, icon: Icon }) => (
                <MenuItem key={path} selected={location.pathname === path} onClick={() => handleNavigate(path)}>
                  <Icon color="primary" sx={{ mr: 1, fontSize: '1.35rem' }} />
                  <Typography textAlign="center" sx={{ fontSize: '.95rem' }}>{label}</Typography>
                </MenuItem>
              ))}
            </DropdownMenu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, alignItems: 'stretch' }}>
            {navigationItems.map(({ desktopLabel, path, icon: Icon }) => {
              const isActive = location.pathname === path

              return (
                <Button
                  key={path}
                  onClick={() => handleNavigate(path)}
                  startIcon={<Icon />}
                  sx={{
                    color: 'white',
                    px: 1.8,
                    borderRadius: 0,
                    borderBottom: isActive ? '3px solid white' : '3px solid transparent',
                    textTransform: 'none',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.12)',
                      borderBottom: '3px solid white'
                    }
                  }}
                >
                  <Typography sx={{ fontWeight: 600, fontSize: '.95rem' }}>{desktopLabel}</Typography>
                </Button>
              )
            })}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Abrir ajustes">
              <IconButton
                onClick={(event) => setAnchorElUser(event.currentTarget)}
                sx={{
                  p: 0.7,
                  borderRadius: 3,
                  color: 'white',
                  bgcolor: 'rgba(255, 255, 255, 0.12)',
                  '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' }
                }}
              >
                <Typography sx={{ display: { xs: 'none', sm: 'block' }, mr: 1, fontSize: '.85rem', color: 'white', fontWeight: 600 }}>
                  {userName}
                </Typography>
                <Avatar sx={{ width: 30, height: 30, bgcolor: 'white', color: colors.blue, fontWeight: 800, fontSize: '.9rem' }}>
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
            >
              <MenuItem onClick={() => handleNavigate('/myprofile')}>
                <ManageAccountsOutlinedIcon color="primary" sx={{ mr: 1, fontSize: '1.35rem' }} />
                <Typography textAlign="center" sx={{ fontSize: '.95rem' }}>Mi perfil</Typography>
              </MenuItem>
              {canManageUsers && (
                <MenuItem onClick={() => handleNavigate('/usersmanagement')}>
                  <GroupIcon color="primary" sx={{ mr: 1, fontSize: '1.35rem' }} />
                  <Typography textAlign="center" sx={{ fontSize: '.95rem' }}>Gestión de usuarios</Typography>
                </MenuItem>
              )}
              <Divider />
              <MenuItem onClick={logout}>
                <LogoutIcon sx={{ color: 'IndianRed', mr: 1, fontSize: '1.35rem' }} />
                <Typography textAlign="center" sx={{ fontSize: '.95rem' }}>Cerrar sesión</Typography>
              </MenuItem>
            </DropdownMenu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default MenuDB
