import { useState } from "react";
import { Card } from "./components/Card";
import { Regions } from "./components/Regions";
import { RegionsList } from "./components/RegionsList";
import { Link, Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const [regions, setRegions] = useState([]);

  const addRegionsHandler = (region) => {
    setRegions((prev) => {
      return [...prev, region];
    });
  };

  return (
    <>
      <Router>
        <nav>
          <Link to='/' style={{ marginRight: "20px" }}>
            region
          </Link>
          <Link to='/regions'>region list</Link>
        </nav>
        <Routes>
          <Card>
            <Route path='/' element={<Regions onAdd={addRegionsHandler} />} />
            <Route path='/regions' element={<RegionsList list={regions} />} />
          </Card>
        </Routes>
      </Router>
    </>
  );
}

export default App;
