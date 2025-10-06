import React, { useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Tooltip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  TrafficRounded as TrafficIcon,
  Analytics as AnalyticsIcon,
  LocationOn as LocationIcon,
  Settings as SettingsIcon,
  NotificationsActive as NotificationIcon,
  AccountCircle as AccountIcon,
  Logout as LogoutIcon,
  Support as SupportIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const drawerWidth = 280;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Traffic Control', icon: <TrafficIcon />, path: '/traffic' },
  { text: 'Analytics', icon: <AnalyticsIcon />, path: '/analytics' },
  { text: 'Locations', icon: <LocationIcon />, path: '/locations' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  { text: 'Support', icon: <SupportIcon />, path: '/support' },
];

export default function AppLayout({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    handleProfileMenuClose();
  };

  const drawer = (
    <div>
      <Toolbar
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          minHeight: '80px !important',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <TrafficIcon sx={{ fontSize: 32, mr: 2 }} />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1 }}>
              Smart Traffic
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              Management System
            </Typography>
          </Box>
        </Box>
      </Toolbar>
      
      <Divider />
      
      <List sx={{ px: 2, py: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
              sx={{
                borderRadius: 2,
                '&.Mui-selected': {
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                  },
                },
                '&:hover': {
                  backgroundColor: 'rgba(102, 126, 234, 0.08)',
                },
                py: 1.5,
              }}
            >
              <ListItemIcon
                sx={{
                  color: location.pathname === item.path ? 'white' : 'inherit',
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: location.pathname === item.path ? 600 : 500,
                  fontSize: '0.95rem',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          color: theme.palette.text.primary,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Traffic Control Center
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title="Notifications">
              <IconButton color="inherit">
                <Badge badgeContent={3} color="error">
                  <NotificationIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title="Toggle Theme">
              <IconButton color="inherit">
                {theme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Tooltip>

            <Tooltip title="Account">
              <IconButton
                color="inherit"
                onClick={handleProfileMenuOpen}
                sx={{ ml: 1 }}
              >
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    fontSize: '1rem',
                    fontWeight: 600,
                  }}
                >
                  {user?.name?.charAt(0) || 'U'}
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        onClick={handleProfileMenuClose}
        PaperProps={{
          elevation: 8,
          sx: {
            mt: 1.5,
            minWidth: 200,
            borderRadius: 2,
            '& .MuiMenuItem-root': {
              px: 2,
              py: 1,
              borderRadius: 1,
              mx: 1,
              my: 0.5,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => navigate('/profile')}>
          <ListItemIcon>
            <AccountIcon fontSize="small" />
          </ListItemIcon>
          Profile Settings
        </MenuItem>
        <Divider sx={{ mx: 1 }} />
        <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" sx={{ color: 'error.main' }} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: 'none',
              boxShadow: '0 0 50px rgba(0, 0, 0, 0.1)',
            },
          }}
        >
          {drawer}
        </Drawer>
        
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: 'none',
              boxShadow: '0 0 50px rgba(0, 0, 0, 0.1)',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
            : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}