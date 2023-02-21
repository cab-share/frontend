import { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { useEffect, useState } from 'react';
import classes from "./SlotSelector.module.css"
import { useNavigate,useLocation } from 'react-router-dom';
import { URL_LOGIN } from "../../constants";
import axios from "axios";

function SlotSelector(){
    // Navigate
    const navigate =  useNavigate();
    const location = useLocation()
    console.log(location.state)
    const [isConfirm, setIsConfirmed] = useState(false);
    useEffect( ()=>{
        if(isConfirm){
            // axios.post('http://127.0.0.1:8000/api/cabshare/sharinglogic/fetchall/', {
            //     "name": "tom hills",
            //     "timing": value.format('YYYY-MM-DD')+" "+timevalue.format('HH:mm:ss'),
            //     "latitude": location.state.latitude,
            //     "longitude": location.state.longitude,
            //     "type": location.state.type
            //   })
            //   .then(function (response) {
            //     console.log(response);
            //   })
            //   .catch(function (error) {
            //     console.log(error);
            //   });
              navigate(URL_LOGIN,{
                state: {
                    type: location.state.type,
                    address: location.state.address,
                    latitude: location.state.latitude,
                    longitude: location.state.longitude,
                    timing: value.format('YYYY-MM-DD')+" "+timevalue.format('HH:mm:ss')
                }
            });
        }
    }, [isConfirm, navigate]);

    // slot selector
    const [value, setValue] = useState(Dayjs);
    const [timevalue, setTimeValue] = useState(Dayjs);
    console.log( "Value: ", value);

    


    

    return <div className={classes["container"]}>
        <div className={classes["slot-title"]} >
            Select date and slot
        </div>
        <div className={classes["date-selector"]}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                    label="Select Date"
                    value={value}
                    onChange={(newValue) => {
                        console.log(newValue);
                    setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
        </div>
        <div className={classes["date-selector"]}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileTimePicker
                    className={classes["time-picker"]}
                    label="Select Time"
                    value={timevalue}
                    onChange={(newTimeValue) => {
                        console.log(newTimeValue);
                    setTimeValue(newTimeValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
        </LocalizationProvider>
        </div>

        <button 
            type="button" 
            className={ "btn btn btn-dark " + classes["btn-confirm"] }
            onClick={()=>{setIsConfirmed(true)}}
          >
            Confirm
        </button>

    </div>
}

export default SlotSelector;

