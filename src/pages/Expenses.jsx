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
  Tabs,
  Tab,
  Card,
  CardContent,
  Grid,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  Add, 
  Edit, 
  Delete, 
  BarChart, 
  PieChart, 
  ShowChart,
  CalendarToday,
  DateRange
} from '@mui/icons-material';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import expenseService from '../services/expense.service';
import { format, subDays, subWeeks, subMonths, subYears, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const categories = [
  'Food',
  'Transportation',
  'Housing',
  'Entertainment',
  'Utilities',
  'Healthcare',
  'Education',
  'Shopping',
  'Other'
];

const timePeriods = [
  { value: 'daily', label: 'Daily', icon: <CalendarToday /> },
  { value: 'weekly', label: 'Weekly', icon: <DateRange /> },
  { value: 'monthly', label: 'Monthly', icon: <DateRange /> },
  { value: 'yearly', label: 'Yearly', icon: <DateRange /> }
];

const expenseSchema = yup.object().shape({
  amount: yup.number().positive('Amount must be positive').required('Required'),
  description: yup.string().required('Required'),
  category: yup.string().required('Required'),
  date: yup.date().required('Required'),
});

const Expenses = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentExpense, setCurrentExpense] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [timeView, setTimeView] = useState('monthly');
  const [chartType, setChartType] = useState('bar');

  // Dark mode compatible colors
  const getChartColors = () => {
    return theme.palette.mode === 'dark' ? [
      '#4e79a7', // blue
      '#f28e2b', // orange
      '#e15759', // red
      '#76b7b2', // teal
      '#59a14f', // green
      '#edc948', // yellow
      '#b07aa1', // purple
      '#ff9da7', // pink
      '#9c755f'  // brown
    ] : [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.error.main,
      theme.palette.warning.main,
      theme.palette.info.main,
      theme.palette.success.main,
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
    ];
  };

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await expenseService.getExpenses();
        setExpenses(response.data);
      } catch (err) {
        showSnackbar('Failed to fetch expenses', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleOpenDialog = (expense = null) => {
    setCurrentExpense(expense);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentExpense(null);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (currentExpense) {
        await expenseService.updateExpense(currentExpense._id, values);
        setExpenses(expenses.map(e => e._id === currentExpense._id ? { ...e, ...values } : e));
        showSnackbar('Expense updated successfully');
      } else {
        const response = await expenseService.createExpense(values);
        setExpenses([...expenses, response.data]);
        showSnackbar('Expense added successfully');
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
      await expenseService.deleteExpense(id);
      setExpenses(expenses.filter(e => e._id !== id));
      showSnackbar('Expense deleted successfully');
    } catch (err) {
      showSnackbar(err.response?.data?.message || 'Delete failed', 'error');
    }
  };

  const handleTimeViewChange = (event, newValue) => {
    setTimeView(newValue);
  };

  const handleChartTypeChange = (type) => {
    setChartType(type);
  };

  // Process data for charts based on time view
  const getChartData = () => {
    const now = new Date();
    let dateRange = [];
    let labels = [];
    let data = [];

    switch (timeView) {
      case 'daily':
        dateRange = eachDayOfInterval({
          start: subDays(now, 30),
          end: now
        });
        labels = dateRange.map(date => format(date, 'MMM dd'));
        data = dateRange.map(date => {
          return expenses
            .filter(exp => format(new Date(exp.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'))
            .reduce((sum, exp) => sum + exp.amount, 0);
        });
        break;
      case 'weekly':
        for (let i = 0; i < 12; i++) {
          const start = startOfWeek(subWeeks(now, i));
          const end = endOfWeek(subWeeks(now, i));
          labels.unshift(`Week ${i + 1}`);
          data.unshift(
            expenses
              .filter(exp => {
                const expDate = new Date(exp.date);
                return expDate >= start && expDate <= end;
              })
              .reduce((sum, exp) => sum + exp.amount, 0)
          );
        }
        break;
      case 'monthly':
        for (let i = 0; i < 12; i++) {
          const month = subMonths(now, i);
          labels.unshift(format(month, 'MMM yyyy'));
          data.unshift(
            expenses
              .filter(exp => format(new Date(exp.date), 'yyyy-MM') === format(month, 'yyyy-MM'))
              .reduce((sum, exp) => sum + exp.amount, 0)
          );
        }
        break;
      case 'yearly':
        for (let i = 0; i < 5; i++) {
          const year = subYears(now, i);
          labels.unshift(format(year, 'yyyy'));
          data.unshift(
            expenses
              .filter(exp => format(new Date(exp.date), 'yyyy') === format(year, 'yyyy'))
              .reduce((sum, exp) => sum + exp.amount, 0)
          );
        }
        break;
      default:
        break;
    }

    return {
      labels,
      datasets: [
        {
          label: 'Expenses',
          data,
          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(100, 181, 246, 0.7)' : theme.palette.primary.main,
          borderColor: theme.palette.mode === 'dark' ? 'rgba(100, 181, 246, 1)' : theme.palette.primary.dark,
          borderWidth: 1,
        }
      ]
    };
  };

  // Process data for category breakdown
  const getCategoryData = () => {
    const categoryTotals = {};

    categories.forEach(cat => {
      categoryTotals[cat] = expenses
        .filter(exp => exp.category === cat)
        .reduce((sum, exp) => sum + exp.amount, 0);
    });

    return {
      labels: categories,
      datasets: [
        {
          data: categories.map(cat => categoryTotals[cat]),
          backgroundColor: getChartColors(),
          borderWidth: 1,
          borderColor: theme.palette.mode === 'dark' ? '#424242' : '#fff'
        }
      ]
    };
  };

  const chartData = getChartData();
  const categoryData = getCategoryData();

  return (
    <Box sx={{ p: isMobile ? 1 : 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom color="textPrimary">
          Expense Tracker
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Track and analyze your spending patterns
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Card sx={{ backgroundColor: theme.palette.background.paper }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" color="textPrimary">Expense Overview</Typography>
                <Box>
                  <IconButton 
                    onClick={() => handleChartTypeChange('bar')} 
                    color={chartType === 'bar' ? 'primary' : 'default'}
                  >
                    <BarChart />
                  </IconButton>
                  <IconButton 
                    onClick={() => handleChartTypeChange('pie')} 
                    color={chartType === 'pie' ? 'primary' : 'default'}
                  >
                    <PieChart />
                  </IconButton>
                  <IconButton 
                    onClick={() => handleChartTypeChange('line')} 
                    color={chartType === 'line' ? 'primary' : 'default'}
                  >
                    <ShowChart />
                  </IconButton>
                </Box>
              </Box>
              <Tabs
                value={timeView}
                onChange={handleTimeViewChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{ mb: 2 }}
              >
                {timePeriods.map((period) => (
                  <Tab 
                    key={period.value} 
                    value={period.value} 
                    label={period.label} 
                    icon={period.icon} 
                    iconPosition="start"
                  />
                ))}
              </Tabs>
              <Box sx={{ height: '300px' , width:'28rem' }}>
                {chartType === 'bar' ? (
                  <Bar 
                    data={chartData} 
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'top',
                          labels: {
                            color: theme.palette.text.primary
                          }
                        },
                        title: {
                          display: true,
                          text: `Expenses by ${timeView.charAt(0).toUpperCase() + timeView.slice(1)}`,
                          color: theme.palette.text.primary
                        },
                      },
                      scales: {
                        x: {
                          grid: {
                            color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                          },
                          ticks: {
                            color: theme.palette.text.secondary
                          }
                        },
                        y: {
                          grid: {
                            color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                          },
                          ticks: {
                            color: theme.palette.text.secondary
                          },
                          beginAtZero: true
                        }
                      }
                    }}
                  />
                ) : chartType === 'pie' ? (
                  <Pie 
                    data={chartData} 
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'right',
                          labels: {
                            color: theme.palette.text.primary
                          }
                        },
                        title: {
                          display: true,
                          text: `Expenses by ${timeView.charAt(0).toUpperCase() + timeView.slice(1)}`,
                          color: theme.palette.text.primary
                        },
                      },
                    }}
                  />
                ) : (
                  <Bar 
                    data={chartData} 
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'top',
                          labels: {
                            color: theme.palette.text.primary
                          }
                        },
                        title: {
                          display: true,
                          text: `Expenses by ${timeView.charAt(0).toUpperCase() + timeView.slice(1)}`,
                          color: theme.palette.text.primary
                        },
                      },
                      scales: {
                        x: {
                          grid: {
                            color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                            display: false
                          },
                          ticks: {
                            color: theme.palette.text.secondary
                          }
                        },
                        y: {
                          grid: {
                            color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                          },
                          ticks: {
                            color: theme.palette.text.secondary
                          },
                          beginAtZero: true
                        }
                      }
                    }}
                  />
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ backgroundColor: theme.palette.background.paper }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="textPrimary">
                Category Breakdown
              </Typography>
              <Box sx={{ height: '400px'  , width:'25rem' }}>
                <Pie 
                  data={categoryData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'right',
                        labels: {
                          color: theme.palette.text.primary
                        }
                      },
                    },
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ mb: 3, backgroundColor: theme.palette.background.paper }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" color="textPrimary">Recent Expenses</Typography>
            <Button 
              variant="contained" 
              startIcon={<Add />}
              onClick={() => handleOpenDialog()}
              size={isMobile ? 'small' : 'medium'}
            >
              Add Expense
            </Button>
          </Box>

          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer component={Paper} sx={{ backgroundColor: theme.palette.background.paper }}>
              <Table size={isMobile ? 'small' : 'medium'}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: theme.palette.text.primary }}>Date</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary }}>Description</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary }}>Category</TableCell>
                    <TableCell align="right" sx={{ color: theme.palette.text.primary }}>Amount</TableCell>
                    <TableCell sx={{ color: theme.palette.text.primary }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {expenses.slice(0, 10).map((expense) => (
                    <TableRow key={expense._id} hover>
                      <TableCell sx={{ color: theme.palette.text.primary }}>
                        {format(new Date(expense.date), 'MMM dd, yyyy')}
                      </TableCell>
                      <TableCell sx={{ color: theme.palette.text.primary }}>{expense.description}</TableCell>
                      <TableCell>
                        <Box 
                          sx={{
                            display: 'inline-block',
                            px: 1,
                            py: 0.5,
                            borderRadius: 1,
                            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                            color: theme.palette.text.primary
                          }}
                        >
                          {expense.category}
                        </Box>
                      </TableCell>
                      <TableCell align="right" sx={{ color: theme.palette.text.primary }}>
                        <Typography fontWeight="bold">
                          ${expense.amount.toFixed(2)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <IconButton 
                          onClick={() => handleOpenDialog(expense)} 
                          size="small"
                          color="primary"
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton 
                          onClick={() => handleDelete(expense._id)} 
                          size="small"
                          color="error"
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Expense Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ 
          borderBottom: `1px solid ${theme.palette.divider}`, 
          py: 2,
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary
        }}>
          <Box display="flex" alignItems="center">
            {currentExpense ? (
              <>
                <Edit color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Edit Expense</Typography>
              </>
            ) : (
              <>
                <Add color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Add New Expense</Typography>
              </>
            )}
          </Box>
        </DialogTitle>
        <Formik
          initialValues={{
            amount: currentExpense?.amount || '',
            description: currentExpense?.description || '',
            category: currentExpense?.category || '',
            date: currentExpense?.date ? format(new Date(currentExpense.date), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'),
            isRecurring: currentExpense?.isRecurring || false,
            recurringInterval: currentExpense?.recurringInterval || 'monthly'
          }}
          validationSchema={expenseSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <DialogContent sx={{ 
                py: 3,
                backgroundColor: theme.palette.background.paper
              }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Amount"
                      name="amount"
                      type="number"
                      value={values.amount}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.amount && Boolean(errors.amount)}
                      helperText={touched.amount && errors.amount}
                      margin="normal"
                      InputProps={{
                        startAdornment: (
                          <Typography color="text.secondary" sx={{ mr: 1 }}>$</Typography>
                        ),
                      }}
                      sx={{
                        '& .MuiInputBase-input': {
                          color: theme.palette.text.primary
                        },
                        '& .MuiInputLabel-root': {
                          color: theme.palette.text.secondary
                        },
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: theme.palette.divider
                          },
                          '&:hover fieldset': {
                            borderColor: theme.palette.primary.main
                          }
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Date"
                      type="date"
                      name="date"
                      InputLabelProps={{ shrink: true }}
                      value={values.date}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.date && Boolean(errors.date)}
                      helperText={touched.date && errors.date}
                      margin="normal"
                      sx={{
                        '& .MuiInputBase-input': {
                          color: theme.palette.text.primary
                        },
                        '& .MuiInputLabel-root': {
                          color: theme.palette.text.secondary
                        },
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: theme.palette.divider
                          },
                          '&:hover fieldset': {
                            borderColor: theme.palette.primary.main
                          }
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.description && Boolean(errors.description)}
                      helperText={touched.description && errors.description}
                      margin="normal"
                      sx={{
                        '& .MuiInputBase-input': {
                          color: theme.palette.text.primary
                        },
                        '& .MuiInputLabel-root': {
                          color: theme.palette.text.secondary
                        },
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: theme.palette.divider
                          },
                          '&:hover fieldset': {
                            borderColor: theme.palette.primary.main
                          }
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      select
                      label="Category"
                      name="category"
                      value={values.category}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.category && Boolean(errors.category)}
                      helperText={touched.category && errors.category}
                      margin="normal"
                      sx={{
                        '& .MuiInputBase-input': {
                          color: theme.palette.text.primary
                        },
                        '& .MuiInputLabel-root': {
                          color: theme.palette.text.secondary
                        },
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: theme.palette.divider
                          },
                          '&:hover fieldset': {
                            borderColor: theme.palette.primary.main
                          }
                        },
                        '& .MuiSvgIcon-root': {
                          color: theme.palette.text.secondary
                        }
                      }}
                    >
                      {categories.map((category) => (
                        <MenuItem key={category} value={category} sx={{ color: theme.palette.text.primary }}>
                          {category}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      select
                      label="Recurring"
                      name="isRecurring"
                      value={values.isRecurring}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      margin="normal"
                      sx={{
                        '& .MuiInputBase-input': {
                          color: theme.palette.text.primary
                        },
                        '& .MuiInputLabel-root': {
                          color: theme.palette.text.secondary
                        },
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: theme.palette.divider
                          },
                          '&:hover fieldset': {
                            borderColor: theme.palette.primary.main
                          }
                        },
                        '& .MuiSvgIcon-root': {
                          color: theme.palette.text.secondary
                        }
                      }}
                    >
                      <MenuItem value={false} sx={{ color: theme.palette.text.primary }}>One-time</MenuItem>
                      <MenuItem value={true} sx={{ color: theme.palette.text.primary }}>Recurring</MenuItem>
                    </TextField>
                  </Grid>
                  {values.isRecurring && (
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        select
                        label="Recurring Interval"
                        name="recurringInterval"
                        value={values.recurringInterval}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        margin="normal"
                        sx={{
                          '& .MuiInputBase-input': {
                            color: theme.palette.text.primary
                          },
                          '& .MuiInputLabel-root': {
                            color: theme.palette.text.secondary
                          },
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: theme.palette.divider
                            },
                            '&:hover fieldset': {
                              borderColor: theme.palette.primary.main
                            }
                          },
                          '& .MuiSvgIcon-root': {
                            color: theme.palette.text.secondary
                          }
                        }}
                      >
                        <MenuItem value="weekly" sx={{ color: theme.palette.text.primary }}>Weekly</MenuItem>
                        <MenuItem value="monthly" sx={{ color: theme.palette.text.primary }}>Monthly</MenuItem>
                        <MenuItem value="yearly" sx={{ color: theme.palette.text.primary }}>Yearly</MenuItem>
                      </TextField>
                    </Grid>
                  )}
                </Grid>
              </DialogContent>
              <DialogActions sx={{ 
                borderTop: `1px solid ${theme.palette.divider}`, 
                p: 2,
                backgroundColor: theme.palette.background.paper
              }}>
                <Button onClick={handleCloseDialog} color="inherit">
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  variant="contained" 
                  disabled={isSubmitting}
                  startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
                >
                  {currentExpense ? 'Update' : 'Add'} Expense
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
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
          elevation={6}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Expenses;