
import { useState } from "react";
import {  BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './App.css';
import Home from "./container/Home/Home";
import Map from './container/Map/Map.js'
import SlotSelector from "./container/SlotSelector/SlotSelector";

function App() {

  const [pickCoordinates, setPickCoordiantes ] = useState({lat :  12.971891, lng : 77.641151});
  const [dropCoordinates, setDropCoordiantes ] = useState({lat :  12.971891, lng : 77.641151});


  return (
    <div className='App' >
      <div className='App-header'>

      <Home className='App-container' />

{/*         
        <Router>
          <Routes>
            <Route 
              path="/" 
              element={
                <Map
                  pickCoordinates = {pickCoordinates}
                  setPickCoordiantes = {setPickCoordiantes}
                  dropCoordinates={dropCoordinates}
                  setDropCoordiantes={setDropCoordiantes}
                />} 
            />
            <Route 
              path="/select-slot"  
              element={
                <SlotSelector
                />} 
            />
          </Routes>
        </Router> */}

      </div>
    </div>
  );
}

export default App;

