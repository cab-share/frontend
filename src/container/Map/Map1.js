import {GoogleMap, LoadScript, Autocomplete, MarkerF } from '@react-google-maps/api';
import {useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import classes from "./Map.module.css"



function Map1({pickCoordinates, dropCoordinates, setPickCoordiantes, setDropCoordiantes }){
  const navigate =  useNavigate();
  // booking states
  const PICK_CONST = "Pick";
  const DROP_CONST = "Drop";
  const CONFIRM_CONST = "Confirm"

  // const selectingState = [PICK_CONST, DROP_CONST, CONFIRM_CONST];

  const intialCoordiante = { lat :  12.971891, lng : 77.641151};
  const [selector, setSelector ] = useState(0);


  const [pickAutocomplete, setPickAutocomplete] = useState(null);
  const [dropAutocomplete, setDropAutocomplete] = useState(null);


  const [dragedPickCoordinates, setDragedPickCoordinates ] = useState({...intialCoordiante});
  const [dragedDropCoordinates, setDragedDropCoordinates ] = useState({...intialCoordiante});
  
  
  const [libraries] = useState(["places"]);

  const [pickAddress, setPickAddress] = useState("");
  const [dropAddress, setDropAddress] = useState("");

  const [isConfirmed, setIsConfirmed] = useState(false);

  function setConfirmed(){
    setIsConfirmed(true);
  }
  
  useEffect( ()=>{
    if(isConfirmed){
      navigate("/select-slot");
    }
  }, [isConfirmed, navigate] )


  function onPlaceChanged () {
    let autocomplete = (selector === 0 ? pickAutocomplete :  dropAutocomplete );
    if (autocomplete !== null) {
      let place = autocomplete.getPlace();
      console.log("place: " , place);
      let lat = place?.geometry?.location?.lat();
      let lng = place?.geometry?.location?.lng();
      if(lat && lng){
        let tempCoordinates = {
          lat : lat,
          lng : lng
        }
        if(selector === 0){
          setPickCoordiantes(tempCoordinates);
          if(place?.formatted_address)
            setPickAddress(place.formatted_address);
          setDragedPickCoordinates(tempCoordinates);
        }
        else if(selector === 1){
          setDropCoordiantes(tempCoordinates);
          if(place?.formatted_address)
            setDropAddress(place.formatted_address);
          setDragedDropCoordinates(tempCoordinates);
        }
      }
    } else {
      console.log('Autocomplete is not loaded yet!')
    }
  }

  function onDragMarker(e){ 
    console.log("On drag marker: ", selector);
    let dragedLat = e?.latLng?.lat();
    let dragedLng = e?.latLng?.lng();
    console.log(dragedLat, dragedLng);
    if(dragedLat && dragedLng){
      let tempCoordinates = {
        lat : dragedLat,
        lng : dragedLng
      }
      if(selector === 0){
        console.log("A");
        setDragedPickCoordinates(tempCoordinates);
        setSelector(1);
      }
      else if(selector === 1){
        console.log("B");
        setDragedDropCoordinates(tempCoordinates);
      }
    }
  }

  function onClickGoogleMap(e){
    console.log("on click google map: ", e);
    let dragedLat = e?.latLng?.lat();
    let dragedLng = e?.latLng?.lng();
    console.log(dragedLat, dragedLng);
    if(dragedLat && dragedLng){
      const tempCoordinates = {
        lat: dragedLat,
        lng: dragedLng
      };

      if(selector === 0)
        setDragedPickCoordinates(tempCoordinates);
      if(selector === 1)
        setDragedDropCoordinates(tempCoordinates);
    }
  }

  function setLocation(e){
      if(selector === 0){
        console.log("Pick address: ", e.target.value);
        setPickAddress(e.target.value)
      }
      else if(selector === 1) {
        console.log("Drop address: ", e.target.value);
        setDropAddress(e.target.value)
      }
  }

  
  return <div>
    <LoadScript 
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API}
      libraries={libraries} 
      onLoad={ (x)=>{console.log(x);} }
    >
      <GoogleMap
        id="google-map"
        mapContainerStyle={{ height: "100vh", width: "100%",}}
        zoom={15}
        center={ selector === 0 ? pickCoordinates : dropCoordinates}  
        options={{ disableDefaultUI: true, info: false}}
        onClick={onClickGoogleMap}
      >

        <div className={classes["location-container"]} >
          {/* Pick location */}
          <Autocomplete
            onLoad={ autocompletePick => {setPickAutocomplete(autocompletePick)}}
            onPlaceChanged={onPlaceChanged}
          >
            <input
              type="text"
              placeholder="Enter pick location"
              className= { classes["autocompleteInput"]}
              value={pickAddress}
              onChange={setLocation}
              onFocus={()=>{setSelector(0)}}
            />
          </Autocomplete>

          {/* Drop location */}
          {
            selector > 0 ?
              <Autocomplete
                onLoad={ autocompletePick => {setDropAutocomplete(autocompletePick)}}
                onPlaceChanged={onPlaceChanged}
              >
                <input
                  type="text"
                  placeholder="Enter drop location"
                  className= { classes["autocompleteInput"]}
                  value={dropAddress}
                  onChange={ setLocation}
                  onFocus={()=>{setSelector(1)}}
                />
              </Autocomplete>
              : null
            }

        </div>
        
        
        {/* Marker */}
          
        {/* PickUp */}
        {
          <MarkerF
            position={dragedPickCoordinates}
            draggable={selector === 0}
            onDrag={onDragMarker}
          />
        } 

        {/* Drop */}
        {
          selector > 0 ?
          <MarkerF
            position={dragedDropCoordinates}
            draggable={selector === 1}
            onDrag={onDragMarker}
            icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
          />
          : null
        }
        

        {/* Confirm button */}
          <button 
            type="button" 
            className={ "btn btn btn-dark " + classes["btn-confirm"] }
            onClick={setConfirmed}
          >
            Confirm
          </button>
        </GoogleMap>
      </LoadScript>

    </div>
}





export default Map1;








