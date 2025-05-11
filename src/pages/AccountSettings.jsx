import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Card,
  CardContent,
  Divider,
  useTheme,
  Grid,
  Snackbar,
  Alert,
  CircularProgress,
  Stack
} from '@mui/material';
import { Settings as SettingsIcon } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const AccountSettings = () => {
  const theme = useTheme();
  const { user, logout } = useAuth();
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState({
    profile: false,
    password: false,
    avatar: false
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      });
      if (user.avatar) {
        setPreviewImage(user.avatar);
      }
    }
  }, [user]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm({
      ...profileForm,
      [name]: value,
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm({
      ...passwordForm,
      [name]: value,
    });

    // Simple password validation
    if (name === 'newPassword') {
      if (value.length > 0 && value.length < 7) {
        setPasswordError('Password must be at least 7 characters');
      } else {
        setPasswordError('');
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setSnackbar({
          open: true,
          message: 'File size should be less than 2MB',
          severity: 'error',
        });
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading({...loading, profile: true});
    try {
      const response = await api.put('/users/me', profileForm);
      setSnackbar({
        open: true,
        message: 'Profile updated successfully!',
        severity: 'success',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Failed to update profile',
        severity: 'error',
      });
    } finally {
      setLoading({...loading, profile: false});
    }
  };

  const handleAvatarSubmit = async () => {
    if (!selectedFile) {
      setSnackbar({
        open: true,
        message: 'Please select an image first',
        severity: 'warning',
      });
      return;
    }
    
    setLoading({...loading, avatar: true});
    try {
      const formData = new FormData();
      formData.append('avatar', selectedFile);
      const uploadResponse = await api.post('/users/me/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setPreviewImage(uploadResponse.data.avatarUrl);
      setSnackbar({
        open: true,
        message: 'Profile picture updated successfully!',
        severity: 'success',
      });
      setSelectedFile(null);
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Failed to upload avatar',
        severity: 'error',
      });
    } finally {
      setLoading({...loading, avatar: false});
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setSnackbar({
        open: true,
        message: 'Passwords do not match',
        severity: 'error',
      });
      return;
    }
    
    if (passwordForm.newPassword.length < 7) {
      setSnackbar({
        open: true,
        message: 'Password must be at least 7 characters',
        severity: 'error',
      });
      return;
    }
    
    setLoading({...loading, password: true});
    try {
      await api.put('/users/me/password', {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      
      setSnackbar({
        open: true,
        message: 'Password updated successfully!',
        severity: 'success',
      });
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Failed to update password',
        severity: 'error',
      });
    } finally {
      setLoading({...loading, password: false});
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Enhanced color grading for both themes
  const cardStyles = {
    background: theme.palette.mode === 'dark' 
      ? 'linear-gradient(145deg, #1a1a1a, #2a2a2a)' 
      : 'linear-gradient(145deg, #ffffff, #f5f5f5)',
    boxShadow: theme.shadows[4],
    borderRadius: '12px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: theme.shadows[6],
    }
  };

  const avatarStyles = {
    width: 120, 
    height: 120, 
    mb: 2,
    background: theme.palette.mode === 'dark'
      ? 'linear-gradient(45deg, #ff6b6b, #ffa3a3)'
      : 'linear-gradient(45deg, #1976d2, #64b5f6)',
    color: theme.palette.common.white,
    fontSize: '3rem',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)'
    }
  };

  const buttonStyles = {
    background: theme.palette.mode === 'dark'
      ? 'linear-gradient(45deg, #ff6b6b, #ff8e53)'
      : 'linear-gradient(45deg, #1976d2, #2196f3)',
    color: theme.palette.common.white,
    fontWeight: 'bold',
    '&:hover': {
      opacity: 0.9,
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          color="textPrimary"
          sx={{
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(45deg, #ff6b6b, #ff8e53)'
              : 'linear-gradient(45deg, #1976d2, #2196f3)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}
        >
          Account Settings
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Manage your account information and preferences
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Avatar Upload Section */}
        <Grid item xs={12} md={4}>
          <Card sx={cardStyles}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h6" gutterBottom color="textPrimary">
                Profile Picture
              </Typography>
              <Divider sx={{ mb: 3, width: '60rem', bgcolor: theme.palette.divider }} />
              
              <Avatar 
                src={previewImage}
                sx={avatarStyles}
              >
                {!previewImage && <SettingsIcon sx={{ fontSize: 'inherit' }} />}
              </Avatar>
              
              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Button 
                  variant="contained" 
                  component="label"
                  disabled={loading.avatar}
                  sx={buttonStyles}
                >
                  Choose Image
                  <input 
                    type="file" 
                    hidden 
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Button>
                
                <Button 
                  variant="contained" 
                  color="secondary"
                  onClick={handleAvatarSubmit}
                  disabled={loading.avatar || !selectedFile}
                  sx={{
                    ...buttonStyles,
                    background: theme.palette.mode === 'dark'
                      ? 'linear-gradient(45deg, #4a00e0, #8e2de2)'
                      : 'linear-gradient(45deg, #9c27b0, #e91e63)',
                  }}
                >
                  {loading.avatar ? <CircularProgress size={24} color="inherit" /> : 'Upload'}
                </Button>
              </Stack>
              
              <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }} align="center">
                JPG, GIF or PNG. Max size 2MB
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Profile Information Section */}
        <Grid item xs={12} md={8}>
          <Card sx={{ ...cardStyles, mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="textPrimary">
                Personal Information
              </Typography>
              <Divider sx={{ width:'60rem', mb: 3, bgcolor: theme.palette.divider }} />
              
              <form onSubmit={handleProfileSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="name"
                      label="Full Name"
                      value={profileForm.name}
                      onChange={handleProfileChange}
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="email"
                      label="Email"
                      type="email"
                      value={profileForm.email}
                      onChange={handleProfileChange}
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="phone"
                      label="Phone Number"
                      value={profileForm.phone}
                      onChange={handleProfileChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <Button 
                      type="submit" 
                      variant="contained"
                      disabled={loading.profile}
                      sx={buttonStyles}
                    >
                      {loading.profile ? <CircularProgress size={24} color="inherit" /> : 'Update Profile'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>

          {/* Password Change Section */}
          <Card sx={cardStyles}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="textPrimary">
                Change Password
              </Typography>
              <Divider sx={{ mb: 3, bgcolor: theme.palette.divider }} />
              
              <form onSubmit={handlePasswordSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name="currentPassword"
                      label="Current Password"
                      type="password"
                      value={passwordForm.currentPassword}
                      onChange={handlePasswordChange}
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="newPassword"
                      label="New Password"
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={handlePasswordChange}
                      variant="outlined"
                      required
                      error={!!passwordError}
                      helperText={passwordError}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="confirmPassword"
                      label="Confirm New Password"
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={handlePasswordChange}
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <Button 
                      type="submit" 
                      variant="contained"
                      disabled={loading.password}
                      sx={{
                        ...buttonStyles,
                        background: theme.palette.mode === 'dark'
                          ? 'linear-gradient(45deg, #4a00e0, #8e2de2)'
                          : 'linear-gradient(45deg, #9c27b0, #e91e63)',
                      }}
                    >
                      {loading.password ? <CircularProgress size={24} color="inherit" /> : 'Change Password'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity}
          sx={{ 
            width: '100%',
            background: theme.palette.mode === 'dark' ? theme.palette.grey[800] : undefined,
          }}
          elevation={6}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AccountSettings;