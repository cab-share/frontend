import {GoogleMap, LoadScript, Autocomplete, MarkerF, useJsApiLoader  } from '@react-google-maps/api';
import {useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Spinner from '../../component/Spinner/Spinner';
import classes from "./Map.module.css"



function Map({coordinates, setCoordinates, airportCoordinates, setAirpotCoordinates }){
  // Navigation
  const navigate =  useNavigate();
  const [isConfirmed, setIsConfirmed] = useState(false);
  useEffect( ()=>{
    if(isConfirmed){
      navigate("/select-slot");
    }
  }, [isConfirmed, navigate] )

  // map loading
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey : process.env.REACT_APP_GOOGLE_MAP_API
  });


  return <Spinner/>;

  // return isLoaded ? renderMap() : <Spinner/>;


}





export default Map;








