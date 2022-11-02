import { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useState } from 'react';
import classes from "./SlotSelector.module.css"

function SlotSelector(){
    const [value, setValue] = useState(Dayjs);
    console.log( "Value: ", value);

    const [selectedSlot, setSelectedSlot] = useState(0);

    const slots = [
        "00:00 AM - 02:00 AM",
        "02:00 AM - 04:00 AM",
        "04:00 AM - 06:00 AM",
        "06:00 AM - 08:00 AM",
        "08:00 AM - 10:00 AM",
        "10:00 AM - 12:00 AM",
        "12:00 AM - 02:00 PM",
        "02:00 AM - 02:00 PM",
        "04:00 AM - 06:00 PM",
        "06:00 AM - 08:00 PM",
        "08:00 AM - 10:00 PM",
        "10:00 AM - 12:00 PM",
    ];

    const slotElement = [];

    slots.forEach( (slot,idx) => {
        slotElement.push(
            <div 
                onClick={ ()=>{setSelectedSlot(idx)} }
                key={idx} 
                className={
                    classes["col"] + " " + 
                    (
                        idx === selectedSlot ? 
                        classes["active"] : null 
                    )}> 
                    {slot} 
            </div>
    )})

    return <div className={classes["container"]}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label="Select Slot"
                value={value}
                onChange={(newValue) => {
                    console.log(newValue);
                setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
        <div className={classes["row"]}>
            {slotElement}
        </div>

        <button 
            type="button" 
            className={ "btn btn btn-dark " + classes["btn-confirm"] }
            onClick={()=>{}}
          >
            Confirm
          </button>

    </div>
}

export default SlotSelector;

