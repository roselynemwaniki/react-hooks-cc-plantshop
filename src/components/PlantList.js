import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, onDeletePlant, onUpdatePlant }) {
  return (
    <div className="plant-list">
      {plants.map((plant) => (
        <PlantCard
          key={plant.id}
          plant={plant}
          onDeletePlant={onDeletePlant}
          onUpdatePlant={onUpdatePlant}
        />
      ))}
    </div>
  );
}

export default PlantList;


