import React, { useState } from 'react';
import './Destination.css'; // Link to your styles file

function App() {
  const [destinations, setDestinations] = useState(['']); // Store destinations in an array
  const [result, setResult] = useState(null); // Store the result message

  // Function to handle the closest destination logic
  const findClosestDestination = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/find_closest", {  // Ensure full API URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destinations: destinations.filter(dest => dest.trim() !== "") }) // Avoid empty destinations
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const resultData = await response.json();
      setResult(`Closest Destination: ${resultData.closest}, Distance: ${resultData.distance} km`);
    } catch (error) {
      setResult(`Error: ${error.message}`);
    }
  };

  // Function to add a new destination input field
  const addDestinationInput = () => {
    setDestinations([...destinations, '']); // Add a new empty destination to the array
  };

  // Function to handle destination input changes
  const handleDestinationChange = (index, value) => {
    const updatedDestinations = [...destinations];
    updatedDestinations[index] = value;
    setDestinations(updatedDestinations); // Update the corresponding destination
  };

  return (
    <div className="App">
      <h1>Closest Destination Finder</h1>
      
      <div id="destinations">
        {destinations.map((destination, index) => (
          <div key={index}>
            <input
              type="text"
              className="destination"
              placeholder="Enter destination"
              value={destination}
              onChange={(e) => handleDestinationChange(index, e.target.value)}
            />
            <br />
          </div>
        ))}
      </div>

      <button onClick={addDestinationInput}>Add Another Destination</button>
      <button onClick={findClosestDestination}>Check Closest Destination</button>

      {result && <h2 id="result">{result}</h2>}
    </div>
  );
}

export default App;
