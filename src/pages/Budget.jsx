import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  CircularProgress,
  Snackbar,
  Alert,
  useTheme,
  Chip,
  Avatar,
  Tooltip,
  Badge,
  Divider,
  useMediaQuery
} from '@mui/material';
import { 
  Add, 
  Edit, 
  Delete, 
  AttachMoney, 
  Category, 
  CalendarToday,
  CheckCircle,
  Warning,
  TrendingUp,
  TrendingDown
} from '@mui/icons-material';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useAuth } from '../context/AuthContext';
import budgetService from '../services/budget.service';

const categories = [
  'Food', 'Transportation', 'Housing', 'Entertainment',
  'Utilities', 'Healthcare', 'Education', 'Shopping', 'Other'
];

const periods = ['weekly', 'monthly', 'yearly'];

// Category icons mapping
const categoryIcons = {
  'Food': '🍔',
  'Transportation': '🚗',
  'Housing': '🏠',
  'Entertainment': '🎬',
  'Utilities': '💡',
  'Healthcare': '🏥',
  'Education': '📚',
  'Shopping': '🛍️',
  'Other': '📊'
};

const budgetSchema = yup.object().shape({
  category: yup.string().required('Required'),
  amount: yup.number().positive('Amount must be positive').required('Required'),
  period: yup.string().required('Required'),
});

