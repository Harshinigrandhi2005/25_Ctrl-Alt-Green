import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, Legend } from 'recharts';
import './DashBoard.css'; // Import the CSS file for Dashboard styling

function Dashboard() {
  // Dummy Data for the Pie Chart (Types of Waste)
  const wasteData = [
    { name: 'Plastic', value: 40 },
    { name: 'Paper', value: 30 },
    { name: 'Metal', value: 15 },
    { name: 'Glass', value: 10 },
    { name: 'Organic', value: 5 }
  ];

  // Dummy Data for the Bar Chart (Waste Diverged Over the Years)
  const barData = [
    { year: 2019, wasteDiverted: 300 },
    { year: 2020, wasteDiverted: 450 },
    { year: 2021, wasteDiverted: 600 },
    { year: 2022, wasteDiverted: 750 },
    { year: 2023, wasteDiverted: 900 }
  ];

  // Dummy Data for the Line Chart (CO2 Emissions Saved Over Time)
  const lineData = [
    { year: 2019, co2Saved: 50 },
    { year: 2020, co2Saved: 100 },
    { year: 2021, co2Saved: 150 },
    { year: 2022, co2Saved: 200 },
    { year: 2023, co2Saved: 250 }
  ];

  // Array of colors for pie chart slices
  const pieColors = ['#4caf50', '#66bb6a', '#81c784', '#A5D6A7', '#C8E6C9'];

  return (
    <div className="dashboard">
      
      <div className="charts-container">
        {/* Left Section (Bar and Line Chart) */}
        <div className="left-charts">
          <div className="bar-chart-container">
            <h3>Waste Diverted Over the Years</h3>
            <BarChart width={500} height={300} data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="wasteDiverted" fill="#388e3c" />
            </BarChart>
          </div>

          <div className="line-chart-container">
            <h3>CO2 Emissions Saved Over Time</h3>
            <LineChart width={500} height={300} data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="co2Saved" stroke="#388e3c" />
            </LineChart>
          </div>
        </div>

        {/* Right Section (Pie Chart) */}
        <div className="right-chart">
          <h3>Types of Waste</h3>
          <PieChart width={400} height={400}>
            <Pie data={wasteData} dataKey="value" nameKey="name" outerRadius={150} fill="#388e3c">
              {wasteData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index]} />
              ))}
            </Pie>
            {/* Legend to display material types with corresponding colors */}
            <Legend 
              layout="vertical"
              align="right"
              verticalAlign="middle"
              iconType="circle"
              payload={wasteData.map((entry, index) => ({
                value: entry.name,
                type: 'circle',
                color: pieColors[index]
              }))}
            />
          </PieChart>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;