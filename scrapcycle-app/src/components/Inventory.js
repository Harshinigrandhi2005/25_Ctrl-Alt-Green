import React, { useState } from 'react';
import './Inventory.css';

function Inventory() {
  // Dummy data for materials
  const materials = [
    { name: 'Copper', quantity: 250, threshold: 500 },
    { name: 'Aluminum', quantity: 150, threshold: 200 },
    { name: 'Steel', quantity: 300, threshold: 350 },
  ];

  const [storageLeft] = useState(1200); // in cubic meters
  const totalStorage = 5000; // Total capacity
  const canBeFilled = totalStorage - storageLeft; // How much can still be filled

  const [totalProfit] = useState(25000); // in currency
  const [totalLoss] = useState(500); // in currency

  return (
    React.createElement("div", { className: "inventory-container" }, 
      React.createElement("h2", { className: "inventory-heading" }, "Inventory Management"),

      React.createElement("div", { className: "main-grid" },

        // Materials Grid
        React.createElement("section", { className: "grid-item materials" },
          React.createElement("h3", { className: "section-title" }, "Materials Available"),
          React.createElement("div", { className: "materials-grid" },
            materials.map((material, index) => 
              React.createElement("div", {
                key: index,
                className: `material-card ${material.quantity < material.threshold ? 'low-stock' : ''}`
              },
                React.createElement("div", { className: "material-name" }, material.name),
                React.createElement("div", { className: "material-quantity" }, `${material.quantity} units`),
                React.createElement("div", { className: "material-threshold" },
                  material.quantity < material.threshold
                    ? `Threshold Reached! (${material.threshold - material.quantity} units needed)`
                    : `Threshold: ${material.threshold} units`
                ),
                React.createElement("div", { className: "threshold-bar" },
                  React.createElement("div", {
                    className: "threshold-progress",
                    style: { width: `${(material.quantity / material.threshold) * 100}%` }
                  })
                )
              )
            )
          )
        ),

        // Profit & Expenses Grid
        React.createElement("section", { className: "grid-item profit-loss" },
          React.createElement("h3", { className: "section-title" }, "Profit & Expenses"),
          React.createElement("div", { className: "profit-loss-summary" },
            React.createElement("div", { className: "profit" },
              React.createElement("span", { className: "profit-text" }, "Total Profit: "),
              React.createElement("span", { className: "profit-value" }, `$${totalProfit}`)
            ),
            React.createElement("div", { className: "loss" },
              React.createElement("span", { className: "loss-text" }, "Total Loss: "),
              React.createElement("span", { className: "loss-value" }, `$${totalLoss}`)
            )
          )
        ),

        // Storage Grid
        React.createElement("section", { className: "grid-item storage" },
          React.createElement("h3", { className: "section-title" }, "Storage Capacity"),
          React.createElement("div", { className: "storage-info" },
            React.createElement("span", { className: "storage-text" }, "Storage Left: "),
            React.createElement("span", { className: "storage-value" }, `${storageLeft} m³`)
          ),
          React.createElement("div", { className: "storage-info" },
            React.createElement("span", { className: "storage-text" }, "Can Be Filled: "),
            React.createElement("span", { className: "storage-value" }, `${canBeFilled} m³`)
          )
        )
      )
    )
  );
}

export default Inventory;
