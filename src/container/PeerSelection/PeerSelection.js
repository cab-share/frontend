import { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { useEffect, useState } from 'react';
import classes from "./PeerSelection.module.css"
import { useNavigate,useLocation } from 'react-router-dom';
import { URL_LOGIN } from "../../constants";
import axios from "axios";

function PeerSelection(){
    // Navigate
    const navigate =  useNavigate();
    const location = useLocation()
    console.log(location.state)
    const [ listItem, setlistItem ] = useState([]);
    const [apiData, setapiData ] = useState(0);
        
           useEffect(
            () => {axios.post('http://127.0.0.1:8000/api/cabshare/sharinglogic/fetchall/', {
                "name": location.state.name,
                "timing": location.state.timing,
                "latitude": location.state.latitude,
                "longitude": location.state.longitude,
                "type": location.state.type
              })
              .then(function (response) {
                console.log(response);
                const temp=[]
                for(let i=0;i<response.data.data.length;i++)
                {
                    temp.push(<div className={classes["name"]}><span className={classes["span-class"]}>{response.data.data[i].name}</span>
                                  
                                   <span className={classes["span-class"]}>{response.data.data[i].distance}</span>
                                   </div>)
                }
                setlistItem(temp)
              })
              .catch(function (error) {
                console.log(error);
              });},[apiData])
              
       
    

    

    


    

    return (
        <div>
            {listItem}
        </div>
    )
}

export default PeerSelection;

