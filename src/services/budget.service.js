import api from './api';

const getBudgets = async () => {
  const response = await api.get('/budgets');
  return response.data;
};

const createBudget = async (budgetData) => {
  const response = await api.post('/budgets', budgetData);
  return response.data;
};

const updateBudget = async (id, budgetData) => {
  const response = await api.put(`/budgets/${id}`, budgetData);
  return response.data;
};

const deleteBudget = async (id) => {
  const response = await api.delete(`/budgets/${id}`);
  return response.data;
};

export default {
  getBudgets,
  createBudget,
  updateBudget,
  deleteBudget,
};