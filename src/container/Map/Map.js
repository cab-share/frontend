import { GoogleMap, useLoadScript, Autocomplete, MarkerF  } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Spinner from '../../component/Spinner/Spinner';
import { PICK_CONST, URL_SELECT_SLOT } from '../../constants';
import classes from "./Map.module.css"


function Map({coordinates, setCoordinates, airportCoordinates, pickOrDrop}){

    const location = useLocation()

    console.log(location.state)
    
// navigation to slot selection page
    const navigate =  useNavigate();
    const [isConfirmed, setIsConfirmed] = useState(false);
    useEffect( ()=>{
        if(isConfirmed){
        navigate(URL_SELECT_SLOT,{
            state: {
                type: location.state.type,
                address: address,
                latitude: coordinates.lat,
                longitude: coordinates.lng
            }
        });
        }
    }, [isConfirmed, navigate] )


// load map
    const [libraries] = useState(["places"]);
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API,
        libraries : libraries
    });


// Autocomplete
    const [autocomplete, SetAutoComplete] = useState(null);
    const [address, setAddress] = useState("");


    function setLocation(e){
          console.log("Address: ", e.target.value);
          setAddress(e.target.value);
    }

    function onPlaceChanged(){
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

              setCoordinates(tempCoordinates);
              setMapCenter(tempCoordinates);
              if(place?.formatted_address)
                setAddress(place.formatted_address);
            }
          } else {
            console.log('Autocomplete is not loaded yet!')
          }
    }


// Marker

function onDragMarker(e){ 
    let dragedLat = e?.latLng?.lat();
    let dragedLng = e?.latLng?.lng();
    console.log(dragedLat, dragedLng);
    if(dragedLat && dragedLng){
      let tempCoordinates = {
        lat : dragedLat,
        lng : dragedLng
      }
      setCoordinates(tempCoordinates);
    }
  }

//   Map center
  const [mapCenter, setMapCenter] = useState({...airportCoordinates});



    const map = (
        <GoogleMap
            id="google-map"
            mapContainerStyle={{ height: "100vh", width: "100%",}}
            zoom={11}
            center={mapCenter}
            onLoad={()=>{console.log("HEllo peter");}}
            options={{ disableDefaultUI: true, info: false}}
        >
             <div className={classes["location-container"]} >
                {/* Pick location */}
                <Autocomplete
                    onLoad={ autocompletePick => {SetAutoComplete(autocompletePick)}}
                    onPlaceChanged={onPlaceChanged}
                >
                    <input
                    type="text"
                    placeholder={`Enter ${ pickOrDrop === PICK_CONST ? "pick" : "drop" } location`}
                    className={classes["autocompleteInput"]}
                    value={address}
                    onChange={setLocation}
                    onFocus={()=>{ }}
                    />
                </Autocomplete>
            </div>

            {/* Airport marker */}
            <MarkerF
                    position={airportCoordinates}
                    // draggable={selector === 0}
                    // onDrag={onDragMarker}
                />
            {/* location */}

            { coordinates !== null ?
                <MarkerF
                    position={coordinates}
                    draggable={true}
                    onDrag={onDragMarker}
                    icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
                />
                :null
            }

            {/* Confirm button */}
            <button 
                type="button" 
                className={ "btn btn btn-dark " + classes["btn-confirm"] }
                onClick={()=> setIsConfirmed(true)}
                disabled={ !(coordinates?.lat) }
            >
                Confirm
            </button>
        </GoogleMap>);


    if (loadError)
        return <div>Map cannot be loaded right now, sorry.</div>
    else    
        return ( isLoaded ? map : <Spinner/>)
}

export default Map;