import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Toolbar,
  Box,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Receipt as ExpenseIcon,
  AccountBalanceWallet as BudgetIcon,
  BarChart as ReportIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Sidebar = ({ mobileOpen, handleDrawerToggle, drawerWidth, collapsed, toggleCollapse }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = () => {
    if (isMobile) {
      handleDrawerToggle();
    }
  };

  const drawerContent = (
    <Box sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: theme.palette.background.paper,
      borderRight: `1px solid ${theme.palette.divider}`
    }}>
      {/* Navigation Items */}
      <List sx={{ flex: 1, p: collapsed ? 1 : 2 }}>
        {[
          { icon: <DashboardIcon />, text: 'Dashboard', path: '/' },
          { icon: <ExpenseIcon />, text: 'Expenses', path: '/expenses' },
          { icon: <BudgetIcon />, text: 'Budget', path: '/budget' },
          { icon: <ReportIcon />, text: 'Reports', path: '/reports' },
          { icon: <SettingsIcon />, text: 'Settings', path: '/account-settings' },
        ].map((item) => (
          <ListItem 
            key={item.text}
            button 
            component={Link} 
            to={item.path}
            onClick={handleClose}
            sx={{
              borderRadius: 2,
              mb: 1,
              color: theme.palette.text.primary,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
              '&.Mui-selected': {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                '& .MuiListItemIcon-root': {
                  color: 'inherit',
                },
              },
              '&.Mui-selected:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
              justifyContent: collapsed ? 'center' : 'flex-start',
              px: collapsed ? 1 : 2,
              minHeight: 48,
            }}
          >
            <ListItemIcon sx={{ 
              minWidth: 'auto',
              mr: collapsed ? 0 : 2,
              color: 'inherit'
            }}>
              {item.icon}
            </ListItemIcon>
            {!collapsed && <ListItemText primary={item.text} />}
          </ListItem>
        ))}
      </List>

      {/* Bottom Section */}
      <Box sx={{ p: collapsed ? 1 : 2 }}>
        <Divider sx={{ mb: 1 }} />
        <ListItem 
          button 
          component={Link} 
          to="/login"
          onClick={handleClose}
          sx={{
            borderRadius: 2,
            color: theme.palette.text.primary,
            '&:hover': {
              backgroundColor: theme.palette.error.light,
              color: theme.palette.error.contrastText,
            },
            justifyContent: collapsed ? 'center' : 'flex-start',
            px: collapsed ? 1 : 2,
            minHeight: 48,
          }}
        >
          <ListItemIcon sx={{ 
            minWidth: 'auto',
            mr: collapsed ? 0 : 2,
            color: 'inherit'
          }}>
            <LogoutIcon />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Logout" />}
        </ListItem>
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ 
        width: { sm: collapsed ? 72 : drawerWidth },
        flexShrink: { sm: 0 },
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      }}
      aria-label="navigation"
    >
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: collapsed ? 72 : drawerWidth,
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
          },
        }}
        open
      >
        <Toolbar sx={{ 
          display: 'flex',
          justifyContent: 'flex-end',
          minHeight: '64px !important',
          px: 1,
        }}>
          <IconButton 
            onClick={toggleCollapse}
            sx={{
              color: theme.palette.text.secondary,
              '&:hover': {
                color: theme.palette.text.primary,
                backgroundColor: 'transparent',
              }
            }}
          >
            {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </Toolbar>
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;