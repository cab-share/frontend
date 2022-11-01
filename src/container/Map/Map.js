import {GoogleMap, LoadScript, useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import {useState } from "react";
import classes from "./Map.module.css"


function Map({autocomplete, setAutoComplete}){

  const [coordinates, setCoordinates ] = useState({
    latitude :  12.971891,
    longitude : 77.641151
  });
  const [libraries, setLibraries] = useState(["places"]);

  function onLoad (autoComplete) {
    console.log('autocomplete: ', autoComplete)
    setAutoComplete(autoComplete);
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
            placeholder="Customized your placeholder"
            className= { classes["autocompleteInput"]}
          />
        </Autocomplete>
        </GoogleMap>
      </LoadScript>
    </div>
}


export default Map;







//           <Autocomplete
//             onLoad={this.onLoad}
//             onPlaceChanged={this.onPlaceChanged}
//           >
//             <input
//               type="text"
//               placeholder="Customized your placeholder"
//               style={{
//                 boxSizing: `border-box`,
//                 border: `1px solid transparent`,
//                 width: `240px`,
//                 height: `32px`,
//                 padding: `0 12px`,
//                 borderRadius: `3px`,
//                 boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
//                 fontSize: `14px`,
//                 outline: `none`,
//                 textOverflow: `ellipses`,
//                 position: "absolute",
//                 left: "50%",
//                 marginLeft: "-120px"
//               }}
//             />
//           </Autocomplete>




