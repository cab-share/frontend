import {GoogleMap, LoadScript, useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import {useState } from "react";
import classes from "./Map.module.css"


function Map({autocomplete, setAutocomplete}){

  const [coordinates, setCoordinates ] = useState({
    latitude :  12.971891,
    longitude : 77.641151
  });
  const [libraries, setLibraries] = useState(["places"]);

  function onLoad (autoComplete) {
    console.log('autocomplete: ', autoComplete)
    setAutocomplete(autoComplete);
  }

  function onPlaceChanged () {
    if (autocomplete !== null) {
      let place = autocomplete.getPlace();
      console.log(place);
      let lat = place?.geometry?.location?.lat();
      let lng = place?.geometry?.location?.lng();
      if(lat && lng){
        let tempCoordinates = {
          ...coordinates,
          latitude : lat,
          longitude : lng
        }
        setCoordinates(tempCoordinates);
      }      
    } else {
      console.log('Autocomplete is not loaded yet!')
    }
  }

  let mapContainerStyle = {
    height: "100vh",
    width: "100%",
  }

  const center = {
      lat: coordinates.latitude,
      lng: coordinates.longitude
  }

  const options = {
      disableDefaultUI: true,
  }

  return <div>
    <LoadScript 
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API}
      libraries={libraries} 
    >
      <GoogleMap
        id="searchbox-example"
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={center}  
        options={options}  
      >
        <Autocomplete
          onLoad={onLoad}
          onPlaceChanged={onPlaceChanged}
        >
          <input
            type="text"
            placeholder="Enter pickup location"
            className= { classes["autocompleteInput"]}
          />
        </Autocomplete>
        </GoogleMap>
      </LoadScript>
    </div>
}


export default Map;








