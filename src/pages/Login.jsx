import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, TextField, Button, Link, Alert, Grid } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import BankSVG from './BankSVG';

const loginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Required'),
  password: yup.string().required('Required'),
});

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      await login(values);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at center, #1A1A1A 0%, #000000 100%)',
      display: 'flex',
      alignItems: 'center',
      py: 4,
      position: 'relative',
      overflow: 'hidden',
      '&:before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(255,215,0,0.05) 0%, rgba(255,215,0,0) 100%)',
        zIndex: 0
      }
    }}>
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container
          spacing={6}
          alignItems="center"
          justifyContent="center"
          sx={{
            flexDirection: { xs: 'column-reverse', md: 'row' },
            flexWrap: 'nowrap',
          }}>
          
          {/* Login Form Column */}
          <Grid item xs={12} md={5}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Box sx={{
                p: { xs: 4, md: 6 },
                borderRadius: 4,
                background: 'rgba(10, 10, 10, 0.8)',
                boxShadow: '0 8px 32px 0 rgba(255,215,0,0.15)',
                border: '1px solid rgba(255, 215, 0, 0.2)',
                backdropFilter: 'blur(12px)',
                position: 'relative',
                overflow: 'hidden',
                '&:before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: 'linear-gradient(90deg, #FFD700, #FFA500, #FFD700)',
                },
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: 'linear-gradient(90deg, #FFD700, #FFA500, #FFD700)',
                }
              }}>
                <Typography variant="h4" gutterBottom sx={{ 
                  color: '#FFD700', 
                  fontWeight: 700,
                  mb: 4,
                  textAlign: 'center',
                  textShadow: '0 0 8px rgba(255,215,0,0.3)'
                }}>
                  Welcome to FIN Track!
                </Typography>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Alert severity="error" sx={{ 
                      width: '100%', 
                      mb: 3,
                      background: 'rgba(120, 0, 0, 0.3)',
                      border: '1px solid rgba(255, 100, 100, 0.3)',
                      color: '#FFAAAA'
                    }}>
                      {error}
                    </Alert>
                  </motion.div>
                )}
                <Formik
                  initialValues={{ email: '', password: '' }}
                  validationSchema={loginSchema}
                  onSubmit={handleFormSubmit}
                >
                  {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                      <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                        sx={{
                          '& label': { color: '#FFD700' },
                          '& label.Mui-focused': { color: '#FFA500' },
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': { 
                              borderColor: 'rgba(255, 215, 0, 0.3)',
                              borderWidth: '2px'
                            },
                            '&:hover fieldset': { 
                              borderColor: 'rgba(255, 215, 0, 0.7)',
                              boxShadow: '0 0 8px rgba(255,215,0,0.2)'
                            },
                            '&.Mui-focused fieldset': { 
                              borderColor: '#FFA500',
                              boxShadow: '0 0 12px rgba(255,165,0,0.3)'
                            },
                            color: 'white',
                            background: 'rgba(20, 20, 20, 0.5)',
                            borderRadius: '8px'
                          },
                          '& .MuiInputBase-input': {
                            color: 'white',
                            padding: '14px'
                          },
                          '& .MuiFormHelperText-root': {
                            color: '#FFAAAA'
                          }
                        }}
                      />
                      <TextField
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                        sx={{
                          '& label': { color: '#FFD700' },
                          '& label.Mui-focused': { color: '#FFA500' },
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': { 
                              borderColor: 'rgba(255, 215, 0, 0.3)',
                              borderWidth: '2px'
                            },
                            '&:hover fieldset': { 
                              borderColor: 'rgba(255, 215, 0, 0.7)',
                              boxShadow: '0 0 8px rgba(255,215,0,0.2)'
                            },
                            '&.Mui-focused fieldset': { 
                              borderColor: '#FFA500',
                              boxShadow: '0 0 12px rgba(255,165,0,0.3)'
                            },
                            color: 'white',
                            background: 'rgba(20, 20, 20, 0.5)',
                            borderRadius: '8px'
                          },
                          '& .MuiInputBase-input': {
                            color: 'white',
                            padding: '14px'
                          },
                          '& .MuiFormHelperText-root': {
                            color: '#FFAAAA'
                          }
                        }}
                      />
                      <motion.div 
                        whileHover={{ scale: 1.02 }} 
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                      >
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ 
                            mt: 3, 
                            mb: 2,
                            py: 1.5,
                            background: 'linear-gradient(90deg, #FFD700, #FFA500)',
                            color: '#111',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            borderRadius: '8px',
                            textTransform: 'none',
                            letterSpacing: '1px',
                            boxShadow: '0 4px 15px rgba(255,215,0,0.3)',
                            '&:hover': {
                              background: 'linear-gradient(90deg, #FFA500, #FFD700)',
                              boxShadow: '0 6px 20px rgba(255,215,0,0.5)'
                            },
                            '&.Mui-disabled': {
                              background: 'rgba(255,215,0,0.3)',
                              color: 'rgba(0,0,0,0.5)'
                            }
                          }}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Signing In...' : 'Sign In'}
                        </Button>
                      </motion.div>
                      <Box sx={{ textAlign: 'center', mt: 2 }}>
                        <Link 
                          href="/register" 
                          variant="body2" 
                          sx={{ 
                            color: 'rgba(255, 215, 0, 0.7)', 
                            '&:hover': { 
                              color: '#FFD700',
                              textDecoration: 'none'
                            },
                            transition: 'color 0.3s ease',
                            position: 'relative',
                            '&:after': {
                              content: '""',
                              position: 'absolute',
                              width: '0',
                              height: '2px',
                              bottom: '-2px',
                              left: '0',
                              backgroundColor: '#FFD700',
                              transition: 'width 0.3s ease'
                            },
                            '&:hover:after': {
                              width: '100%'
                            }
                          }}
                        >
                          Don't have an account? Sign Up
                        </Link>
                      </Box>
                    </Box>
                  )}
                </Formik>
              </Box>
            </motion.div>
          </Grid>

          {/* Bank SVG Column */}
          <Grid item xs={12} md={7} sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
          }}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ 
                width: '100%', 
                maxWidth: '700px',
                position: 'relative',
                zIndex: 1
              }}
            >
              <BankSVG />
            </motion.div>
            <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80%',
              height: '80%',
              background: 'radial-gradient(circle, rgba(255,215,0,0.2) 0%, rgba(255,215,0,0) 70%)',
              borderRadius: '50%',
              filter: 'blur(20px)',
              zIndex: 0
            }} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Login;