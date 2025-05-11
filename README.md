# Expense Tracker

[![GitHub license](https://img.shields.io/github/license/AbdulAHAD968/EXPENSE-TRACKER)](https://github.com/AbdulAHAD968/EXPENSE-TRACKER/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/AbdulAHAD968/EXPENSE-TRACKER)](https://github.com/AbdulAHAD968/EXPENSE-TRACKER/issues)
[![GitHub stars](https://img.shields.io/github/stars/AbdulAHAD968/EXPENSE-TRACKER)](https://github.com/AbdulAHAD968/EXPENSE-TRACKER/stargazers)

A modern web application to track your expenses, manage budgets, and analyze spending patterns.

---

![login.PNG](https://raw.githubusercontent.com/AbdulAHAD968/EXPENSE-TRACKER/main/assets/login.PNG)

---

![signup.PNG](https://raw.githubusercontent.com/AbdulAHAD968/EXPENSE-TRACKER/main/assets/signup.PNG)

---

![dash-board.PNG](https://raw.githubusercontent.com/AbdulAHAD968/EXPENSE-TRACKER/main/assets/dash-board.PNG)

---

## Features

- Desktop Application (You can generate a Desktop icon using powershell script).
- Runs totally in background.
- Interactive Dashboard
- Expense Tracking
- Budget Management
- Detailed Reports
- User Settings
- Secure Authentication
- Responsive Design

## Directory Overview

For a detailed directory structure, view the project on [GitIngest](https://gitingest.com/r/AbdulAHAD968/EXPENSE-TRACKER).

## User Guides

### Dashboard

The dashboard provides an overview of your financial status:

1. **Summary Cards**: View your total balance, income, expenses, and savings at a glance
2. **Spending Chart**: Visualize your expenses by category (pie/bar chart)
3. **Recent Transactions**: Quickly see your last 5-10 transactions
4. **Budget Progress**: Track your monthly budget utilization

---
![expense-tracker.PNG](https://raw.githubusercontent.com/AbdulAHAD968/EXPENSE-TRACKER/main/assets/expense-tracker.PNG)
---
![1.PNG](https://raw.githubusercontent.com/AbdulAHAD968/EXPENSE-TRACKER/main/assets/1.PNG)
---

### Expenses

Track and manage your expenses:

1. **Add New Expense**:
   - Click "+ Add Expense" button
   - Fill in amount, category, date, and description
   - Attach receipts (optional)
   - Click "Save"

2. **Edit/Delete Expenses**:
   - Click on any expense in the list
   - Make changes or click "Delete"
   - Confirm your action

3. **Filter Expenses**:
   - Use date range picker
   - Filter by category
   - Search by description

### Budget

Set and monitor your budgets:

1. **Create Budget**:
   - Select a category (Groceries, Entertainment, etc.)
   - Set monthly amount
   - Choose period (monthly/weekly)

2. **Track Progress**:
   - Visual progress bars show spending vs budget
   - Color indicators (green/yellow/red) warn when approaching limits
   - Receive notifications when exceeding budgets

---
![add-budget.PNG](https://raw.githubusercontent.com/AbdulAHAD968/EXPENSE-TRACKER/main/assets/add-budget.PNG)
---
![budget-manage.PNG](https://raw.githubusercontent.com/AbdulAHAD968/EXPENSE-TRACKER/main/assets/budget-manage.PNG)
---

### Reports

Generate detailed financial reports:

1. **Spending Analysis**:
   - View by category, merchant, or payment method
   - Compare periods (month-over-month, year-over-year)

2. **Export Data**:
   - Export to Excel
   - Print reports directly

3. **Custom Reports**:
   - Create custom date ranges
   - Filter by specific categories or tags

---
![gen-reports.PNG](https://raw.githubusercontent.com/AbdulAHAD968/EXPENSE-TRACKER/main/assets/gen-reports.PNG)
---

### Settings

Customize your experience:

1. **Profile**:
   - Update personal information
   - Change profile picture

2. **Preferences**:
   - Set default currency
   - Choose theme (light/dark)
   - Configure notifications

3. **Account**:
   - Change password
   - Enable two-factor authentication
   - Manage connected banks (if applicable)

4. **Data Management**:
   - Backup your data
   - Export all transactions
   - Delete account
---
![account-settings.PNG](https://raw.githubusercontent.com/AbdulAHAD968/EXPENSE-TRACKER/main/assets/account-settings.PNG)
---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AbdulAHAD968/EXPENSE-TRACKER.git
   cd EXPENSE-TRACKER```

## Launch via Desktop Shortcut (Windows Only)

- launch-expense-tracker.ps1
- Start Backend (Hidden + Adjust the path as needed)
    Start-Process "cmd.exe" -ArgumentList "/c cd /d D:\HTML\expense-tracker\server && npm run dev" -WindowStyle Hidden
- Start Frontend (Hidden + Adjust the path as needed)
    Start-Process "cmd.exe" -ArgumentList "/c cd /d D:\HTML\expense-tracker && npm start" -WindowStyle Hidden
- Open browser after delay (optional)
    Start-Sleep -Seconds 5
    Start-Process "http://localhost:3000"

## Future Work:
- Still trying to resolve the error that how to stop the bg tasks automatically.
- AI (DeepSeek API) integration for getting insights and plans abou budget management.
