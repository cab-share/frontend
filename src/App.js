
import { useState } from "react";
import {  BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import { URL_BOOKINGS, URL_HOME, URL_LOGIN, URL_LOGIN_CALLBACK, URL_SELECT_LOCATION, URL_SELECT_SLOT,URL_PEER_SELECTION } from "./constants";
import Bookings from "./container/Bookings/Bookings";
import Home from "./container/Home/Home";
import Callback from "./container/Login/Callback";
import Login from "./container/Login/Login";
import Map from './container/Map/Map.js'
import SlotSelector from "./container/SlotSelector/SlotSelector";
import PeerSelection from "./container/PeerSelection/PeerSelection"

function App() {
  
  const [airportCoordinates] = useState({lat :  13.207265088970514, lng : 77.70749974067817}); 

  const [coordinates, setCoordinates] = useState(null);
  const [pickOrDrop, setPickOrDrop] = useState(null);

  // const [pickCoordinates, setPickCoordiantes ] = useState({lat :  12.977821035502654, lng : 77.57216326868583});
  // const [dropCoordinates, setDropCoordiantes ] = useState({lat :  12.971891, lng : 77.641151});


  return (
    <div className='App' >
      <div className='App-header'>
        <Router>
          <Routes>
            {/* Home */}
            <Route
              path={URL_HOME}
              element={
                <Home 
                  className='App-container' 
                  type={pickOrDrop}
                  setType={setPickOrDrop} 
                  />
              }
            />
            {/* Select-location */}
            <Route 
                path={URL_SELECT_LOCATION}
                element={
                  <Map
                    coordinates={coordinates}
                    setCoordinates={setCoordinates}
                    airportCoordinates={airportCoordinates}
                    pickOrDrop={pickOrDrop}
                    
                    // setAirpotCoordinates={setAirpotCoordinates}

                    // pickCoordinates = {pickCoordinates}
                    // setPickCoordiantes = {setPickCoordiantes}
                    // dropCoordinates={dropCoordinates}
                    // setDropCoordiantes={setDropCoordiantes}
                  />} 
            />
            {/* Select-slot */}
            <Route 
              path={URL_SELECT_SLOT} 
              element={
                <SlotSelector
                />} 
            />
            {/* bookings */}
            <Route 
              path={URL_BOOKINGS}
              element={<Bookings/>} 
            />
            {/* login */}
            <Route 
              path={URL_LOGIN}
              element={<Login/>} 
            />
            {/* login callback */}
            <Route 
              path={URL_LOGIN_CALLBACK}
              element={<Callback/>} 
            />
            {/* Peer selection */}
            <Route 
              path={URL_PEER_SELECTION}
              element={<PeerSelection/>} 
            />
        </Routes>
      </Router>
      </div>
    </div>
  );
}

export default App;

