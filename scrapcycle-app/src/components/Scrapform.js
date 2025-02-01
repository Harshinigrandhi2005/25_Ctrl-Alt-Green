import React, { useState } from "react";
import "../App.css";
import axios from 'axios';

export default function ScrapForm() {
  const [formData, setFormData] = useState({
    category: "",
    subCategory: "",
    price: "",
    location: "",
    weight: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("category", formData.category);
    form.append("subCategory", formData.subCategory);
    form.append("price", formData.price);
    form.append("location", formData.location);
    form.append("weight", formData.weight);
    if (formData.image) {
      form.append("image", formData.image);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/scrap/add', form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(response.data.message);
    } catch (error) {
      alert("Error submitting form");
    }
  };

  return (
    <div className="form-container">
      <h2>SELL YOUR SCRAP</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" />
        <input type="text" name="subCategory" value={formData.subCategory} onChange={handleChange} placeholder="Sub-Category" />
        <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" />
        <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
        <input type="number" name="weight" value={formData.weight} onChange={handleChange} placeholder="Weight" />
        
        <label className="upload-box">
          UPLOAD A PICTURE
          <input type="file" className="hidden-input" onChange={handleImageUpload} />
          <div className="upload-icon">📤</div>
        </label>

        {formData.image && <p className="uploaded-text">Uploaded: {formData.image.name}</p>}

        <button type="submit">Submit</button>
      </form>
      <p className="brand">ScrapCycle</p>
      <p className="tagline">Scrap Today, Sustain Tomorrow</p>
    </div>
  );
}
