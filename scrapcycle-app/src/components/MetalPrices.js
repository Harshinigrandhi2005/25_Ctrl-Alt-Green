import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MetalPrices.css";
const MetalPrices = () => {
  const [metalPrices, setMetalPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch metal prices from the Flask backend
  useEffect(() => {
    const fetchMetalPrices = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/scrape");
        setMetalPrices(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching metal prices:", error);
        setLoading(false);
      }
    };

    fetchMetalPrices();
  }, []);

  // Render the fetched data
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="metal-prices">
      <h2>Current Metal Prices</h2>
      {metalPrices.length === 0 ? (
        <div>No data available.</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Metal</th>
              <th>Price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {metalPrices.map((metal, index) => (
              <tr key={index}>
                <td>{metal.metal}</td>
                <td>{metal.price}</td>
                <td>{metal.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MetalPrices;