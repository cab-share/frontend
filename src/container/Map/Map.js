import {GoogleMap, LoadScript, Autocomplete, MarkerF, } from '@react-google-maps/api';
import {useState } from "react";
import classes from "./Map.module.css"



function Map({autocomplete, setAutocomplete}){

  const [coordinates, setCoordinates] = useState({
    lat :  12.971891,
    lng : 77.641151
  });

  const [dragedCoordinates, setDragedCoordinates ] = useState({
    lat :  12.971891,
    lng : 77.641151
  });

  const [map, setMap] = useState(null);

  const [libraries, setLibraries] = useState(["places"]);

  const [address, setAddress] = useState("");

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
        setDragedCoordinates(tempCoordinates);
        if(place?.formatted_address)
          setAddress(place.formatted_address)
      }      
    } else {
      console.log('Autocomplete is not loaded yet!')
    }
  }

  function onDragMarker(e){ 
    console.log("on drag marker");
    let dragedLat = e?.latLng?.lat();
    let dragedLng = e?.latLng?.lng();
    console.log(dragedLat, dragedLng);
    if(dragedLat && dragedLng){
      setDragedCoordinates({
        lat: dragedLat,
        lng: dragedLng
      });
    }
  }

  function onCLickConfirmPickUp(e){
    console.log("Clicked confirm location", dragedCoordinates);

  }

  function onClickGoogleMap(e){
    console.log("on click google map: ", e);
    let dragedLat = e?.latLng?.lat();
    let dragedLng = e?.latLng?.lng();
    console.log(dragedLat, dragedLng);
    if(dragedLat && dragedLng){
      setDragedCoordinates({
        lat: dragedLat,
        lng: dragedLng
      });
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
        onClick={onClickGoogleMap}
      >
        <Autocomplete
          onLoad={onLoadAutocomplete}
          onPlaceChanged={onPlaceChanged}
        >
          <input
            type="text"
            placeholder="Enter pickup location"
            className= { classes["autocompleteInput"]}
            value={address}
            onChange={ (e)=>{
              console.log(e.target.value);
              setAddress(e.target.value)
            } }
          />
        </Autocomplete>

        <MarkerF
          onLoad={onLoadMarker}
          position={dragedCoordinates}
          draggable={true}
          onDrag={onDragMarker}
        />

       <button 
        type="button" 
        className={ "btn btn btn-dark " + classes["btn-pickup"] }
        onClick={onCLickConfirmPickUp}
        >
          Confirm Pickup
        </button>

        
        </GoogleMap>
      </LoadScript>

    </div>
}


export default Map;








