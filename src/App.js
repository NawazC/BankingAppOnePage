import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Transaction from './Transaction';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    type: '',
    accountNumber: '',
    amount: 0
  });
  const [accountBalances, setAccountBalances] = useState({});

  // Function to handle transaction submission
  const handleTransaction = () => {
    const { type, accountNumber, amount } = formData;

    if (type && accountNumber && amount > 0) {
      const newTransaction = {
        type,
        accountNumber,
        amount,
        timestamp: new Date().toLocaleString()
      };

      // Update transactions
      setTransactions([...transactions, newTransaction]);

      // Update account balance based on transaction type
      const updatedBalance = (accountBalances[accountNumber] || 0) + (type === 'Deposit' ? amount : -amount);
      setAccountBalances({ ...accountBalances, [accountNumber]: updatedBalance });

      // Reset form data
      setFormData({ type: '', accountNumber: '', amount: 0 });
    } else {
      alert('Please fill out all fields correctly.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <h2>Bank Transactions</h2>
          <button
            className="btn btn-primary mr-2"
            onClick={() => setFormData({ type: 'Deposit', accountNumber: '', amount: 0 })}
          >
            Deposit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setFormData({ type: 'Withdrawal', accountNumber: '', amount: 0 })}
          >
            Withdraw
          </button>
        </div>
      </div>

      {formData.type && (
        <div className="mt-3">
          <h3>{formData.type} Form</h3>
          <div className="form-group">
            <label>Account Number:</label>
            <input
              type="text"
              className="form-control"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Amount:</label>
            <input
              type="number"
              className="form-control"
              name="amount"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
            />
          </div>
          <button className="btn btn-primary" onClick={handleTransaction}>
            {formData.type}
          </button>
        </div>
      )}

      <Transaction transactions={transactions} accountBalances={accountBalances} />
    </div>
  );
}

export default App;
