import {GoogleMap, LoadScript, Autocomplete, MarkerF } from '@react-google-maps/api';
import {useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import classes from "./Map.module.css"



function Map({pickCoordinates, dropCoordinates, setPickCoordiantes, setDropCoordiantes }){

  const navigate =  useNavigate();

  const PICK_CONST = "Pick";
  const DROP_CONST = "Drop";
  const intialCoordiante = { lat :  12.971891, lng : 77.641151};
  const [locationSelector, setLocationSelector ] = useState(PICK_CONST);


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
    let autocomplete = (locationSelector === PICK_CONST ? pickAutocomplete :  dropAutocomplete );

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
        if(locationSelector === PICK_CONST){
          setPickCoordiantes(tempCoordinates);
          if(place?.formatted_address)
            setPickAddress(place.formatted_address);
          setDragedPickCoordinates(tempCoordinates);
        }
        else if(locationSelector === DROP_CONST){
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
    console.log("On drag marker: ", locationSelector);
    let dragedLat = e?.latLng?.lat();
    let dragedLng = e?.latLng?.lng();
    console.log(dragedLat, dragedLng);
    if(dragedLat && dragedLng){
      let tempCoordinates = {
        lat : dragedLat,
        lng : dragedLng
      }
      if(locationSelector === PICK_CONST){
        console.log("A");
        setDragedPickCoordinates(tempCoordinates);
      }
      else if(locationSelector === DROP_CONST){
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

      if(locationSelector === PICK_CONST)
        setDragedPickCoordinates(tempCoordinates);
      if(locationSelector === DROP_CONST)
        setDragedDropCoordinates(tempCoordinates);
    }
  }

  


  return <div>
    <LoadScript 
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API}
      libraries={libraries} 
    >
      <GoogleMap
        id="google-map"
        mapContainerStyle={{ height: "100vh", width: "100%",}}
        zoom={15}
        center={ locationSelector === PICK_CONST ? pickCoordinates : dropCoordinates}  
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
              onChange={ (e)=>{
                console.log("Pick address: ", e.target.value);
                setPickAddress(e.target.value)
              }}
              onFocus={()=>{setLocationSelector(PICK_CONST)}}
            />
          </Autocomplete>

          {/* Drop location */}
          <Autocomplete
            onLoad={ autocompletePick => {setDropAutocomplete(autocompletePick)}}
            onPlaceChanged={onPlaceChanged}
          >
            <input
              type="text"
              placeholder="Enter drop location"
              className= { classes["autocompleteInput"]}
              value={dropAddress}
              onChange={ (e)=>{
                console.log("Drop address: ", e.target.value);
                setDropAddress(e.target.value)
              }}
              onFocus={()=>{setLocationSelector(DROP_CONST)}}
            />
          </Autocomplete>
        </div>
        
        
        {/* Marker */}
        
        {
          dragedDropCoordinates ?
          <MarkerF
            position={dragedDropCoordinates}
            draggable={locationSelector === DROP_CONST}
            onDrag={onDragMarker}
            icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
          />:
          null
        }

        {
          dragedPickCoordinates ?
          <MarkerF
            position={dragedPickCoordinates}
            draggable={locationSelector === PICK_CONST}
            onDrag={onDragMarker}
          />:
          null
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





export default Map;








