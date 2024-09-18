"use client";

import React from "react";

const InformationPage: React.FC = () => {
  const expenses = [
    { category: "Comida", amount: 180 },
    { category: "Transporte", amount: 40 },
    { category: "Ocio", amount: 60 },
  ];

  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="container">
      <h2>Informe de Gastos</h2>
      <div className="summary">
        <h3>Gasto Total: ${totalExpenses}</h3>
        <button>Exportar Informe</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Categoría</th>
            <th>Monto</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={index}>
              <td>{expense.category}</td>
              <td>{expense.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InformationPage;
