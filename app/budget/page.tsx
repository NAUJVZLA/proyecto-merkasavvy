"use client";
import React, { useState } from "react";

const BudgetPage: React.FC = () => {
  const [budgets, setBudgets] = useState([
    { category: "Comida", amount: 200 },
    { category: "Transporte", amount: 50 },
  ]);
  const [newBudget, setNewBudget] = useState({ category: "", amount: 0 });

  const handleAddBudget = () => {
    setBudgets([...budgets, newBudget]);
    setNewBudget({ category: "", amount: 0 });
  };

  return (
    <div className="container">
      <h2>Presupuesto Mensual</h2>
      <table>
        <thead>
          <tr>
            <th>Categoría</th>
            <th>Monto</th>
          </tr>
        </thead>
        <tbody>
          {budgets.map((budget, index) => (
            <tr key={index}>
              <td>{budget.category}</td>
              <td>{budget.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Añadir Nuevo Presupuesto</h3>
      <input
        type="text"
        placeholder="Categoría"
        value={newBudget.category}
        onChange={(e) =>
          setNewBudget({ ...newBudget, category: e.target.value })
        }
      />
      <input
        type="number"
        placeholder="Monto"
        value={newBudget.amount}
        onChange={(e) =>
          setNewBudget({ ...newBudget, amount: parseFloat(e.target.value) })
        }
      />
      <button onClick={handleAddBudget}>Añadir Presupuesto</button>
    </div>
  );
};

export default BudgetPage;
