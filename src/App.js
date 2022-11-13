
import { useState } from "react";
import {  BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './App.css';
import Home from "./container/Home/Home";
import Map from './container/Map/Map.js'
import SlotSelector from "./container/SlotSelector/SlotSelector";

function App() {
  
  const [airportCoordinates, setAirpotCoordinates] = useState({lat :  13.207265088970514, lng : 77.70749974067817}); 

  const [coordinates, setCoordinates] = useState({});
  const [type, setType] = useState(null);

  const [pickCoordinates, setPickCoordiantes ] = useState({lat :  12.977821035502654, lng : 77.57216326868583});
  const [dropCoordinates, setDropCoordiantes ] = useState({lat :  12.971891, lng : 77.641151});


  return (
    <div className='App' >
      <div className='App-header'>
        <Router>
          <Routes>
            {/* Home */}
            <Route
              path="/"
              element={
                <Home 
                  className='App-container'
                  type={type}
                  setType={setType} 
                  />
              }
            />
            {/* Select-location */}
            <Route 
                path="/select-location" 
                element={
                  <Map
                    coordinates={coordinates}
                    setCoordinates={setCoordinates}
                    airportCoordinates={airportCoordinates}
                    setAirpotCoordinates={setAirpotCoordinates}

                    pickCoordinates = {pickCoordinates}
                    setPickCoordiantes = {setPickCoordiantes}
                    dropCoordinates={dropCoordinates}
                    setDropCoordiantes={setDropCoordiantes}
                  />} 
            />
            {/* Select-slot */}
            <Route 
              path="/select-slot"  
              element={
                <SlotSelector
                />} 
            />
        </Routes>
      </Router>
      </div>
    </div>
  );
}

export default App;