const Budget = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentBudget, setCurrentBudget] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await budgetService.getBudgets();
        setBudgets(response.data);
      } catch (err) {
        showSnackbar('Failed to fetch budgets', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchBudgets();
  }, []);

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleOpenDialog = (budget = null) => {
    setCurrentBudget(budget);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentBudget(null);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (currentBudget) {
        await budgetService.updateBudget(currentBudget._id, values);
        setBudgets(budgets.map(b => b._id === currentBudget._id ? { ...b, ...values } : b));
        showSnackbar('Budget updated successfully');
      } else {
        const response = await budgetService.createBudget(values);
        setBudgets([...budgets, response.data]);
        showSnackbar('Budget added successfully');
      }
      handleCloseDialog();
    } catch (err) {
      showSnackbar(err.response?.data?.message || 'Operation failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await budgetService.deleteBudget(id);
      setBudgets(budgets.filter(b => b._id !== id));
      showSnackbar('Budget deleted successfully');
    } catch (err) {
      showSnackbar(err.response?.data?.message || 'Delete failed', 'error');
    }
  };

  // Calculate total budget amount
  const totalBudget = budgets.reduce((sum, budget) => sum + budget.amount, 0);

  return (
    <Box sx={{ 
      p: isMobile ? 2 : 4, 
      bgcolor: theme.palette.background.default, 
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.grey[900]} 100%)`
    }}>
      {/* Header Section */}
      <Box 
        sx={{ 
          mb: 4,
          p: 3,
          borderRadius: 2,
          background: `linear-gradient(to right, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
          boxShadow: theme.shadows[4],
          color: '#fff'
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Budget Management
            </Typography>
            <Typography variant="subtitle1">
              Manage your financial plans and track spending limits
            </Typography>
          </Box>
          <Badge 
            badgeContent={budgets.length} 
            color="secondary" 
            overlap="circular"
            sx={{ 
              '& .MuiBadge-badge': {
                right: -10,
                top: 15,
                fontSize: '1rem',
                padding: '0 8px',
                height: 28,
                minWidth: 28,
                borderRadius: 14
              }
            }}
          >
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => handleOpenDialog()}
              sx={{ 
                bgcolor: '#fff', 
                color: theme.palette.primary.dark,
                '&:hover': { 
                  bgcolor: theme.palette.grey[200],
                  transform: 'translateY(-2px)',
                  boxShadow: theme.shadows[6]
                },
                transition: 'all 0.3s ease',
                height: 48,
                px: 3,
                borderRadius: 2
              }}
            >
              Add Budget
            </Button>
          </Badge>
        </Box>

        {/* Summary Cards */}
        <Box display="flex" flexWrap="wrap" gap={2} mt={3}>
          <Chip 
            icon={<AttachMoney />}
            label={`Total Budget: $${totalBudget.toFixed(2)}`}
            sx={{ 
              bgcolor: theme.palette.success.dark,
              color: '#fff',
              fontSize: '1rem',
              p: 2,
              '& .MuiChip-icon': { color: '#fff' }
            }}
          />
          <Chip 
            icon={<Category />}
            label={`${budgets.length} Categories`}
            sx={{ 
              bgcolor: theme.palette.info.dark,
              color: '#fff',
              fontSize: '1rem',
              p: 2,
              '& .MuiChip-icon': { color: '#fff' }
            }}
          />
          <Chip 
            icon={<CalendarToday />}
            label={`${budgets.filter(b => b.period === 'monthly').length} Monthly`}
            sx={{ 
              bgcolor: theme.palette.warning.dark,
              color: '#fff',
              fontSize: '1rem',
              p: 2,
              '& .MuiChip-icon': { color: '#fff' }
            }}
          />
        </Box>
      </Box>

      {/* Main Content */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress size={60} thickness={4} sx={{ color: theme.palette.primary.light }} />
        </Box>
      ) : (
        <TableContainer 
          component={Paper} 
          elevation={4}
          sx={{ 
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
            overflow: 'hidden'
          }}
        >
          <Table>
            <TableHead sx={{ 
              bgcolor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.primary.main
            }}>
              <TableRow>
                <TableCell sx={{ color: '#fff', fontSize: '1rem', fontWeight: 'bold' }}>
                  Category
                </TableCell>
                <TableCell align="right" sx={{ color: '#fff', fontSize: '1rem', fontWeight: 'bold' }}>
                  Amount
                </TableCell>
                <TableCell sx={{ color: '#fff', fontSize: '1rem', fontWeight: 'bold' }}>
                  Period
                </TableCell>
                <TableCell sx={{ color: '#fff', fontSize: '1rem', fontWeight: 'bold' }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {budgets.length > 0 ? (
                budgets.map((budget) => (
                  <TableRow 
                    key={budget._id} 
                    hover 
                    sx={{ 
                      '&:nth-of-type(odd)': { 
                        bgcolor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50] 
                      },
                      '&:hover': {
                        bgcolor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[100]
                      }
                    }}
                  >
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Avatar sx={{ 
                          bgcolor: theme.palette.primary.light, 
                          mr: 2,
                          width: 32,
                          height: 32,
                          fontSize: '1rem'
                        }}>
                          {categoryIcons[budget.category] || '💰'}
                        </Avatar>
                        <Typography fontWeight="medium">
                          {budget.category}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Typography fontWeight="bold" color={theme.palette.primary.main}>
                        ${budget.amount.toFixed(2)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={budget.period} 
                        size="small"
                        icon={budget.period === 'monthly' ? <TrendingUp /> : <TrendingDown />}
                        sx={{ 
                          bgcolor: budget.period === 'monthly' 
                            ? theme.palette.success.light 
                            : theme.palette.warning.light,
                          color: theme.palette.getContrastText(
                            budget.period === 'monthly' 
                              ? theme.palette.success.light 
                              : theme.palette.warning.light
                          )
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box display="flex" gap={1}>
                        <Tooltip title="Edit">
                          <IconButton 
                            onClick={() => handleOpenDialog(budget)}
                            sx={{ 
                              bgcolor: theme.palette.info.light,
                              '&:hover': { bgcolor: theme.palette.info.main }
                            }}
                          >
                            <Edit fontSize="small" sx={{ color: '#fff' }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton 
                            onClick={() => handleDelete(budget._id)}
                            sx={{ 
                              bgcolor: theme.palette.error.light,
                              '&:hover': { bgcolor: theme.palette.error.main }
                            }}
                          >
                            <Delete fontSize="small" sx={{ color: '#fff' }} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                    <Box textAlign="center">
                      <AttachMoney sx={{ fontSize: 60, color: theme.palette.grey[400], mb: 2 }} />
                      <Typography variant="h6" color="textSecondary">
                        No budgets found
                      </Typography>
                      <Button
                        variant="outlined"
                        startIcon={<Add />}
                        onClick={() => handleOpenDialog()}
                        sx={{ mt: 2 }}
                      >
                        Create Your First Budget
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Budget Form Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        fullWidth 
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[100]} 100%)`,
            boxShadow: theme.shadows[10]
          }
        }}
      >
        <DialogTitle sx={{ 
          bgcolor: theme.palette.primary.main, 
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          py: 2
        }}>
          {currentBudget ? (
            <>
              <Edit fontSize="large" />
              <span>Edit Budget</span>
            </>
          ) : (
            <>
              <Add fontSize="large" />
              <span>Add New Budget</span>
            </>
          )}
        </DialogTitle>
        <Formik
          initialValues={{
            category: currentBudget?.category || '',
            amount: currentBudget?.amount || '',
            period: currentBudget?.period || 'monthly',
          }}
          validationSchema={budgetSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <DialogContent sx={{ py: 3 }}>
                <TextField
                  fullWidth
                  select
                  margin="normal"
                  label="Category"
                  name="category"
                  value={values.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.category && Boolean(errors.category)}
                  helperText={touched.category && errors.category}
                  variant="outlined"
                  sx={{ mb: 3 }}
                  InputProps={{
                    startAdornment: (
                      <Box sx={{ mr: 1 }}>
                        {values.category ? (
                          <Avatar sx={{ 
                            bgcolor: theme.palette.primary.light, 
                            width: 24, 
                            height: 24,
                            fontSize: '0.8rem'
                          }}>
                            {categoryIcons[values.category] || '💰'}
                          </Avatar>
                        ) : (
                          <Category color="action" />
                        )}
                      </Box>
                    )
                  }}
                >
                  {categories.map((category) => (
                    <MenuItem
                      key={category}
                      value={category}
                      disabled={budgets.some(b => b.category === category && (!currentBudget || currentBudget.category !== category))}
                      sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                    >
                      <Avatar sx={{ 
                        bgcolor: theme.palette.primary.light, 
                        width: 24, 
                        height: 24,
                        fontSize: '0.8rem'
                      }}>
                        {categoryIcons[category] || '💰'}
                      </Avatar>
                      {category}
                      {budgets.some(b => b.category === category && (!currentBudget || currentBudget.category !== category)) && (
                        <Chip 
                          label="Already exists" 
                          size="small" 
                          sx={{ ml: 'auto' }} 
                          color="error"
                        />
                      )}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  fullWidth
                  margin="normal"
                  label="Amount"
                  name="amount"
                  type="number"
                  value={values.amount}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.amount && Boolean(errors.amount)}
                  helperText={touched.amount && errors.amount}
                  variant="outlined"
                  sx={{ mb: 3 }}
                  InputProps={{
                    startAdornment: (
                      <AttachMoney color="action" sx={{ mr: 1 }} />
                    )
                  }}
                />

                <TextField
                  fullWidth
                  select
                  margin="normal"
                  label="Period"
                  name="period"
                  value={values.period}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.period && Boolean(errors.period)}
                  helperText={touched.period && errors.period}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <CalendarToday color="action" sx={{ mr: 1 }} />
                    )
                  }}
                >
                  {periods.map((period) => (
                    <MenuItem 
                      key={period} 
                      value={period}
                      sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                    >
                      {period === 'monthly' ? (
                        <TrendingUp color="success" />
                      ) : period === 'yearly' ? (
                        <CheckCircle color="info" />
                      ) : (
                        <Warning color="warning" />
                      )}
                      {period}
                    </MenuItem>
                  ))}
                </TextField>
              </DialogContent>
              <Divider />
              <DialogActions sx={{ p: 2 }}>
                <Button 
                  onClick={handleCloseDialog}
                  variant="outlined"
                  sx={{ 
                    borderRadius: 2,
                    px: 3,
                    borderWidth: 2,
                    '&:hover': { borderWidth: 2 }
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting} 
                  variant="contained"
                  sx={{ 
                    borderRadius: 2,
                    px: 3,
                    bgcolor: theme.palette.success.main,
                    '&:hover': { bgcolor: theme.palette.success.dark }
                  }}
                >
                  {isSubmitting ? (
                    <CircularProgress size={24} sx={{ color: '#fff' }} />
                  ) : currentBudget ? (
                    'Update Budget'
                  ) : (
                    'Create Budget'
                  )}
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          variant="filled"
          sx={{ 
            width: '100%',
            alignItems: 'center',
            '& .MuiAlert-icon': { alignItems: 'center' }
          }}
          iconMapping={{
            success: <CheckCircle fontSize="large" />,
            error: <Warning fontSize="large" />,
            warning: <Warning fontSize="large" />,
            info: <CheckCircle fontSize="large" />
          }}
        >
          <Typography variant="body1" fontWeight="bold">
            {snackbar.message}
          </Typography>
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Budget;