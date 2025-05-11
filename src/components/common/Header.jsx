import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Avatar, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MoneyIcon from '@mui/icons-material/Money';
import { useAuth } from '../../context/AuthContext';
import { styled } from '@mui/material/styles';

const Logo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  fontWeight: 'bold',
  fontSize: '1.2rem',
}));

const Header = ({ mobileOpen, handleDrawerToggle, drawerWidth, toggleDarkMode, darkMode, collapsed }) => {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${collapsed ? 72 : drawerWidth}px)` },
        ml: { sm: `${collapsed ? 72 : drawerWidth}px` },
        transition: (theme) => theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
        
        <Logo>
          <MoneyIcon sx={{ fontSize: '2rem' }} />
          <Typography variant="h6" noWrap component="div">
            FinTrack Pro
          </Typography>
        </Logo>
        
        <Box sx={{ flexGrow: 1 }} />
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={toggleDarkMode} color="inherit">
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          
          {user && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body1" sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }}>
                {user.name}
              </Typography>
              <IconButton onClick={handleMenuOpen}>
                <Avatar
                  alt={user.name}
                  src={user.avatar ? user.avatar : undefined}
                  sx={{ bgcolor: user.avatar ? 'transparent' : 'secondary.main' }}
                >
                  {!user.avatar && user.name.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;