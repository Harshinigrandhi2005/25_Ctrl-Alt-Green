// ForecastPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ForecastPage = () => {
  const { metalType } = useParams(); // metalType is the subCategory
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await axios.post('http://localhost:5001/forecast', { metalType });
        setForecast(response.data.forecast);
      } catch (error) {
        console.error('Error fetching forecast:', error);
      }
    };
    fetchForecast();
  }, [metalType]);

  return (
    <div>
      <h1>Forecast for {metalType}</h1>
      {forecast ? (
        <div>
          <p>Predicted Price: {forecast.predictedPrice}</p>
          {/* Display other forecast data */}
        </div>
      ) : (
        <p>Loading forecast...</p>
      )}
    </div>
  );
};

export default ForecastPage;
