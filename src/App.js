import { useState } from "react";
import { Card } from "./components/Card";
import { Regions } from "./components/Regions";
import { RegionsList } from "./components/RegionsList";

function App() {
  const [regions, setRegions] = useState([]);

  const addRegionsHandler = (region) => {
    setRegions((prev) => {
      return [...prev, region];
    });
  };

  return (
    <Card>
      <Regions onAdd={addRegionsHandler} />
      <RegionsList list={regions} />
    </Card>
  );
}

export default App;
