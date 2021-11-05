import { useState } from 'react';
import { Card } from './components/Card';
import { Regions } from './components/Regions';
import { RegionsList } from './components/RegionsList';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { SingleRegion } from './components/SingleRegion';

function App() {
  const [regions, setRegions] = useState([]);

  const addRegionsHandler = (region) => {
    setRegions((prev) => {
      return [...prev, region];
    });
  };

  return (
    <>
      <Card>
        <Header />
      </Card>
      <Card>
        <Routes>
          <Route path='/' element={<Regions onAdd={addRegionsHandler} />} />
          <Route path='/regions' element={<RegionsList list={regions} />} />
          <Route
            path='/regions/:id'
            element={<SingleRegion list={regions} />}
          />
        </Routes>
      </Card>
    </>
  );
}

// https://gist.github.com/pokiujf/8ffcf2378e0f7c2be66bab03c6729e1c

export default App;
