import React, { useState } from "react";

function PlantCard({ plant, onDeletePlant, onUpdatePlant }) {
  const { id, name, image, price, soldOut } = plant;
  const [isSoldOut, setIsSoldOut] = useState(soldOut);

  // Handle Delete
  const handleDelete = () => {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE",
    }).then(() => {
      onDeletePlant(id);
    });
  };

  // Handle Update (Toggle Sold Out)
  const handleUpdate = () => {
    const updatedData = { soldOut: !isSoldOut };

    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((updatedPlant) => {
        onUpdatePlant(updatedPlant);
        setIsSoldOut(updatedPlant.soldOut);
      });
  };

  return (
    <div className="plant-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>Price: ${price}</p>
      <p>Status: {isSoldOut ? "Sold Out" : "In Stock"}</p>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleUpdate}>
        {isSoldOut ? "Mark as In Stock" : "Mark as Sold Out"}
      </button>
    </div>
  );
}

export default PlantCard;
