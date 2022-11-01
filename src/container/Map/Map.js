import {GoogleMap, LoadScript, Autocomplete, MarkerF} from '@react-google-maps/api';
import {useState } from "react";
import classes from "./Map.module.css"


function Map({autocomplete, setAutocomplete}){

  const [coordinates, setCoordinates] = useState({
    lat :  12.971891,
    lng : 77.641151
  });

  const [libraries, setLibraries] = useState(["places"]);

  function onLoadAutocomplete (autoComplete) {
    console.log('autocomplete: ', autoComplete)
    setAutocomplete(autoComplete);
  }

  function onLoadMarker(marker){
    console.log("marker: ", marker); 
  }

  function onPlaceChanged () {
    if (autocomplete !== null) {
      let place = autocomplete.getPlace();
      console.log("place: ", place);
      let lat = place?.geometry?.location?.lat();
      let lng = place?.geometry?.location?.lng();
      if(lat && lng){
        let tempCoordinates = {
          ...coordinates,
          lat : lat,
          lng : lng
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


  const options = {
      disableDefaultUI: true,
  }

  return <div>
    <LoadScript 
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API}
      libraries={libraries} 
    >
      <GoogleMap
        id="google-map"
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={coordinates}  
        options={options}  
      >
        <Autocomplete
          onLoad={onLoadAutocomplete}
          onPlaceChanged={onPlaceChanged}
        >
          <input
            type="text"
            placeholder="Enter pickup location"
            className= { classes["autocompleteInput"]}
          />
        </Autocomplete>

        <MarkerF
          onLoad={onLoadMarker}
          position={coordinates}
          draggable={true}
          style={{
            zIndex: "10"
          }}
        />
        
        </GoogleMap>
      </LoadScript>
    </div>
}


export default Map;








