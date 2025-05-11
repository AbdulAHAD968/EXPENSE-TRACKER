import React, { useEffect, useState } from 'react';
import { 
  Box, Typography, Grid, Card, CardContent, 
  CircularProgress, LinearProgress, Divider, 
  Chip, Stack, useTheme, useMediaQuery
} from '@mui/material';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  ArcElement, Tooltip, Legend, 
  CategoryScale, LinearScale, 
  BarElement, PointElement, 
  LineElement, Title 
} from 'chart.js';
import expenseService from '../services/expense.service';
import budgetService from '../services/budget.service';
import { useAuth } from '../context/AuthContext';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PaidIcon from '@mui/icons-material/Paid';
import SavingsIcon from '@mui/icons-material/Savings';
import CategoryIcon from '@mui/icons-material/Category';

ChartJS.register(
  ArcElement, Tooltip, Legend, 
  CategoryScale, LinearScale, 
  BarElement, PointElement, 
  LineElement, Title
);

const Dashboard = () => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [expensesRes, budgetsRes] = await Promise.all([
          expenseService.getExpenses(),
          budgetService.getBudgets(),
        ]);
        setExpenses(expensesRes.data);
        setBudgets(budgetsRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  // Calculations
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalBudget = budgets.reduce((sum, budget) => sum + budget.amount, 0);
  const savings = totalBudget - totalExpenses;
  const utilizationPercentage = (totalExpenses / totalBudget) * 100;
  const isOverBudget = utilizationPercentage > 100;

  // Monthly trend data (assuming expenses have a date field)
  const monthlyExpenses = expenses.reduce((acc, expense) => {
    const month = new Date(expense.date).toLocaleString('default', { month: 'short' });
    acc[month] = (acc[month] || 0) + expense.amount;
    return acc;
  }, {});

  // Category breakdown
  const expensesByCategory = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const categoryInsights = Object.entries(expensesByCategory)
    .sort((a, b) => b[1] - a[1])
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: (amount / totalExpenses) * 100
    }));

  const highestCategory = categoryInsights[0];
  const lowestCategory = categoryInsights[categoryInsights.length - 1];

  // Budget vs Actual comparison
  const budgetComparison = budgets.map(budget => {
    const categoryExpenses = expenses
      .filter(e => e.category === budget.category)
      .reduce((sum, e) => sum + e.amount, 0);
    
    return {
      category: budget.category,
      budget: budget.amount,
      actual: categoryExpenses,
      difference: budget.amount - categoryExpenses,
      percentage: (categoryExpenses / budget.amount) * 100
    };
  });

  // Chart data
  const doughnutData = {
    labels: Object.keys(expensesByCategory),
    datasets: [{
      data: Object.values(expensesByCategory),
      backgroundColor: [
        theme.palette.primary.main,
        theme.palette.secondary.main,
        theme.palette.error.main,
        theme.palette.warning.main,
        theme.palette.info.main,
        theme.palette.success.main,
        '#9966FF',
        '#FF9F40',
        '#8AC24A'
      ],
      borderWidth: 0
    }],
  };

  const budgetComparisonData = {
    labels: budgets.map(b => b.category),
    datasets: [
      {
        label: 'Budget',
        data: budgets.map(b => b.amount),
        backgroundColor: theme.palette.success.light,
        borderColor: theme.palette.success.main,
        borderWidth: 1
      },
      {
        label: 'Actual',
        data: budgets.map(b => {
          return expenses
            .filter(e => e.category === b.category)
            .reduce((sum, e) => sum + e.amount, 0);
        }),
        backgroundColor: theme.palette.warning.light,
        borderColor: theme.palette.warning.main,
        borderWidth: 1
      }
    ],
  };

  const monthlyTrendData = {
    labels: Object.keys(monthlyExpenses),
    datasets: [{
      label: 'Monthly Spending',
      data: Object.values(monthlyExpenses),
      fill: false,
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
      tension: 0.4
    }]
  };

  // Card components for reuse
  const MetricCard = ({ icon, title, value, subtext, color }) => (
    <Card sx={{ height: '100%', boxShadow: theme.shadows[2] }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box display="flex" alignItems="center" mb={1}>
          {icon}
          <Typography variant="subtitle1" color="text.secondary" ml={1}>
            {title}
          </Typography>
        </Box>
        <Typography variant="h5" color={color} sx={{ flexGrow: 1 }}>
          {value}
        </Typography>
        {subtext && (
          <Typography variant="caption" color="text.secondary">
            {subtext}
          </Typography>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ p: isMobile ? 2 : 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        Welcome back, {user?.name}!
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" mb={3}>
        Here's your financial overview
      </Typography>

      {/* Summary Cards - Top Row */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <MetricCard
            icon={<PaidIcon color="primary" />}
            title="Total Expenses"
            value={`$${totalExpenses.toFixed(2)}`}
            color="text.primary"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <MetricCard
            icon={<AccountBalanceIcon color="success" />}
            title="Total Budget"
            value={`$${totalBudget.toFixed(2)}`}
            color="success.main"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <MetricCard
            icon={<SavingsIcon color={savings >= 0 ? "success" : "error"} />}
            title="Savings"
            value={`$${Math.abs(savings).toFixed(2)}`}
            subtext={savings >= 0 ? "You're under budget" : "You're over budget"}
            color={savings >= 0 ? "success.main" : "error.main"}
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <MetricCard
            icon={<CategoryIcon color="info" />}
            title="Categories"
            value={budgets.length}
            subtext={`${expenses.length} transactions`}
            color="info.main"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <MetricCard
            icon={isOverBudget ? <TrendingUpIcon color="error" /> : <TrendingDownIcon color="success" />}
            title="Budget Used"
            value={`${utilizationPercentage.toFixed(1)}%`}
            subtext={isOverBudget ? "Over budget!" : "Within budget"}
            color={isOverBudget ? "error.main" : "success.main"}
          />
        </Grid>
        
      </Grid>

      {/* Charts and Insights - Middle Row */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {/* Expense Breakdown */}
        <Grid item xs={12} md={5}>
          <Card sx={{ height: '100%' , width:'30rem' , boxShadow: theme.shadows[2] }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Expense Breakdown
              </Typography>
              <Box sx={{ height: 300 }}>
                <Doughnut 
                  data={doughnutData}
                  options={{
                    plugins: {
                      legend: {
                        position: isMobile ? 'bottom' : 'right',
                      },
                      tooltip: {
                        callbacks: {
                          label: (context) => {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const percentage = (value / totalExpenses) * 100;
                            return `${label}: $${value.toFixed(2)} (${percentage.toFixed(1)}%)`;
                          }
                        }
                      }
                    },
                    cutout: '65%',
                    maintainAspectRatio: false
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Budget vs Actual */}
        <Grid item xs={12} md={7}>
          <Card sx={{ height: '100%'  , width:'30rem' , boxShadow: theme.shadows[2] }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Budget vs Actual Spending
              </Typography>
              <Box sx={{ height: 300 }}>
                <Bar 
                  data={budgetComparisonData}
                  options={{ 
                    responsive: true, 
                    maintainAspectRatio: false,
                    scales: {
                      x: {
                        grid: {
                          display: false
                        }
                      },
                      y: {
                        beginAtZero: true,
                        grid: {
                          color: theme.palette.divider
                        }
                      }
                    },
                    plugins: {
                      tooltip: {
                        callbacks: {
                          label: (context) => {
                            const datasetLabel = context.dataset.label || '';
                            const value = context.raw || 0;
                            return `${datasetLabel}: $${value.toFixed(2)}`;
                          }
                        }
                      }
                    }
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Bottom Row - Detailed Insights */}
      <Grid container spacing={2}>
        {/* Monthly Trend */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' , width:'30rem', boxShadow: theme.shadows[2] }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Monthly Spending Trend
              </Typography>
              <Box sx={{ height: 250 }}>
                <Line 
                  data={monthlyTrendData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        grid: {
                          color: theme.palette.divider
                        }
                      },
                      x: {
                        grid: {
                          display: false
                        }
                      }
                    }
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Category Insights */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' , width:'30rem' , boxShadow: theme.shadows[2] }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Category Insights
              </Typography>
              
              <Box mb={3}>
                <Typography variant="subtitle2" color="text.secondary">
                  Highest Spending
                </Typography>
                <Box display="flex" alignItems="center" mt={1}>
                  <Chip 
                    label={highestCategory?.category} 
                    size="small" 
                    sx={{ mr: 1, backgroundColor: theme.palette.error.light }} 
                  />
                  <Typography variant="h6" color="error.main">
                    ${highestCategory?.amount?.toFixed(2)}
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={highestCategory?.percentage} 
                  color="error"
                  sx={{ mt: 1, height: 8, borderRadius: 4 }}
                />
                <Typography variant="caption" color="text.secondary">
                  {highestCategory?.percentage?.toFixed(1)}% of total expenses
                </Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Lowest Spending
                </Typography>
                <Box display="flex" alignItems="center" mt={1}>
                  <Chip 
                    label={lowestCategory?.category} 
                    size="small" 
                    sx={{ mr: 1, backgroundColor: theme.palette.success.light }} 
                  />
                  <Typography variant="h6" color="success.main">
                    ${lowestCategory?.amount?.toFixed(2)}
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={lowestCategory?.percentage} 
                  color="success"
                  sx={{ mt: 1, height: 8, borderRadius: 4 }}
                />
                <Typography variant="caption" color="text.secondary">
                  {lowestCategory?.percentage?.toFixed(1)}% of total expenses
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Budget Status */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', width:'34rem', boxShadow: theme.shadows[2] }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Budget Status by Category
              </Typography>
              
              <Stack spacing={2} sx={{ maxHeight: 300, overflowY: 'auto', pr: 1 }}>
                {budgetComparison.map((item, index) => (
                  <Box key={index}>
                    <Box display="flex" justifyContent="space-between" mb={0.5}>
                      <Typography variant="subtitle2">{item.category}</Typography>
                      <Typography 
                        variant="subtitle2" 
                        color={item.difference >= 0 ? "success.main" : "error.main"}
                      >
                        {item.difference >= 0 ? '+' : ''}{item.difference.toFixed(2)}
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={Math.min(item.percentage, 100)} 
                      color={item.percentage > 100 ? "error" : "success"}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                    <Box display="flex" justifyContent="space-between" mt={0.5}>
                      <Typography variant="caption" color="text.secondary">
                        ${item.actual.toFixed(2)} of ${item.budget.toFixed(2)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {item.percentage.toFixed(1)}%
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Box>
  );
};

export default Dashboard;