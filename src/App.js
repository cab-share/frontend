import { useState } from 'react';
import './App.css';
import Map from './container/Map/Map.js'

function App() {
  const [autocomplete, setAutocomplete] = useState(null);

  return (
    <div className='App' >
      <div className='App-header'>
        <Map
          autocomplete={autocomplete}
          setAutocomplete={setAutocomplete}
        /> 
      </div>
    </div>
  );
}

export default App;
