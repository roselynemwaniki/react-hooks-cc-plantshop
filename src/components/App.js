import React, { useState, useEffect } from "react";
import PlantList from "./PlantList";
import NewPlantForm from "./NewPlantForm";
import Search from "./Search";

function App() {
  const [plants, setPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch plants from the backend
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((res) => res.json())
      .then((data) => setPlants(data))
      .catch((error) => console.error("Failed to fetch plants:", error));
  }, []);
  

  // Add a new plant
  const handleAddPlant = (newPlant) => {
    setPlants([...plants, newPlant]);
  };

  // Delete a plant
  const handleDeletePlant = (id) => {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE",
    }).then(() => {
      setPlants((prevPlants) => prevPlants.filter((plant) => plant.id !== id));
    });
  };

  // Update plant status (toggle sold out)
  const handleUpdatePlant = (updatedPlant) => {
    setPlants((prevPlants) =>
      prevPlants.map((plant) =>
        plant.id === updatedPlant.id ? updatedPlant : plant
      )
    );
  };

  // Filter plants by search query
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>Plantsy</h1>
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <NewPlantForm onAddPlant={handleAddPlant} />
      <PlantList
        plants={filteredPlants}
        onDeletePlant={handleDeletePlant}
        onUpdatePlant={handleUpdatePlant}
      />
    </div>
  );
}

export default App;
