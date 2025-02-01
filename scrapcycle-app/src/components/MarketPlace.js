import React, { useEffect, useState } from "react";
import "./MarketPlace.css";

export default function Marketplace() {
  const [scrapItems, setScrapItems] = useState([]);

  useEffect(() => {
    // Fetch the scrap data from the backend
    fetch("http://localhost:5000/api/scrap")
      .then((response) => response.json())
      .then((data) => setScrapItems(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  const handleBuyNow = (id) => {
    // Handle the buy now action (for now, just log the ID)
    alert(`Item with ID ${id} is bought!`);
  };

  return (
    <div className="marketplace-container">
      <h1 className="marketplace-title">Scrap Marketplace</h1>
      <div className="scrap-cards">
        {scrapItems.map((item) => (
          <div key={item._id} className="scrap-card">
            <div className="scrap-card-image">
              {item.image ? (
                <img src={`http://localhost:5000/${item.image}`} alt="scrap" />
              ) : (
                <div className="no-image">No Image Available</div>
              )}
            </div>
            <div className="scrap-card-details">
              <h2>{item.category} - {item.subCategory}</h2>
              <p><strong>Price:</strong> ₹{item.price}</p>
              <p><strong>Location:</strong> {item.location}</p>
              <p><strong>Weight:</strong> {item.weight} kg</p>
              <button onClick={() => handleBuyNow(item._id)} className="buy-now-btn">Buy Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
